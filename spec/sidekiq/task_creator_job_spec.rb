require 'rails_helper'

RSpec.describe TaskCreatorJob, type: :job do
  let!(:project1) { create(:project) }
  let!(:project2) { create(:project) }

  describe '#perform' do
    it 'calls TaskCreator for each project' do
      expect(TaskCreator).to receive(:call).with(project: project1).once.and_call_original
      expect(TaskCreator).to receive(:call).with(project: project2).once.and_call_original

      described_class.new.perform
    end

    it 'creates tasks for all projects' do
      expect {
        described_class.new.perform
      }.to change(Task, :count).by(2)

      expect(Task.pluck(:project_id)).to match_array([ project1.id, project2.id ])
    end

    context 'when task creation is successful' do
      let(:task1) { Task.find_by(project: project1) }
      let(:task2) { Task.find_by(project: project2) }

      before do
        allow(MeisterTasksSchema.subscriptions).to receive(:trigger)
      end

      it 'triggers a subscription for created tasks' do
        expect(MeisterTasksSchema.subscriptions).to receive(:trigger).with(
          :task_added,
          { project_id: project1.id },
          instance_of(Task)
        )

        expect(MeisterTasksSchema.subscriptions).to receive(:trigger).with(
          :task_added,
          { project_id: project2.id },
          instance_of(Task)
        )

        described_class.new.perform
      end
    end

    context 'when task creation fails' do
      before do
        allow(TaskCreator).to receive(:call).and_return(double(success: false, errors: [ "Name cannot be blank" ]))
        allow(MeisterTasksSchema.subscriptions).to receive(:trigger)
      end

      it 'logs an error message' do
        expect(Rails.logger).to receive(:error).with("Task not created: Name cannot be blank").twice

        described_class.new.perform
      end

      it 'does not trigger a subscription' do
        expect(MeisterTasksSchema.subscriptions).not_to receive(:trigger)

        described_class.new.perform
      end
    end
  end
end
