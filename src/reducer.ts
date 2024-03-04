import {combineReducers} from '@reduxjs/toolkit';

import todosReducer from './features/todos/todosSlice';

const appReducer = combineReducers({todos: todosReducer});

export default appReducer;
