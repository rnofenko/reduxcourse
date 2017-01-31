import { v4 } from 'uuid'

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: 'hey1',
      completed: true
    },
    {
      id: v4(),
      text: 'hey2',
      completed: false
    },
    {
      id: v4(),
      text: 'hey3',
      completed: true
    },
    {
      id: v4(),
      text: 'hey4',
      completed: false
    }
  ]
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const delayTime = 500

export const fetchTodos = (filter) =>
  delay(delayTime).then(()=> {
    // if(Math.random() > 0.9){
    //   throw new Error('Boom')
    // }

    switch(filter){
      case 'all':
        return fakeDatabase.todos
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed)
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed)
      default:
        return fakeDatabase.todos
    }
  })

export const addTodo = (text) =>
  delay(delayTime).then(()=> {
    const todo = {
      id: v4(),
      text,
      completed: false
    }
    fakeDatabase.todos.push(todo)
    return todo
  })

export const toggleTodo = (id) =>
  delay(delayTime).then(()=> {
    const todo = fakeDatabase.todos.find(t => t.id === id)
    todo.completed = !todo.completed
    return todo
  })