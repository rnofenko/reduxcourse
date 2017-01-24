import { v4 } from 'uuid'
import * as api from '../api'

export const addTodo = (text) => ({
  type: 'ADD_TODO', 
  id: v4(), text
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODO',
  filter,
  response
})

export const fetchTodos = (filter) => 
  api
    .fetchTodos(filter)
    .then(response => receiveTodos(filter, response))