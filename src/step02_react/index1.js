import React from 'react';
import ReactDOM from 'react-dom';
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

const Counter = ({value}) => (
  <h1>{value}</h1>
)

ReactDOM.render(
  <Counter value={store.getState()} />,
  document.getElementById('root')
)

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