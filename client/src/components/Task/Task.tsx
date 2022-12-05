import React, { FC } from 'react'
import styles from './Task.module.scss'
import { ITodo } from 'types'
import { dateTransformToString, dateMoreThenDate } from 'utils'
import { useAppDispatch } from 'hooks'
import { useTranslation } from 'react-i18next'
import { deleteTodo } from 'api'

type Props = {
  info: ITodo
}

const Task: FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { createdAt, desc, expiresIn, id, title } = props.info
  const { t } = useTranslation()

  const onDeleteTodoHandler = (id: string) => {
    deleteTodo(dispatch)(id)
  }

  return (
    <div
      className={`${styles.task}${
        dateMoreThenDate(new Date(), expiresIn) ? ' ' + styles.expired : ''
      }`}
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
}

export default Task
