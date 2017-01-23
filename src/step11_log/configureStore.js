import { createStore } from 'redux'
import throttle from 'lodash/throttle'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(todoApp, persistedState)

  const throttleSave = throttle(() => { saveState(store.getState()) }, 5000)
  store.subscribe(throttleSave)

  return store
}

export default configureStore