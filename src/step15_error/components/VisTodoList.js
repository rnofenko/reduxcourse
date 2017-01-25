import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../actions'
import { getVisTodos, getIsFetching } from '../reducers'

class VisTodoList extends Component {
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if(this.props.filter !== prevProps.filter){
      this.fetchData()
    }
  }

  fetchData () {
    const { filter, fetchTodos } = this.props
    fetchTodos(filter).then(()=> console.log('done'))
  }

  render () {
    const { toggleTodo, todos, isFetching } = this.props
    if(isFetching && !todos.length){
      return <p>Loading....</p>
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />
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
const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
}
VisTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisTodoList))

export default VisTodoList