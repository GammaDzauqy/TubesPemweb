import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'

interface Props {
  project?: {
    id: number
    name: string
    description: string
    start_date: string
    end_date: string
    status: string
  }
}

export default function Form({ project }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: project?.name || '',
    description: project?.description || '',
    start_date: project?.start_date || '',
    end_date: project?.end_date || '',
    status: project?.status || 'pending',
  })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    project
      ? put(`/projects/${project.id}`)
      : post('/projects')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label>Name</label>
        <input
          type="text"
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

      <div className="flex gap-4">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            className="border p-2"
            value={data.start_date}
            onChange={(e) => setData('start_date', e.target.value)}
          />
          {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            className="border p-2"
            value={data.end_date}
            min={data.start_date}
            onChange={(e) => setData('end_date', e.target.value)}
          />
          {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
        </div>
      </div>

      <div>
        <label>Status</label>
        <select
          className="border w-full p-2"
          value={data.status}
          onChange={(e) => setData('status', e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={processing}
      >
        {processing ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  )
}
