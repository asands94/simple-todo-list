import { inter } from '@/app/ui/fonts'
import { Form } from '@/app/ui/todos/create-form'
import { fetchTasks } from '@/app/lib/data'

export default async function Page() {
  const tasks = await fetchTasks()
  console.log(tasks)
  return (
    <main className='text-center'>
      <h1>Todo List App</h1>
      <h2 className={`${inter.className}`}>What do you need to do today?</h2>
      <Form />
      {tasks?.map((task) => (
        <div key={task.id}>
          <p>Task: {task.task}</p>
          <p>Status: {task.complete ? 'complete' : 'incomplete'}</p>
        </div>
      ))}
    </main>
  )
}
