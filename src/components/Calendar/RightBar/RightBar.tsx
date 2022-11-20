import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calendarActions } from '../../../store/slices/calendar-slice'
import { RootState } from '../../../store/index'
import styles from './RightBar.module.scss'

const RightBar: FC = () => {
  const calendarState = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch()
  const { activeDay } = calendarState
  return (
    <div
      className={`${styles.rightBar}${
        activeDay ? ' ' + styles.rightBarActive : ''
      }`}
    >
      {activeDay && (
        <div className={styles.activeDate}>
          <div>
            Выбранная дата:{' '}
            {`${activeDay.year}-${activeDay.month + 1}-${activeDay.day}`}
          </div>
          <button onClick={() => dispatch(calendarActions.unSetActiveDay())}>
            &times;
          </button>
        </div>
      )}
    </div>
  )
}

export default RightBar
