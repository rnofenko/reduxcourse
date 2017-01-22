import { createStore, combineReducers } from 'redux'

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

console.log(store.getState())
store.dispatch({type:'ADD_TODO',id:0,text:'The first todo'})
console.log(store.getState())
store.dispatch({type:'SET_VIS_FILTER',filter:'SHOW_COMPLETED'})
console.log(store.getState())