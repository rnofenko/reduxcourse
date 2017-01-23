import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'

const getVisTodos = (todos, filter) => {
  switch(filter){
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(x=> x.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(x=> !x.completed)
    default:
      return todos
  }
}

const Todo = ({onClick, completed, text}) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
)

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo key={todo.id} {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)
const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisTodos(state.todos, state.visFilter)
  }
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: id => { dispatch(toggleTodo(id)) }
  }
}
const VisTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)

export default VisTodoList