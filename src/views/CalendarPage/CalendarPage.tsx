import React, { FC } from 'react'
import Layout from '../../components/Layout/Layout'
import { useSelector, useDispatch } from 'react-redux'
import styles from './CalendarPage.module.scss'
import { RootState } from '../../store'
import { dateActions } from '../../store/slices/date-slice'
import { calendarActions } from '../../store/slices/calendar-data-slice'
import IDate from '../../types/IDate'
import { useTranslation } from 'react-i18next'
import RightBar from 'components/RightBar/RightBar'

const CalendarPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const date = useSelector((state: RootState) => state.date)
  const activeDay = useSelector((state: RootState) => state.calendar.activeDay)
  const { year, month } = date
  function compareDate(date: IDate) {
    if (activeDay) {
      return (
        activeDay.day === date.day &&
        activeDay.month === date.month &&
        activeDay.year === date.year
      )
    }
  }
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

  const calendarDaysArray: number[] = []

  for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
    calendarDaysArray.push(i)
  }

  const setActiveDayHandler = (day: number) => {
    if (
      compareDate({
        month: month,
        year: year,
        day: day,
      })
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
                  setActiveDayHandler(day)
                }}
                className={`${
                  activeDay?.day === day &&
                  activeDay?.month === month &&
                  activeDay?.year === year
                    ? styles.active
                    : ''
                }`}
                key={day}
              >
                {day}
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
