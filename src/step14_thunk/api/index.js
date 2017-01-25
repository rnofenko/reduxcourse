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

export const fetchTodos = (filter) =>
  delay(5000).then(()=>{
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