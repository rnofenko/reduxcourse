import React from 'react'
import { Link } from 'react-router'

const FilterLink = ({filter, children}) => (
  <Link
    to={filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'orange'
    }}
  >
    {children}
  </Link>
)

export default FilterLink