import { createSlice } from '@reduxjs/toolkit'
import ICalendar from '../../types/ICalendar'

const initialState: ICalendar = {
  activeDay: null,
  todos: [],
}

const calendarSlice = createSlice({
  name: 'calendarTodo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos]
    },
    setActiveDay: (state, action) => {
      state.activeDay = {
        day: action.payload.day,
        month: action.payload.month,
        year: action.payload.year,
      }
    },
    unSetActiveDay: (state) => {
      state.activeDay = null
    },
  },
})

export const calendarActions = calendarSlice.actions

export default calendarSlice