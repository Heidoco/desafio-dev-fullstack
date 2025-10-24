import React, { useEffect, useMemo, useState } from "react"
import { Plus } from "lucide-react"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import { useApi } from "./hooks/useApi"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const api = useApi()
  
  const mapTask = (item) => ({
    id: item.id,
    title: item.titulo,
    description: item.descricao,
    completed: item.status === "concluida"
  })
  
  const handleLoad = async () => {
    try {
      const data = await api.get()
      setTasks(data.map(mapTask))
    } catch (error) {
      console.error("Error loading tasks:", error)
      alert("Erro ao carregar tarefas")
    }
  }

  useEffect(() => {
    handleLoad()
  }, [])

  const handleToggleComplete = async (id) => {
    const current = tasks.find(t => t.id === id)
    if (!current) return
    try {
      const updated = await api.put(id, { completed: !current.completed })
      setTasks(prev => prev.map(t => (t.id === id ? mapTask(updated) : t)))
    } catch (error) {
      console.error("Error toggling task:", error)
      alert("Erro ao alternar tarefa")
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.del(id)
      setTasks(prev => prev.filter(t => t.id !== id))
      if (editingId === id) {
        setEditingId(null)
        setIsAdding(false)
      }
    } catch (error) {
      console.error("Error deleting task:", error)
      alert("Erro ao deletar tarefa")
    }
  }

  const handleEdit = (task) => {
    setEditingId(task.id)
    setIsAdding(false)
  }

  const handleSubmit = async ({ title, description }) => {
    const t = title.trim()
    const d = description.trim()
    if (!t) return

    try {
      if (editingId) {
        const updated = await api.put(editingId, { title: t, description: d })
        setTasks(prev => prev.map(item => (item.id === editingId ? mapTask(updated) : item)))
        setEditingId(null)
      } else {
        const created = await api.post({ title: t, description: d })
        setTasks(prev => [...prev, mapTask(created)])
        setIsAdding(false)
      }
    } catch (error) {
      console.error("Error submitting task:", error)
      alert("Erro ao salvar tarefa")
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
  }

  const pendingTasks = useMemo(() => tasks.filter(t => !t.completed), [tasks])
  const completedTasks = useMemo(() => tasks.filter(t => t.completed), [tasks])
  const editingTask = useMemo(() => tasks.find(t => t.id === editingId) || null, [tasks, editingId])

  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-7">
          <h1 className="text-[34px] mb-1">Minhas Tarefas</h1>
          <p className="m-0 text-slate-600">Organize suas tarefas pendentes e concluídas</p>
        </header>

        {!isAdding && !editingId && (
          <button className="inline-flex items-center gap-2 mb-5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline focus-visible:outline-sky-300" onClick={() => setIsAdding(true)}>
            <Plus className="w-[18px] h-[18px]" />
            Nova Tarefa
          </button>
        )}

        {(isAdding || editingId) && (
          <TaskForm
            key={editingId || "new"}
            initialData={editingTask ? { title: editingTask.title, description: editingTask.description } : { title: "", description: "" }}
            titleText={editingId ? "Editar Tarefa" : "Nova Tarefa"}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        <div className="grid gap-8">
          <TaskList
            title={`Pendentes (${pendingTasks.length})`}
            tasks={pendingTasks}
            onToggle={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
            emptyText="Nenhuma tarefa pendente"
          />
          <TaskList
            title={`Concluídas (${completedTasks.length})`}
            tasks={completedTasks}
            onToggle={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
            emptyText="Nenhuma tarefa concluída"
          />
        </div>
      </div>
    </div>
  )
}
