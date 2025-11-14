import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

const initialState = {
  user: null,
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, tasks: [] };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, { id: Date.now(), ...action.payload }] };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, title: action.payload.title } : t
        ),
      };
    case "SET_STATE":
      return action.payload;
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const savedData = await AsyncStorage.getItem("appState");
        if (savedData) {
          dispatch({ type: "SET_STATE", payload: JSON.parse(savedData) });
        }
      } catch (e) {
        console.log("Error loading data:", e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("appState", JSON.stringify(state));
      } catch (e) {
        console.log("Error saving data:", e);
      }
    })();
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};