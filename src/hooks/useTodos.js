import { useEffect, useState } from "react";
import { loadTodos, saveTodos } from "../utils/storage";
import * as tree from "../utils/todoTree";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  const saveAndSet = (next) => {
    setTodos(next);
    saveTodos(next);
  };

  const addTodo = (text, parentId = null) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
      subtasks: [],
    };

    const next = parentId
      ? tree.addSubtaskById(todos, parentId, newTodo)
      : [newTodo, ...todos];

    saveAndSet(next);
  };

  const removeTodo = (id) => {
    const { tasks } = tree.removeById(todos, id);
    saveAndSet(tree.updateCompletionTree(tasks));
  };

  const editTodo = (id, text) => {
    saveAndSet(tree.editById(todos, id, text));
  };

  const toggleTodo = (id) => {
    const toggle = (tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return tree.setCompletedDeep(task, !task.completed);
        }

        if (!task.subtasks.length) return task;

        return {
          ...task,
          subtasks: toggle(task.subtasks),
        };
      });

    saveAndSet(tree.updateCompletionTree(toggle(todos)));
  };

  const moveTodo = (dragId, dropId) => {
    const { tasks, removed } = tree.removeById(todos, dragId);
    if (!removed) return;
    if (tree.containsId(removed, dropId)) return;

    const next = tree.insertAsChild(tasks, dropId, removed);
    saveAndSet(tree.updateCompletionTree(next));
  };

  const moveTodoToRoot = (id) => {
    const { tasks, removed } = tree.removeById(todos, id);
    if (!removed) return;
    saveAndSet(tree.updateCompletionTree([removed, ...tasks]));
  };

  return {
    todos,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    moveTodo,
    moveTodoToRoot,
  };
};
