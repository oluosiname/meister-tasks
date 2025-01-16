
require 'rails_helper'

RSpec.describe 'Tasks', type: :request do
  let!(:projects) { create_list(:project, 3) }

  describe 'Fetch Tasks', type: :request do
    let!(:project) { create(:project) }
    let!(:tasks) { create_list(:task, 5, project: project) }

    before do
      create_list(:task, 5)
    end

    it 'returns a project with tasks' do
      query = <<~GRAPHQL
        query($project_id: ID!) {
          tasks(projectId: $project_id) {
            id
            name
            projectId
          }
        }
      GRAPHQL

      post '/graphql', params: { query: query, variables: { project_id: project.id } }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      tasks_data = json['data']['tasks']

      expect(tasks_data.size).to eq(5)

      expect(tasks_data.pluck('id')).to match_array(tasks.pluck(:id).map(&:to_s))
      expect(tasks_data.pluck('projectId').uniq).to eq([ project.id.to_s ])
    end

    context 'when project_id is not provided' do
      it 'returns all tasks' do
        query = <<~GRAPHQL
          query {
            tasks {
              id
              name
              projectId
            }
          }
        GRAPHQL

        post '/graphql', params: { query: query }

        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)

        tasks_data = json['data']['tasks']

        expect(tasks_data.size).to eq(10)
      end
    end
  end
end
