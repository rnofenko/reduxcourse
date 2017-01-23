import React from 'react'
import { connect } from 'react-redux'
import { setVisFilter } from '../actions'

const Link = ({active, children, onClick}) => {
  if(active){
    return <span>{children}</span>
  }
  return (
    <a href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >{children}</a>
  )
}
const mapStateToLinkProps = (state, props) => ({
  active: props.filter === state.visFilter
})
const mapDispatchToLinkProps = (dispatch, props) => ({
    onClick () { dispatch(setVisFilter(props.filter)) }
})
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)

export default FilterLink