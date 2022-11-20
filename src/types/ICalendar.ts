import ITodo from "./ITodo";
import IDate from "./IDate";

export default interface ICalendar {
  activeDay: IDate | null,
  todos: ITodo[]
}