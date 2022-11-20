import { configureStore } from '@reduxjs/toolkit'
import calendarSlice from './slices/calendar-slice'
import dateSlice from './slices/date-slice'

const store = configureStore({
  reducer: {
    date: dateSlice.reducer,
    calendar: calendarSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store