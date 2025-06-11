import { Link } from '@inertiajs/react'
import Form from './Form'

interface Task {
  id: number
  title: string
  description: string
  status: string
  due_date: string
  assigned_to: { id: number; name: string }
  project: { id: number; name: string }
}

export default function Index({ tasks, users, projects }: {
  tasks: Task[],
  users: { id: number; name: string }[],
  projects: { id: number; name: string }[]
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <Form users={users} projects={projects} />

      <div className="mt-8">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Project</th>
              <th className="border p-2">Assigned To</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border p-2">{task.title}</td>
                <td className="border p-2">{task.project?.name}</td>
                <td className="border p-2">{task.assigned_to?.name}</td>
                <td className="border p-2">{task.due_date}</td>
                <td className="border p-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
