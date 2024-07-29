import { sql } from '@vercel/postgres'

export async function fetchTasks() {
  try {
    const data = await sql`
        SELECT  id, task, complete
        FROM tasks
        `
    return data.rows
  } catch (e) {
    console.error('Database Error:', e)
    throw new Error('Failed to fetch tasks.')
  }
}
