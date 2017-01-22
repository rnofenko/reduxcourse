import { createStore, combineReducers } from 'redux'
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

const todoApp = combineReducers({todos, visFilter})
const store = createStore(todoApp)

const FilterLink = ({filter, currentFilter, children}) => {
  if(filter === currentFilter){
    return <span>{children}</span>
  }
  return (
    <a href="#"
      onClick={e => {
        e.preventDefault()
        store.dispatch({type: 'SET_VIS_FILTER', filter})
      }}
    >{children}</a>
  )
}

const getVisTodos = (todos, filter) => {
  switch(filter){
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(x=> x.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(x=> !x.completed)
  }
}

let nextTodoId=0;
class TodoApp extends React.Component {
  render () {
    const {todos, visFilter} = this.props
    const visTodos = getVisTodos(todos, visFilter)

    return (
      <div>
        <input ref={node => { this.input = node}} />
        <button onClick={() => {
          store.dispatch({type: 'ADD_TODO', text: this.input.value, id: ++nextTodoId})
          this.input.value=''
        }}>ADD</button>
        <ul>
          {visTodos.map(todo =>
            <li key={todo.id}
              onClick={() => {
                store.dispatch({type: 'TOGGLE_TODO', id: todo.id})
              }}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:
          {'   '}
          <FilterLink filter="SHOW_ALL" currentFilter={visFilter}> All </FilterLink>
          {'   '}
          <FilterLink filter="SHOW_ACTIVE" currentFilter={visFilter}> Active </FilterLink>
          {'   '}
          <FilterLink filter="SHOW_COMPLETED" currentFilter={visFilter}> Completed </FilterLink>
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  )
}

store.subscribe(()=>render())
render()