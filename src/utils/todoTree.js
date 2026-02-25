export const findById = (tasks, id) => {
  for (const task of tasks) {
    if (task.id === id) return task;
    if (task.subtasks.length) {
      const found = findById(task.subtasks, id);
      if (found) return found;
    }
  }
  return null;
};

export const containsId = (task, id) => {
  if (task.id === id) return true;
  return task.subtasks.some((sub) => containsId(sub, id));
};

export const addSubtaskById = (tasks, parentId, subtask) =>
  tasks.map((task) => {
    if (task.id === parentId) {
      return {
        ...task,
        completed: false,
        subtasks: [...task.subtasks, subtask],
      };
    }

    if (!task.subtasks.length) return task;

    return {
      ...task,
      subtasks: addSubtaskById(task.subtasks, parentId, subtask),
    };
  });

export const insertAsChild = (tasks, parentId, child) =>
  tasks.map((task) => {
    if (task.id === parentId) {
      return {
        ...task,
        completed: false,
        subtasks: [...task.subtasks, child],
      };
    }

    if (!task.subtasks.length) return task;

    return {
      ...task,
      subtasks: insertAsChild(task.subtasks, parentId, child),
    };
  });

export const removeById = (tasks, id) => {
  let removed = null;

  const next = tasks
    .filter((task) => {
      if (task.id === id) {
        removed = task;
        return false;
      }
      return true;
    })
    .map((task) => {
      if (!task.subtasks.length) return task;

      const res = removeById(task.subtasks, id);
      if (res.removed) removed = res.removed;

      return { ...task, subtasks: res.tasks };
    });

  return { tasks: next, removed };
};

export const editById = (tasks, id, text) =>
  tasks.map((task) => {
    if (task.id === id) return { ...task, text };

    if (!task.subtasks.length) return task;

    return {
      ...task,
      subtasks: editById(task.subtasks, id, text),
    };
  });

export const setCompletedDeep = (task, completed) => ({
  ...task,
  completed,
  subtasks: task.subtasks.map((sub) => setCompletedDeep(sub, completed)),
});

export const updateCompletionTree = (tasks) =>
  tasks.map((task) => {
    const subtasks = updateCompletionTree(task.subtasks);
    const completed = subtasks.length
      ? subtasks.every((t) => t.completed)
      : task.completed;

    return { ...task, completed, subtasks };
  });
