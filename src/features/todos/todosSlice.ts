import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {RootState} from 'src/store';

const initialState = {entities: [{id: 0, text: 'yee', completed: true}], status: null};

export type TodosPayloadType = string;

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state, action: PayloadAction<string>) {
            const newTodo = {id: state.entities.length + 1, text: action.payload ?? 'foo', completed: false};
            state.entities.push(newTodo);
        },
    },
});

export const {todoAdded} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.entities;

export default todosSlice.reducer;
