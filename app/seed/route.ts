import { db } from '@vercel/postgres'

const client = await db.connect()

async function seedTask() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS tasks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        complete BOOLEAN NOT NULL
    )
    `

  const insertedTask = client.sql`
        INSERT INTO tasks (task, complete)
        VALUES ('run', TRUE)
        `
  return insertedTask
}

export async function GET() {
  try {
    await client.sql`BEGIN`
    await seedTask()
    await client.sql`COMMIT`

    return Response.json({ message: 'Database seeded successfully' })
  } catch (e) {
    await client.sql`ROLLBACK`
    return Response.json({ e }, { status: 500 })
  }
}
