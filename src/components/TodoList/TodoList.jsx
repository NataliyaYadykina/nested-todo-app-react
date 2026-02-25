import styles from "./TodoList.module.css";
import { TodoItem } from "../TodoItem/TodoItem";
import { useDroppable } from "@dnd-kit/core";

export const TodoList = ({
  todos,
  onToggle,
  onRemove,
  onEdit,
  onAddSubtask,
  getProgress,
}) => {
  // ROOT drop-зона
  const { setNodeRef, isOver } = useDroppable({ id: "ROOT" });

  if (!todos || todos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Список задач пуст</p>
        <span>Добавь первую задачу</span>
      </div>
    );
  }

  return (
    <ul
      ref={setNodeRef}
      className={`${styles.list} ${isOver ? styles.rootOver : ""}`}
    >
      {todos.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
          onAddSubtask={onAddSubtask}
          getProgress={getProgress}
        />
      ))}
    </ul>
  );
};
