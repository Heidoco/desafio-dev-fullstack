import React, { useEffect, useState } from "react"

export default function TaskForm({ initialData, titleText, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [titleError, setTitleError] = useState("")

  useEffect(() => {
    setTitle(initialData?.title || "")
    setDescription(initialData?.description || "")
    setTitleError("")
  }, [initialData])

  const handleSaveClick = () => {
    const t = title.trim()
    const d = description.trim()
    if (!t) {
      setTitleError("É necessário informar um título")
      return
    }
    setTitleError("")
    onSubmit({ title: t, description: d })
  }

  return (
    <section className="border border-slate-200 bg-white rounded-xl p-4 mb-6">
      <h3 className="m-0 mb-3 font-semibold text-[18px]">{titleText}</h3>
      <div className="grid gap-3">
        <div className="grid gap-1.5">
          <input
            className={`w-full px-3 py-2.5 rounded-lg bg-white text-slate-900 text-[16px] focus:outline focus:outline-sky-300 placeholder:text-slate-400 ${titleError ? 'border border-red-500' : 'border border-slate-200'}`}
            placeholder="Título da tarefa"
            value={title}
            onChange={e => {
              setTitle(e.target.value)
              if (titleError) setTitleError("")
            }}
          />
          {titleError && <p className="text-red-600 text-sm m-0">{titleError}</p>}
        </div>
        <div className="grid gap-1.5">
          <textarea
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-[16px] focus:outline focus:outline-sky-300 placeholder:text-slate-400"
            placeholder="Descrição da tarefa"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-2.5">
          <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline focus-visible:outline-sky-300" onClick={handleSaveClick}>Salvar</button>
          <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline  focus-visible:outline-sky-300" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </section>
  )
}


