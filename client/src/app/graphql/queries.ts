import { gql } from "@apollo/client";

export const GET_TASKS_BY_PROJECT = gql`
  query GetTasksByProject($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      name
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
    }
  }
`;
