'use client'

import { useActionState } from 'react'
import { createTask, State } from '@/app/lib/actions'

export function Form() {
  const initialState: State = { message: null, errors: {} }
  const [state, formAction] = useActionState(createTask, initialState)

  console.log('STATE: ', state)

  return (
    <form action={formAction}>
      <label htmlFor='task'>Task: </label>
      <input id='task' type='text' name='task' aria-describedby='task-error' />
      <div id='task-error' aria-live='polite' aria-atomic='true'>
        {state?.errors?.task &&
          state.errors.task.map((error: string) => (
            <p className='text-red-500' key={error}>
              {error}
            </p>
          ))}
      </div>
      {/* <label htmlFor='complete'>Complete? </label>
      <input
        id='complete'
        type='checkbox'
        name='complete'
        aria-describedby='complete-error'
      /> */}

      <button type='submit'>Create Task</button>
    </form>
  )
}
