import { v4 } from 'uuid'

export const addTodo = (text) => ({
  type: 'ADD_TODO', 
  id: v4(), text
})
export const setVisFilter = (filter) => ({
  type: 'SET_VIS_FILTER', filter: filter
})
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
})