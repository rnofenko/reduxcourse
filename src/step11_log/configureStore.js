import { createStore } from 'redux'
import throttle from 'lodash/throttle'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch
  if(!console.group){
    return rawDispatch
  }

  return (action) => {
    console.group(action.type)
    console.log('%c prev state', 'color: gray', store.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(todoApp, persistedState)

  if(process.env.NODE_ENV !== 'production'){
    store.dispatch = addLoggingToDispatch(store)
  }
  
  const throttleSave = throttle(() => { saveState(store.getState()) }, 5000)
  store.subscribe(throttleSave)

  return store
}

export default configureStore