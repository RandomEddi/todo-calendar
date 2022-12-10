import { ITodo } from 'types'
import { apiInstance } from 'api'
import { AppDispatch } from 'store'
import { calendarActions } from 'store/slices/calendar-data-slice'

export const getTodos = (dispatch: AppDispatch) => async () => {
  try {
    await apiInstance.get<ITodo[]>('/api/all-todos').then((resp) => {
      const data: ITodo[] = resp.data.map((d) => {
        d.createdAt = new Date(d.createdAt)
        d.expiresIn = new Date(d.expiresIn)
        return d
      })

      dispatch(calendarActions.setTodos(data))
    })
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

export const deleteTodo = (dispatch: AppDispatch) => async (id: string) => {
  try {
    await apiInstance.delete(`/api/delete-todo?id=${id}`)
    dispatch(calendarActions.removeTodo(id))
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

export const postTodo = (dispatch: AppDispatch) => async (todo: ITodo) => {
  try {
    const resp = await apiInstance.post<ITodo>('/api/add-todo', todo)
    dispatch(calendarActions.addTodo(todo))
    return resp.data
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log('Unknown Error')
    }
  }
}
