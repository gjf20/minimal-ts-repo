const initialState = {
    todos: [{id: 0, text: 'yee', completed: true}],
};

type PayloadType = string;

export default function appReducer(state = initialState, action: {type: string; payload?: PayloadType}) {
    switch (action.type) {
        case 'todos/todoAdded': {
            const newTodo = {id: state.todos.length + 1, text: action.payload ?? 'foo', completed: false};
            return {
                ...state,
                todos: [...state.todos, newTodo],
            };
        }
        default:
            return state;
    }
}
