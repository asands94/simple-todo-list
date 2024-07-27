'use client'

export function Form() {
  return (
    <form className=''>
      <label htmlFor='task'>Task</label>
      <input id='task' type='text' name='task' />
      <label htmlFor='complete'>Complete</label>
      <input id='complete' type='checkbox' name='complete' />
    </form>
  )
}
