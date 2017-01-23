import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';

const todo = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return {
          id: action.id,
          text: action.text,
          completed: false
        }
      case 'TOGGLE_TODO':
          if(state.id !== action.id){
            return state
          }
          return {
              ...state,
              completed: !state.completed
            }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(state, action)
      ]
      case 'TOGGLE_TODO':
        return state.map(t => todo(t, action))
    default:
      return state
  }
}

const visFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_VIS_FILTER':
      return action.filter
    default:
      return state
  }
}

let nextTodoId = 0;
const addTodo = (text) => ({
  type: 'ADD_TODO', 
  id: ++nextTodoId, text
})
const setVisFilter = (filter) => ({
  type: 'SET_VIS_FILTER', filter: filter
})
const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
})


const Link = ({active, children, onClick}) => {
  if(active){
    return <span>{children}</span>
  }
  return (
    <a href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >{children}</a>
  )
}
const mapStateToLinkProps = (state, props) => ({
  active: props.filter === state.visFilter
})
const mapDispatchToLinkProps = (dispatch, props) => ({
    onClick () { dispatch(setVisFilter(props.filter)) }
})
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)

const Todo = ({onClick, completed, text}) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
)

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

let AddTodo = ({dispatch}) => {
  let input;
  
  return (
    <div>
      <input ref={node => { input = node}} />
      <button onClick={() => {
        dispatch(addTodo(input.value))
        input.value=''
      }}>ADD</button>
    </div>
  )
}
AddTodo = connect()(AddTodo)

const Footer = () => (
  <p>
    Show:
    {'   '}
    <FilterLink filter="SHOW_ALL"> All </FilterLink>
    {'   '}
    <FilterLink filter="SHOW_ACTIVE"> Active </FilterLink>
    {'   '}
    <FilterLink filter="SHOW_COMPLETED"> Completed </FilterLink>
  </p>
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

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisTodoList />
    <Footer />
  </div>
)

const todoApp = combineReducers({todos, visFilter})

const persistedState = {
  todos: [
    {
      id: 0,
      text: 'Welcome',
      completed: false
    }
  ]
}

const store = createStore(todoApp, persistedState)
ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)