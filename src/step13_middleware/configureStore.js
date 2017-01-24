import { createStore } from 'redux'
import todoApp from './reducers'

const logger = (store) => {
  return (next) => {
    if(!console.group){
      return next
    }

    return (action) => {
      console.group(action.type)
      console.log('%c prev state', 'color: gray', store.getState())
      console.log('%c action', 'color: blue', action)
      const returnValue = next(action)
      console.log('%c next state', 'color: green', store.getState())
      console.groupEnd(action.type)
      return returnValue
    }
  }
}

const promiseMiddleware = (store) => {
  return (next) => {
    return (action) => {
      if(typeof action.then === 'function'){
        return action.then(next)
      }
      return next(action)
    }
  }
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.forEach(m => store.dispatch = m(store)(store.dispatch))
}

const configureStore = () => {
  const store = createStore(todoApp)
  const middlewares = []

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }
  middlewares.push(promiseMiddleware)

  wrapDispatchWithMiddlewares(store, middlewares)

  return store
}

export default configureStore