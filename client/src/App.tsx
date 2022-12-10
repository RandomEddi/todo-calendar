import React from 'react'
import { CalendarPage, AllTodosPage } from 'views'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getTodos } from 'api'
import { themes } from 'types'

const App = (): JSX.Element => {
  const dispatch = useAppDispatch()
  console.log('asd')
  const { theme } = useAppSelector((state) => state.theme)
  React.useEffect(() => {
    void getTodos(dispatch)()
  }, [])

  return (
    <div className={`app${theme === themes.dark ? ' dark' : ''}`}>
      <Routes>
        <Route path='/' element={<CalendarPage theme={theme} />} />
        <Route path='/all-todos' element={<AllTodosPage theme={theme} />} />
      </Routes>
    </div>
  )
}

export default App
