import expect from 'expect'
import deepFreeze from 'deep-freeze'

const addCounter = (list) => {
  return [...list, 0]
}

const testAddCounter = () => {
  const listBefore = []
  const listAfter = [0]

  deepFreeze(listBefore)

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter)
}

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}

const testRemoveCounter = () => {
  const listBefore = [1,2,3]
  const listAfter = [1,3]

  deepFreeze(listBefore)

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter)
}

const intCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ]
}

const testIncCounter = () => {
  const listBefore = [1,2,3]
  const listAfter = [1,3,3]

  deepFreeze(listBefore)

  expect(
    intCounter(listBefore, 1)
  ).toEqual(listAfter)
}

testAddCounter()
testRemoveCounter()
testIncCounter()
console.log('All tests passed!')