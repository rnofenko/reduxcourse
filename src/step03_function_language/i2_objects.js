import expect from 'expect'
import deepFreeze from 'deep-freeze'

const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  }
  // return Object.assign({}, todo, {completed: !todo.completed})
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    completed: false
  }

  const todoAfter = {
    id: 0,
    completed: true
  }
  deepFreeze(todoBefore)

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)
}

testToggleTodo()
console.log('All tests passed!')