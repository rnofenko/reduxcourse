import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'

const getVisTodos = (todos, filter) => {
  switch(filter){
    case 'all':
      return todos
    case 'completed':
      return todos.filter(x=> x.completed)
    case 'active':
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
const mapStateToProps = (state, props) => {
  return {
    todos: getVisTodos(state.todos, props.filter)
  }
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: id => { dispatch(toggleTodo(id)) }
  }
}
const VisTodoList = connect(
  mapStateToProps,
  mapDispatchToTodoListProps
)(TodoList)

export default VisTodoList