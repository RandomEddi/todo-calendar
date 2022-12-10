import React, { FC } from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'
import uuid from 'react-uuid'
import { useAppDispatch, useAppSelector } from 'hooks'
import { deleteTodo, postTodo } from 'api'
import { calendarActions } from '../../store/slices/calendar-data-slice'
import { RootState } from '../../store/index'
import { dateTransformToString, equalDates } from 'utils'
import { ITodo } from 'types'
import styles from './RightBar.module.scss'

interface IFormValues {
  title: string
  desc: string
}

export const RightBar: FC = () => {
  const calendarState = useAppSelector((state: RootState) => state.calendar)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { activeDay } = calendarState

  const onDeleteTodoHandler = (id: string): void => {
    void deleteTodo(dispatch)(id)
  }

  return (
    <div
      className={`${styles.rightBar}${
        activeDay !== null ? ' ' + styles.rightBarActive : ''
      }`}
    >
      {activeDay !== null && (
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
                desc: ''
              }}
              validate={(values) => {
                const errors: Partial<IFormValues> = {}
                if (values.title === '') {
                  errors.title = 'empty'
                }
                if (values.desc === '') {
                  errors.desc = 'empty'
                }
                return errors
              }}
              onSubmit={async (
                values: IFormValues,
                { setSubmitting, resetForm }: FormikHelpers<IFormValues>
              ) => {
                const data: ITodo = {
                  title: values.title,
                  desc: values.desc,
                  id: uuid(),
                  createdAt: new Date(),
                  expiresIn: new Date(
                    activeDay.year,
                    activeDay.month,
                    activeDay.day
                  )
                }
                void postTodo(dispatch)(data)
                setSubmitting(false)
                resetForm()
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form className={styles.form}>
                    <Field
                      className={`${styles.title} ${
                        errors.title === 'empty' && touched.title === true ? styles.inputFail : ''
                      }`}
                      id='title'
                      name='title'
                      type='text'
                      placeholder={t('rightBar.titleInput')}
                    />
                    <Field
                      className={`${styles.desc} ${
                        errors.desc === 'empty' && touched.desc === true ? styles.inputFail : ''
                      }`}
                      id='desc'
                      name='desc'
                      type='text'
                      placeholder={t('rightBar.descInput')}
                    />
                    <button className={styles.formBtn} type='submit'>
                      {t('rightBar.submit')}
                    </button>
                  </Form>
                )
              }}
            </Formik>
          </div>
          <div className={styles.todoList}>
            {calendarState.todos
              .filter((t) => {
                const date = t.expiresIn
                return equalDates(
                  new Date(activeDay.year, activeDay.month, activeDay.day),
                  date
                )
              })
              .map((todo) => (
                <div key={todo.id} className={styles.todo}>
                  <button
                    onClick={() => onDeleteTodoHandler(todo.id)}
                    className={styles.delete}
                  >
                    &times;
                  </button>
                  <h6>{todo.title}</h6>
                  <div>{todo.desc}</div>
                  <span>
                    {t('rightBar.createdDate')}:{' '}
                    {dateTransformToString(todo.createdAt)}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
