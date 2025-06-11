import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

interface Task {
  id: number
  title: string
  status: string
}

interface Project {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  status: string
  tasks: Task[]
}

interface Props extends PageProps {
  project: Project
}

export default function Show({ auth, project }: Props) {
  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
        <p className="mb-2">{project.description}</p>
        <p className="mb-2">Start: {project.start_date}</p>
        <p className="mb-2">End: {project.end_date}</p>
        <p className="mb-4">Status: {project.status}</p>

        <h2 className="text-xl font-semibold mt-6">Tasks</h2>
        <ul className="list-disc pl-6">
          {project.tasks.map((task) => (
            <li key={task.id}>
              {task.title} - <span className="italic">{task.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </AuthenticatedLayout>
  )
}
