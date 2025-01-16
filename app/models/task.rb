class Task < ApplicationRecord
  belongs_to :project

  validates :name, presence: true

  after_commit :trigger_subscription, on: :create

  private

  def trigger_subscription
    MeisterTasksSchema.subscriptions.trigger(:task_added, { project_id: project_id }, self)
  end
end
