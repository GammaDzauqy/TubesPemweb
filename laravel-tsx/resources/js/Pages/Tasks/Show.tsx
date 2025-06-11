import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

interface Task {
  id: number
  title: string
  description: string
  status: string
  due_date: string
  assigned_to_user: {
    name: string
  }
  project: {
    name: string
  }
}

interface Props extends PageProps {
  task: Task
}

export default function Show({ auth, task }: Props) {
  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
        <p className="mb-2">{task.description}</p>
        <p className="mb-2">Project: {task.project.name}</p>
        <p className="mb-2">Assigned to: {task.assigned_to_user.name}</p>
        <p className="mb-2">Due Date: {task.due_date}</p>
        <p className="mb-2">Status: {task.status}</p>
      </div>
    </AuthenticatedLayout>
  )
}
