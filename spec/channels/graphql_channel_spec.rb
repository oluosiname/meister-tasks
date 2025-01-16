require 'rails_helper'

RSpec.describe GraphqlChannel, type: :channel do
  let!(:project) { create(:project) }
  let!(:task) { create(:task, project:) }

  it 'broadcasts task updates via subscription' do
    subscription_query = <<~GRAPHQL
      subscription($projectId: ID!) {
        taskAdded(projectId: $projectId) {
          id
          name
        }
      }
    GRAPHQL

    subscribe(query: subscription_query, variables: { projectId: project.id })

    expect {
      MeisterTasksSchema.subscriptions.trigger(
        :task_added,
        { project_id: project.id },
        task
      )
    }.to have_broadcasted_to("graphql-event::taskAdded:projectId:#{project.id}")
  end
end
