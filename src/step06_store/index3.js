import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
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

class FilterLink extends React.Component {
  componentDidMount () {
    const { store } = this.context
    this.unsubscribe = store.subscribe(()=>{
      console.log('link mount')
      this.forceUpdate()
    })
  }

  componentWillUnmount () {
    console.log('link unsubscribe')
    this.unsubscribe()
  }

  render () {
    const props = this.props
    const { store } = this.context
    const state = store.getState()

    return (
      <Link
        active={props.filter === state.visFilter}
        onClick={()=> store.dispatch({type: 'SET_VIS_FILTER', filter: props.filter})}
       >
        {props.children}
       </Link>
    )
  }
}
FilterLink.contextTypes = {
  store: React.PropTypes.object
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

let nextTodoId = 0;
const AddTodo = (props, context) => {
  let input;
  const { store } = context

  return (
    <div>
      <input ref={node => { input = node}} />
      <button onClick={() => {
        store.dispatch({type: 'ADD_TODO', id: ++nextTodoId, text: input.value})
        input.value=''
      }}>ADD</button>
    </div>
  )
}
AddTodo.contextTypes = {
  store: React.PropTypes.object
}

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

class VisTodoList extends React.Component {
  componentDidMount () {
    const { store } = this.context
    this.unsubscribe = store.subscribe(()=>{
      console.log('VisTodoList mount')
      this.forceUpdate()
    })
  }

  componentWillUnmount () {
    console.log('VisTodoList unsubscribe')
    this.unsubscribe()
  }

  render () {
    const props = this.props
    const { store } = this.context
    const state = store.getState()

    return (
      <TodoList todos={getVisTodos(state.todos, state.visFilter)} onTodoClick={id=> store.dispatch({type: 'TOGGLE_TODO', id})} />
    )
  }
}
VisTodoList.contextTypes = {
  store: React.PropTypes.object
}

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisTodoList />
    <Footer />
  </div>
)

const todoApp = combineReducers({todos, visFilter})

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)