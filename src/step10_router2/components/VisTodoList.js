import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toggleTodo } from '../actions'
import { getVisTodos } from '../reducers'

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
const mapStateToProps = (state, { params }) => {
  return {
    todos: getVisTodos(state, params.filter || 'all')
  }
}
const VisTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo}
)(TodoList))

export default VisTodoList