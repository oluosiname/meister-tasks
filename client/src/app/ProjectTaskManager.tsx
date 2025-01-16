"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_TASKS_BY_PROJECT } from "@/app/graphql/queries";
import TaskList from "@/components/TaskList";
import TaskGrid from "@/components/TaskGrid";
import { Project, Task } from "@/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGrip } from "@fortawesome/free-solid-svg-icons";

import { useTaskSubscription } from "@/hooks/useTaskSubscription";

const ProjectTaskManager: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const [presentationStyle, setPresentationStyle] = useState<"list" | "grid">(
    "grid"
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

  useEffect(() => {
    const savedStyle = localStorage.getItem("presentationStyle");
    if (savedStyle === "list" || savedStyle === "grid") {
      setPresentationStyle(savedStyle);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("presentationStyle", presentationStyle);
  }, [presentationStyle]);

  useTaskSubscription(selectedProjectId);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h2 className="text-lg font-bold">Task Management</h2>

        <div>
          <button
            onClick={() => setPresentationStyle("grid")}
            aria-label="grid view"
            className={`px-3 py-2 rounded ${
              presentationStyle === "grid" ? "bg-blue-400" : "bg-blue-500"
            }`}
          >
            <FontAwesomeIcon icon={faGrip} />
          </button>
          <button
            onClick={() => setPresentationStyle("list")}
            aria-label="list view"
            className={`px-3 py-2 rounded ${
              presentationStyle === "list" ? "bg-blue-400" : "bg-blue-500"
            }`}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
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
            {taskData && (
              <>
                {presentationStyle === "list" ? (
                  <TaskList tasks={taskData.tasks} />
                ) : (
                  <TaskGrid tasks={taskData.tasks} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskManager;
