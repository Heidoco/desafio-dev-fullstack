import React from "react"
import { Pencil, Trash2 } from "lucide-react"

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const articleClass = task.completed ? "border border-slate-200 bg-slate-50 rounded-xl p-4" : "border border-slate-200 bg-white rounded-xl p-4"
  const titleClass = task.completed ? "m-0 mb-1 font-semibold text-[18px] line-through text-slate-500" : "m-0 mb-1 font-semibold text-[18px]"
  const descClass = task.completed ? "m-0 text-slate-500 text-[14px] line-through" : "m-0 text-slate-600 text-[14px]"
  return (
    <article className={`${articleClass} max-h-32 overflow-hidden`}>
      <div className="flex gap-3.5 items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="appearance-none mt-1 w-[18px] h-[18px] border-2 border-slate-400 rounded-md grid place-items-center bg-white cursor-pointer transition-all hover:border-slate-500 focus:outline focus:outline-sky-300 checked:bg-blue-600 checked:border-blue-600"
        />
        <div className="flex-1 min-w-0">
          <h3 className={`${titleClass} break-words hyphens-auto`}>{task.title}</h3>
          <p className={`${descClass} break-words hyphens-auto`}>{task.description}</p>
        </div>
        <div className="flex gap-1.5">
          <button className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline focus-visible:outline-sky-300" title="Editar" onClick={() => onEdit(task)}>
            <Pencil className="w-[18px] h-[18px]" />
          </button>
          <button className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline focus-visible:outline-sky-300" title="Excluir" onClick={() => onDelete(task.id)}>
            <Trash2 className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </article>
  )
}


