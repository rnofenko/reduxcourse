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

expect(
  counter(0, {type:'INC'})
).toEqual(1)

expect(
  counter(1, {type:'INC'})
).toEqual(2)

expect(
  counter(3, {type:'DEC'})
).toEqual(2)

expect(
  counter(undefined, {type:'DEC'})
).toEqual(-1)

console.log('Tests passed!')