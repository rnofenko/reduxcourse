import expect from 'expect'

const counter = (state = 0, action) => {
  if(action.type ==='INC'){
    return state + 1
  }
  if(action.type ==='DEC'){
    return state - 1
  }
  return state
}

const createStore = (reducer) => {
  let state;
  let listeners = []
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(l=> l())
  }
  const subscribe = (listener) => {
    listeners.push(listener)
    return listeners.filter(l=> l != listener)
  }
  dispatch({})
  return { getState, dispatch, subscribe}
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