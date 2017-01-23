import { combineReducers } from 'redux';
import todos from './todos';
import visFilter from './visFilter';

const todoApp = combineReducers({
  todos,
  visFilter,
});

export default todoApp;