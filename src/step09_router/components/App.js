import React from 'react'
import Footer from './Footer'
import VisTodoList from './VisTodoList'
import AddTodo from './AddTodo'

const App = ({ params }) => (
  <div>
    <AddTodo />
    <VisTodoList filter={params.filter || 'all'} />
    <Footer />
  </div>
)

export default App