export const countLeaves = (task) => {
  if (!task.subtasks.length)
    return { total: 1, completed: task.completed ? 1 : 0 };
  return task.subtasks.reduce(
    (acc, sub) => {
      const res = countLeaves(sub);
      return {
        total: acc.total + res.total,
        completed: acc.completed + res.completed,
      };
    },
    { total: 0, completed: 0 },
  );
};

export const getProgress = (task) => {
  const { total, completed } = countLeaves(task);
  return total === 0 ? 0 : Math.round((completed / total) * 100);
};
