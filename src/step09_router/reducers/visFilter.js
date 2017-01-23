const visFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_VIS_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visFilter