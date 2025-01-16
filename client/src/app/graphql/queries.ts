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

export const TASK_ADDED = gql`
  subscription OnTaskAdded($projectId: ID!) {
    taskAdded(projectId: $projectId) {
      id
      name
      projectId
    }
  }
`;
