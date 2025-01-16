module Types
  class SubscriptionType < Types::BaseObject
    field :task_added, Types::TaskType, null: true do
      argument :project_id, ID, required: true
    end

    def task_added(project_id:)
      object if object&.project_id == project_id.to_i
    end
  end
end
