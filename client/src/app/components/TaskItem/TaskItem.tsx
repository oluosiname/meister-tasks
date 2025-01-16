import { Task } from "@/types";
import React from "react";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div
      key={task.id}
      className="p-4 rounded bg-white shadow hover:shadow-lg transition-shadow w-full"
    >
      <h4 className="text-md font-semibold">{task.name}</h4>
      <p className="text-sm text-gray-500">Task ID: {task.id}</p>
    </div>
  );
};

export default TaskItem;
