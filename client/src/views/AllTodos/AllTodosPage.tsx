import React, { FC } from 'react'
import { Layout, Task } from 'components'
import styles from './AllTodosPage.module.scss'
import { useAppSelector } from 'hooks'
import { themes } from 'types'
interface Props {
  theme: themes
}
export const AllTodosPage: FC<Props> = React.memo((props: Props) => {
  const todos = useAppSelector((state) => state.calendar.todos)
  return (
    <Layout>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <Task key={todo.id} info={todo} theme={props.theme} />
        ))}
      </div>
    </Layout>
  )
})

AllTodosPage.displayName = 'AllTodosPage'
