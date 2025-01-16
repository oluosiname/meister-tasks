"use client";

import React from "react";
import { Task } from "@/types";
import TaskItem from "@/components/TaskItem";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Task List</h3>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-4 hover:bg-gray-50"
          >
            <TaskItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
