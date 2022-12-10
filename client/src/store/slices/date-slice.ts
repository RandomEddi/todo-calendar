import { createSlice } from '@reduxjs/toolkit'
import { IDate } from 'types'

const initialState: IDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth()
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    nextMonth: (state) => {
      if (state.month === 11) {
        state.month = 0
        state.year = state.year + 1
      } else {
        state.month = state.month + 1
      }
    },
    prevMonth: (state) => {
      if (state.month === 0) {
        state.month = 11
        state.year = state.year - 1
      } else {
        state.month = state.month - 1
      }
    }
  }
})

export const dateActions = dateSlice.actions

export default dateSlice
