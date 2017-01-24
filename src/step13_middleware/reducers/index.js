import { combineReducers } from 'redux'
import todos, * as fromTodos from './todos'

const todoApp = combineReducers({
  todos
})

export default todoApp

export const getVisTodos = (state, filter) => fromTodos.getVisTodos(state.todos, filter)