import React, { FC } from 'react'
import styles from './Task.module.scss'
import { ITodo, themes } from 'types'
import { dateTransformToString, dateMoreThenDate } from 'utils'
import { useAppDispatch } from 'hooks'
import { useTranslation } from 'react-i18next'
import { deleteTodo } from 'api'

interface Props {
  info: ITodo
  theme: themes
}

export const Task: FC<Props> = React.memo((props: Props) => {
  const dispatch = useAppDispatch()
  const { theme } = props
  const { createdAt, desc, expiresIn, id, title } = props?.info
  const { t } = useTranslation()

  const onDeleteTodoHandler = (id: string): void => {
    void deleteTodo(dispatch)(id)
  }

  return (
    <div
      className={`${styles.task}${
        dateMoreThenDate(new Date(), expiresIn) ? ' ' + styles.expired : ''
      }${theme === themes.dark ? ` ${styles.dark}` : ''}`}
    >
      <span onClick={() => onDeleteTodoHandler(id)}>&times;</span>
      <div>
        <div className={styles.title}>
          <h6>{title}</h6>
        </div>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.time}>
          <span className={styles.date}>
            {`${t('rightBar.createdDate')}: ${dateTransformToString(
              createdAt
            )}`}
          </span>
          <span className={styles.date}>
            {`${t('rightBar.chooseDateBtn')}: ${dateTransformToString(
              expiresIn
            )}`}
          </span>
        </div>
      </div>
    </div>
  )
})

Task.displayName = 'Task'
