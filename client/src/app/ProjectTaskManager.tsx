"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_TASKS_BY_PROJECT } from "@/app/graphql/queries";
import TaskList from "@/components/TaskList";
import { Project, Task } from "@/types";

const ProjectTaskManager: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useQuery<{ projects: Project[] }>(GET_PROJECTS);

  const {
    data: taskData,
    loading: tasksLoading,
    error: tasksError,
  } = useQuery<{ tasks: Task[] }>(GET_TASKS_BY_PROJECT, {
    variables: { projectId: selectedProjectId },
    skip: !selectedProjectId,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h2 className="text-lg font-bold">Task Management</h2>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="p-4">
            {projectsLoading && <p>Loading projects...</p>}
            {projectsError && (
              <p className="text-red-500">Error: {projectsError.message}</p>
            )}
            {projectsData && (
              <select
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="p-3 border rounded w-full"
                value={selectedProjectId || ""}
              >
                <option value="">Select a project</option>
                {projectsData.projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex-1 overflow-auto p-4 bg-white rounded shadow">
            {tasksLoading && <p>Loading tasks...</p>}
            {tasksError && (
              <p className="text-red-500">Error: {tasksError.message}</p>
            )}
            {taskData && <TaskList tasks={taskData.tasks} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskManager;
