import React, { createContext, useReducer, useEffect } from 'react';


const initialState = {
user: null,
tasks: [],
};


const reducer = (state, action) => {
switch (action.type) {
case 'LOGIN':
return { ...state, user: action.payload };
case 'LOGOUT':
return { ...state, user: null };
case 'ADD_TASK':
return { ...state, tasks: [...state.tasks, action.payload] };
case 'DELETE_TASK':
return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
case 'TOGGLE_COMPLETE':
return {
...state,
tasks: state.tasks.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t),
};
case 'LOAD_TASKS':
return { ...state, tasks: action.payload };
default:
return state;
}
};


export const AppContext = createContext();


export const AppProvider = ({ children }) => {
const [state, dispatch] = useReducer(reducer, initialState);


// Load tasks from storage on start
useEffect(() => {
(async () => {
try {
const stored = await AsyncStorage.getItem('TM_TASKS_v1');
if (stored) dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(stored) });
} catch (e) {
console.warn('Failed to load tasks', e);
}
})();
}, []);


// Persist tasks when they change
useEffect(() => {
(async () => {
try {
await AsyncStorage.setItem('TM_TASKS_v1', JSON.stringify(state.tasks));
} catch (e) {
console.warn('Failed to save tasks', e);
}
})();
}, [state.tasks]);


return (
<AppContext.Provider value={{ state, dispatch }}>
{children}
</AppContext.Provider>
);
};