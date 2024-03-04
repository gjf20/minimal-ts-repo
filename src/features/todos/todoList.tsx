import React from 'react';

import {useAppDispatch, useAppSelector} from 'src/hooks';

import {selectTodos, todoAdded} from './todosSlice';

type TodoListProps = {
    className?: string;
};

export default function TodoList({className}: TodoListProps) {
    const todos = useAppSelector(selectTodos);

    const dispatch = useAppDispatch();

    dispatch(todoAdded('hoopla'));

    return <div>TodoList</div>;
}
