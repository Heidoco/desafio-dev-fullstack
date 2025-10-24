import React from "react"
import TaskItem from "./TaskItem"

export default function TaskList({ tasks, title, onToggle, onEdit, onDelete, emptyText }) {
  return (
    <section>
      <h2 className="m-0 mb-3 text-[22px]">{title}</h2>
      <div className="grid gap-3">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && <p className="text-center text-slate-600 py-6 text-[14px]">{emptyText}</p>}
      </div>
    </section>
  )
}


