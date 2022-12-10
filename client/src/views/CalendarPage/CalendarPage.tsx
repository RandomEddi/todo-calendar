import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { RootState } from 'store'
import { dateActions } from 'store/slices/date-slice'
import { calendarActions } from 'store/slices/calendar-data-slice'
import { Layout, RightBar } from 'components'
import { useAppDispatch, useAppSelector } from 'hooks'
import { equalDates } from 'utils'
import styles from './CalendarPage.module.scss'
import { ITodo, themes } from 'types'

interface Props {
  theme: themes
}

export const CalendarPage: FC<Props> = React.memo((props: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const date = useAppSelector((state: RootState) => state.date)
  const calendarStore = useAppSelector((state: RootState) => state.calendar)
  const { theme } = props
  const { activeDay, todos } = calendarStore
  const { year, month } = date

  const prevMonthHandler = (): void => {
    dispatch(dateActions.prevMonth())
  }
  const nextMonthHandler = (): void => {
    dispatch(dateActions.nextMonth())
  }

  const setActiveDay = (day: number): void => {
    dispatch(
      calendarActions.setActiveDay({
        year,
        month,
        day
      })
    )
  }

  interface calendarDays {
    day: number
    isNotEmpty: ITodo | undefined
  }

  const calendarDaysArray: calendarDays[] = []
  for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
    const dayIsEmpty = todos.find((t) => {
      return equalDates(new Date(year, month, i), t.expiresIn)
    })
    calendarDaysArray.push({
      day: i,
      isNotEmpty: dayIsEmpty
    })
  }

  const setActiveDayHandler = (day: number): void => {
    if (
      equalDates(
        activeDay !== null
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
        <div
          className={`${styles.calendar}${
            theme === themes.dark ? ` ${styles.dark}` : ''
          }`}
        >
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
                    activeDay !== null
                      ? new Date(activeDay.year, activeDay.month, activeDay.day)
                      : null,
                    new Date(year, month, day.day)
                  )
                    ? styles.active
                    : ''
                }${day.isNotEmpty !== undefined ? ' ' + styles.notEmpty : ''}`}
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
})

CalendarPage.displayName = 'CalendarPage'
