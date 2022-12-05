import { ITodo, IDate } from './'

export interface ICalendar {
  activeDay: IDate | null
  todos: ITodo[]
}
