import expect from 'expect'
import deepFreeze from 'deep-freeze'

const todos = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
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

testAddTtodo()
console.log('All tests passed!')