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
  end
end
