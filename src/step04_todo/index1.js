import expect from 'expect'
import deepFreeze from 'deep-freeze'

const todo = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return {
          id: action.id,
          text: action.text,
          completed: false
        }
      case 'TOGGLE_TODO':
          if(state.id != action.id){
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

const testAddTtodo = () => {
  const stateBefore = []
  const action = {
    id: 0,
    type: 'ADD_TODO',
    text: 'hello'
  }
  const stateAfter = [
    {
      id: 0,
      text: 'hello',
      completed: false
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter)
}

const testToggleTtodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'hello',
      completed: false
    },
    {
      id: 1,
      text: 'buy',
      completed: false
    }
  ]
  const action = {
    id: 1,
    type: 'TOGGLE_TODO'
  }
  const stateAfter = [
    {
      id: 0,
      text: 'hello',
      completed: false
    },
    {
      id: 1,
      text: 'buy',
      completed: true
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter)
}

testAddTtodo()
testToggleTtodo()
console.log('All tests passed!')