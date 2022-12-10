import { configureStore } from '@reduxjs/toolkit'
import calendarSlice from './slices/calendar-data-slice'
import dateSlice from './slices/date-slice'
import themeSlice from './slices/theme-slice'

const store = configureStore({
  reducer: {
    date: dateSlice.reducer,
    calendar: calendarSlice.reducer,
    theme: themeSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
