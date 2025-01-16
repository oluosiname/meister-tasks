require 'rails_helper'

RSpec.describe 'Projects', type: :request do
  let!(:projects) { create_list(:project, 3) }

  describe "Fetching Projects" do
    it 'returns a list of projects' do
      query = <<~GRAPHQL
        query {
          projects {
            id
            name
          }
        }
      GRAPHQL

      post '/graphql', params: { query: query }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json['data']['projects'].size).to eq(3)
      expect(json['data']['projects'].pluck('id')).to match_array(projects.pluck(:id).map(&:to_s))
    end
  end
end
