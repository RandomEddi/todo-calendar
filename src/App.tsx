import React from 'react'
import CalendarPage from './views/CalendarPage/CalendarPage'
import AllTodosPage from './views/AllTodos/AllTodosPage'
import { Route, Routes } from 'react-router-dom'

function App() {
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
