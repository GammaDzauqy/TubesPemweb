import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import Form from './Form'

interface Project {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  status: string
}

export default function Index({ projects }: { projects: Project[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Form />

      <div className="mt-8">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Name</th>
              <th className="border p-2">Start</th>
              <th className="border p-2">End</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="border p-2">{project.name}</td>
                <td className="border p-2">{project.start_date}</td>
                <td className="border p-2">{project.end_date}</td>
                <td className="border p-2">{project.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
