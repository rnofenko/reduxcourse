import expect from 'expect'
import { createStore } from 'redux'

const counter = (state = 0, action) => {
  if(action.type ==='INC'){
    return state + 1
  }
  if(action.type ==='DEC'){
    return state - 1
  }
  return state
}

const store = createStore(counter)
console.log(store.getState())

store.dispatch({type:'INC'})
console.log(store.getState())

store.subscribe(()=>{
  console.log('subscribe',store.getState())
})

store.dispatch({type:'INC'})
store.dispatch({type:'INC'})
store.dispatch({type:'INC'})
store.dispatch({type:'INC'})
store.dispatch({type:'INC'})