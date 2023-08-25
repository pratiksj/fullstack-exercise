
const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return state.concat(action.payload)
        case 'TOGGLE_IMPORTANCE': {
            const id = action.payload.id
            console.log(id, 'from reducer')
            const noteToChange = state.find((data) => data.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map((data) => data.id === id ? changedNote : data)
        }
        default: return state

    }



};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));
export const createNote = (content) => {

    return {
        type: "NEW_NOTE",
        payload: {
            content,
            important: false,
            id: generateId(),
        },
    };
};

export const toggleImportanceOf = (id) => {
    return {
        type: "TOGGLE_IMPORTANCE",
        payload: { id },
    };
};

export default noteReducer


