import React, { FC } from 'react'
import Layout from '../../components/Layout/Layout'
import styles from './CalendarPage.module.scss'
import { RootState } from '../../store'
import { dateActions } from '../../store/slices/date-slice'
import { calendarActions } from '../../store/slices/calendar-data-slice'
import { useTranslation } from 'react-i18next'
import RightBar from 'components/RightBar/RightBar'
import { useAppDispatch, useAppSelector } from 'hooks'
import { equalDates } from 'utils'

const CalendarPage: FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const date = useAppSelector((state: RootState) => state.date)
  const calendarStore = useAppSelector((state: RootState) => state.calendar)
  const { activeDay, todos } = calendarStore
  const { year, month } = date

  const prevMonthHandler = () => {
    dispatch(dateActions.prevMonth())
  }
  const nextMonthHandler = () => {
    dispatch(dateActions.nextMonth())
  }

  const setActiveDay = (day: number) => {
    dispatch(
      calendarActions.setActiveDay({
        year,
        month,
        day,
      })
    )
  }

  interface calendarDays {
    day: number
    isNotEmpty: boolean
  }

  const calendarDaysArray: calendarDays[] = []
  for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
    calendarDaysArray.push({
      day: i,
      isNotEmpty: !!todos.find((t) => {
        return equalDates(new Date(year, month, i), t.expiresIn)
      }),
    })
  }

  const setActiveDayHandler = (day: number) => {
    if (
      equalDates(
        activeDay
          ? new Date(activeDay.year, activeDay.month, activeDay.day)
          : null,
        new Date(year, month, day)
      )
    ) {
      dispatch(calendarActions.unSetActiveDay())
    } else {
      setActiveDay(day)
    }
  }

  return (
    <>
      <Layout>
        <div className={styles.calendar}>
          <div className={styles.date}>
            <span className={styles.dateYear}>{year}</span>
            <span className={styles.dateMonth}>
              {t(`calendar.${month + 1}`)}
            </span>
          </div>
          <div className={styles.calendarDays}>
            {calendarDaysArray.map((day) => (
              <button
                onClick={() => {
                  setActiveDayHandler(day.day)
                }}
                className={`${
                  equalDates(
                    activeDay
                      ? new Date(activeDay.year, activeDay.month, activeDay.day)
                      : null,
                    new Date(year, month, day.day)
                  )
                    ? styles.active
                    : ''
                }${day.isNotEmpty ? ' ' + styles.notEmpty : ''}`}
                key={day.day}
              >
                {day.day}
              </button>
            ))}
          </div>
          <div className={styles.btnHandlers}>
            <button onClick={prevMonthHandler}>Prev month</button>
            <button onClick={nextMonthHandler}>Next month</button>
          </div>
        </div>
      </Layout>
      <RightBar />
    </>
  )
}

export default CalendarPage
