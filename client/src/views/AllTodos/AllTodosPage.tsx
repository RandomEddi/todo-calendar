import React, { FC } from 'react'
import Layout from 'components/Layout/Layout'
import styles from './AllTodosPage.module.scss'
import Task from 'components/Task/Task'
import { useAppSelector } from 'hooks'
const AllTodosPage: FC = () => {
  
  const todos = useAppSelector((state) => state.calendar.todos)
  return (
    <Layout>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <Task key={todo.id} info={todo} />
        ))}
      </div>
    </Layout>
  )
}

export default AllTodosPage
