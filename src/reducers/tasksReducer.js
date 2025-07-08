export default function tasksReducer(state, action) {
    switch (action.type) {
        case 'LOAD_TASKS':
            return action.payload;

        case 'ADD_TASK':
            return [...state, action.payload];

        case 'REMOVE_TASK':
            return state.filter(t => t.id !== action.payload); // ✅ CORRETTO

        case 'REMOVE_MULTIPLE_TASKS':
            return state.filter(t => !action.payload.includes(t.id)); // ✅ CORRETTO

        case 'UPDATE_TASK':
            return state.map(t => t.id === action.payload.id ? action.payload : t); // ✅ CORRETTO

        default:
            return state;
    }
}