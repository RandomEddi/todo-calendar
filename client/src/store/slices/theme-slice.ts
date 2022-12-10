import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themes } from 'types'

interface ITheme {
  theme: themes
}

const initialState: ITheme = {
  theme: themes.white
}

const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    changeTheme: (state, action: PayloadAction<themes>) => {
      return { theme: action.payload }
    }
  }
})

export default themeSlice
export const themeActions = themeSlice.actions
