import React from 'react'
import Footer from './Footer'
import VisTodoList from './VisTodoList'
import AddTodo from './AddTodo'

const App = () => (
  <div>
    <AddTodo />
    <VisTodoList />
    <Footer />
  </div>
)

export default App