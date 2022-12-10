import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo, ICalendar, IDate } from 'types'

const initialState: ICalendar = {
  activeDay: null,
  todos: []
}

const calendarSlice = createSlice({
  name: 'calendarTodo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos = [action.payload, ...state.todos]
    },
    setTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload)
    },
    setActiveDay: (state, action: PayloadAction<IDate>) => {
      state.activeDay = {
        day: action.payload.day,
        month: action.payload.month,
        year: action.payload.year
      }
    },
    unSetActiveDay: (state) => {
      state.activeDay = null
    }
  }
})

export const calendarActions = calendarSlice.actions

export default calendarSlice
