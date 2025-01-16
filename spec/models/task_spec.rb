require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:project) }
  end

  describe "validations" do
    subject { create(:task) }
    it { is_expected.to validate_presence_of(:name) }
  end

  describe "callbacks" do
    describe "after_create" do
      let!(:project) { create(:project) }
      let(:task) { build(:task, project:) }

      before do
        allow(MeisterTasksSchema.subscriptions).to receive(:trigger)
      end

      it "triggers a subscription" do
        expect(MeisterTasksSchema.subscriptions).to receive(:trigger).with(
          :task_added,
          { project_id: project.id },
          task
        )

        task.save
      end
    end
  end
end
