'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const FormSchema = z.object({
  id: z.string(),
  task: z.string({ message: 'Please enter a task' }),
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

  console.log(validatedFields)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task',
    }
  }

  const { task } = validatedFields.data

  const id = uuidv4()
  const complete = `FALSE`
  console.log(id)
  try {
    await sql`
    INSERT INTO tasks (id, task, complete)
    VALUES (${id}, ${task}, ${complete})
    `
  } catch (e) {
    return {
      message: `Database Error: Failed to Create Task`,
    }
  }
  redirect('/')
}
