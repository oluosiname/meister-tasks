# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [ Types::NodeType, null: true ], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ ID ], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :projects, [ Types::ProjectType ], null: true

    def projects
      Project.all
    end

    field :tasks, [ Types::TaskType ], null: true do
      argument :project_id, ID, required: false
    end

    def tasks(project_id: nil)
      return Task.order(created_at: :desc) if project_id.nil?

      Task.where(project_id: project_id).order(created_at: :desc)
    end
  end
end
