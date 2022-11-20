import IDate from "./IDate";

export default interface ITodo extends IDate {
  title: string,
   createdAt: Date,
  done: boolean
}