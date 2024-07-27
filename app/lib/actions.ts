import { z } from 'zod'
import { sql } from '@vercel/postgres'

const FormSchema = z.object({
  id: z.string(),
  task: z.string(),
  complete: z.boolean(),
})

const CreateTask = FormSchema.omit({ id: true })

export type State = {
  errors?: {
    task?: string[]
    complete?: boolean[]
  }
}

export async function createTask(prevState: State, formData: FormData) {
  const validateFields = CreateTask.safeParse({
    task: formData.get('task'),
    complete: formData.get('complete'),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task',
    }
  }

  const { task, complete } = validateFields.data

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
}
