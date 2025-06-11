import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'

interface User {
  id: number
  name: string
}

interface Project {
  id: number
  name: string
}

interface Props {
  task?: {
    id: number
    name: string
    description: string
    project_id: number
    assigned_to: number
    due_date: string
    status: string
  }
  users: User[]
  projects: Project[]
}

export default function Form({ task, users = [], projects = [] }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: task?.name || '',
    description: task?.description || '',
    project_id: task?.project_id || 0,
    assigned_to: task?.assigned_to || 0,
    due_date: task?.due_date || '',
    status: task?.status || 'pending',
  })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    task
      ? put(`/tasks/${task.id}`)
      : post('/tasks')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label>Title</label>
        <input
          className="border w-full p-2"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
      </div>

      <div>
        <label>Description</label>
        <textarea
          className="border w-full p-2"
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
        />
      </div>

      <div>
        <label>Project</label>
        <select
          className="border w-full p-2"
          value={data.project_id}
          onChange={(e) => setData('project_id', Number(e.target.value))}
        >
          <option value="">-- Select Project --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        {errors.project_id && <div className="text-red-500 text-sm">{errors.project_id}</div>}
      </div>

      <div>
        <label>Assign To</label>
        <select
          className="border w-full p-2"
          value={data.assigned_to}
          onChange={(e) => setData('assigned_to', Number(e.target.value))}
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        {errors.assigned_to && <div className="text-red-500 text-sm">{errors.assigned_to}</div>}
      </div>

      <div>
        <label>Due Date</label>
        <input
          type="date"
          className="border w-full p-2"
          value={data.due_date}
          onChange={(e) => setData('due_date', e.target.value)}
        />
        {errors.due_date && <div className="text-red-500 text-sm">{errors.due_date}</div>}
      </div>

      <div>
        <label>Status</label>
        <select
          className="border w-full p-2"
          value={data.status}
          onChange={(e) => setData('status', e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={processing}
      >
        {processing ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  )
}
