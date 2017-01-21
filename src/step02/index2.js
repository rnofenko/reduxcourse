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

const Counter = ({value, onInc, onDec}) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onInc}>+</button>
  <button onClick={onDec}>-</button>
  </div>
)

const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()} onInc={()=> store.dispatch({type: 'INC'})} onDec={()=> store.dispatch({type: 'DEC'})} />,
    document.getElementById('root')
  )
}

store.subscribe(()=>render())
render()