import React from 'react'
import CalendarPage from './views/CalendarPage/CalendarPage'
import AllTodosPage from './views/AllTodos/AllTodosPage'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from 'hooks'
import { getTodos } from 'api'

function App() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    getTodos(dispatch)()
  }, [])

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<CalendarPage />} />
        <Route path='/all-todos' element={<AllTodosPage />} />
      </Routes>
    </div>
  )
}

export default App
