import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calendarActions } from '../../store/slices/calendar-data-slice'
import { RootState } from '../../store/index'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import styles from './RightBar.module.scss'
import { useTranslation } from 'react-i18next'
import ITodo from 'types/ITodo'
import uuid from 'react-uuid'
import { dateTransformToString } from 'utils/dateTransformToString'

type IFormValues = {
  title: string
  desc: string
}

const RightBar: FC = () => {
  const calendarState = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { activeDay } = calendarState

  return (
    <div
      className={`${styles.rightBar}${
        activeDay ? ' ' + styles.rightBarActive : ''
      }`}
    >
      {activeDay && (
        <>
          <div className={styles.activeDate}>
            <div>
              {t('rightBar.dateNow')}:{' '}
              {dateTransformToString(
                new Date(activeDay.year, activeDay.month, activeDay.day)
              )}
            </div>
            <button onClick={() => dispatch(calendarActions.unSetActiveDay())}>
              &times;
            </button>
          </div>
          <div className={styles.form}>
            <Formik
              initialValues={{
                title: '',
                desc: '',
              }}
              validate={(values) => {
                const errors: Partial<IFormValues> = {}
                if (!values.title) {
                  errors.title = 'empty'
                }
                if (!values.desc) {
                  errors.desc = 'empty'
                }
                return errors
              }}
              onSubmit={(
                values: IFormValues,
                { setSubmitting }: FormikHelpers<IFormValues>
              ) => {
                //TODO: Доделать валидацию формы
                const data: ITodo = {
                  title: values.title,
                  desc: values.desc,
                  id: uuid(),
                  createdAt: JSON.stringify(new Date()),
                  expiresIn: JSON.stringify(
                    new Date(activeDay.year, activeDay.month, activeDay.day)
                  ),
                }
                dispatch(calendarActions.addTodo(data))
                setSubmitting(false)
              }}
            >
              {({ errors }) => {
                return (
                  <Form className={styles.form}>
                    <Field
                      className={styles.title}
                      id='title'
                      name='title'
                      type='text'
                      placeholder={t('rightBar.titleInput')}
                    />
                    <Field
                      className={styles.desc}
                      id='desc'
                      name='desc'
                      type='text'
                      placeholder={t('rightBar.descInput')}
                    />
                    <button
                      disabled={!!errors.desc && !!errors.title}
                      className={styles.formBtn}
                      type='submit'
                    >
                      submit
                    </button>
                  </Form>
                )
              }}
            </Formik>
          </div>
          <div className={styles.todoList}>
            {calendarState.todos
              .filter((t) => {
                const date = new Date(JSON.parse(t.expiresIn))
                return (
                  date.getFullYear() === activeDay.year &&
                  date.getMonth() === activeDay.month &&
                  date.getDate() === activeDay.day
                )
              })
              .map((todo) => (
                <div key={todo.id} className={styles.todo}>
                  <button
                    onClick={() =>
                      dispatch(calendarActions.removeTodo(todo.id))
                    }
                    className={styles.delete}
                  >
                    &times;
                  </button>
                  <h6>{todo.title}</h6>
                  <div>{todo.desc}</div>
                  <span>
                    {t('rightBar.createdDate')}:{' '}
                    {dateTransformToString(
                      new Date(JSON.parse(todo.createdAt))
                    )}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RightBar
