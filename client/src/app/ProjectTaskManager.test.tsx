import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ProjectTaskManager from "./ProjectTaskManager";
import { GET_PROJECTS, GET_TASKS_BY_PROJECT } from "@/app/graphql/queries";

const mockProjects = [
  { id: "1", name: "Project One", __typename: "Project" },
  { id: "2", name: "Project Two", __typename: "Project" },
];

const mockTasks = [
  { id: "101", name: "Task One project 1", __typename: "Task" },
  { id: "102", name: "Task Two project 1", __typename: "Task" },
];

const mockTasksTwo = [
  { id: "101", name: "Task One project 2", __typename: "Task" },
  { id: "102", name: "Task Two project 2", __typename: "Task" },
];

const mocks = [
  {
    request: { query: GET_PROJECTS },
    result: {
      data: {
        projects: mockProjects,
      },
    },
  },
  {
    request: {
      query: GET_TASKS_BY_PROJECT,
      variables: { projectId: "1" },
    },
    result: {
      data: {
        tasks: mockTasks,
      },
    },
  },
  {
    request: {
      query: GET_TASKS_BY_PROJECT,
      variables: { projectId: "2" },
    },
    result: {
      data: {
        tasks: mockTasksTwo,
      },
    },
  },
];

describe("ProjectTaskManager", () => {
  it("renders the project dropdown and tasks correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProjectTaskManager />
      </MockedProvider>
    );

    expect(await screen.findByText("Project One")).toBeInTheDocument();
    expect(screen.getByText("Project Two")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    expect(await screen.findByText("Task One project 1")).toBeInTheDocument();
    expect(screen.getByText("Task Two project 1")).toBeInTheDocument();
  });
});
