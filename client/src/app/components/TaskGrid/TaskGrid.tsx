"use client";

import React from "react";
import { Task } from "@/types";
import TaskItem from "@/components/TaskItem";

interface TaskGridProps {
  tasks: Task[];
}

const TaskGrid: React.FC<TaskGridProps> = ({ tasks }) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Task Grid</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default TaskGrid;
