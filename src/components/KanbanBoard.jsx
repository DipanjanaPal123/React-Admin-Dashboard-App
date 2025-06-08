import React, { useState } from "react";

const initialTasks = {
  todo: [
    { id: 1, title: "Design new UI" },
    { id: 2, title: "Write documentation" },
  ],
  inProgress: [
    { id: 3, title: "Develop dashboard" },
  ],
  done: [
    { id: 4, title: "Project setup" },
  ],
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);

  const onDragStart = (task, status) => {
    setDraggedTask({ task, status });
  };

  const onDrop = (status) => {
    if (!draggedTask) return;

    const { task, status: fromStatus } = draggedTask;

    if (fromStatus === status) return;

    setTasks((prev) => {
      // Remove from old list
      const fromTasks = prev[fromStatus].filter((t) => t.id !== task.id);
      // Add to new list
      const toTasks = [...prev[status], task];

      return {
        ...prev,
        [fromStatus]: fromTasks,
        [status]: toTasks,
      };
    });

    setDraggedTask(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="kanban-container">
      {["todo", "inProgress", "done"].map((status) => (
        <div
          key={status}
          className={`kanban-column ${status}`}
          onDrop={() => onDrop(status)}
          onDragOver={onDragOver}
        >
          <h2 className="kanban-header">
            {status === "todo"
              ? "To Do"
              : status === "inProgress"
              ? "In Progress"
              : "Done"}
          </h2>
          <div className="kanban-tasks">
            {tasks[status].map((task) => (
              <div
                key={task.id}
                className="kanban-task"
                draggable
                onDragStart={() => onDragStart(task, status)}
              >
                {task.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
