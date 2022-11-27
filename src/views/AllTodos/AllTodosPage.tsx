import Layout from 'components/Layout/Layout'
import React, { FC } from 'react'
import styles from './AllTodosPage.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import ITodo from 'types/ITodo'

const AllTodosPage: FC = () => {
  const todos = useSelector((state: RootState) => state.calendar.todos)
  return (
    <Layout>
      <div>
        {todos.map((todo) => (
          <div key={todo.title}>
            <div>{todo.title}</div>
            <div>{todo.desc}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default AllTodosPage
