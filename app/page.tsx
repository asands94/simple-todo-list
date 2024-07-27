import { inter } from '@/app/ui/fonts'
import { Form } from './ui/todos/create-form'

export default function Home() {
  return (
    <main className='text-center'>
      <h1>Todo List App</h1>
      <h2 className={`${inter.className}`}>What do you need to do today?</h2>
      <Form />
    </main>
  )
}
