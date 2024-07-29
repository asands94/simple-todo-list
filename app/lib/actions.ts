'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'

const FormSchema = z.object({
  id: z.string(),
  task: z
    .string({ message: 'Please enter a task' })
    .min(1, { message: 'Task cannot be empty' }),
  complete: z.boolean(),
})

const CreateTask = FormSchema.omit({ id: true, complete: true })

export type State = {
  errors?: {
    task?: string[]
  }
  message?: string | null
}

export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
    task: formData.get('task'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task',
    }
  }

  const { task } = validatedFields.data

  const complete = `FALSE`
  try {
    await sql`
    INSERT INTO tasks (task, complete)
    VALUES (${task}, ${complete})
    `
  } catch (e) {
    return {
      message: `Database Error: Failed to Create Task`,
    }
  }
  redirect('/')
}
