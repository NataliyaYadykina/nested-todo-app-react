import { demoTodos } from "./demoTodos";

const STORAGE_KEY = "todos";

export const loadTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : demoTodos;
  } catch {
    return demoTodos;
  }
};

export const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
