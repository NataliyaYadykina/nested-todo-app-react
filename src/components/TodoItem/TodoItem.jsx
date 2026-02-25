import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./TodoItem.module.css";
import { useDraggable, useDroppable } from "@dnd-kit/core";

export const TodoItem = ({
  task,
  level = 0,
  onToggle,
  onRemove,
  onEdit,
  onAddSubtask,
  getProgress,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const [showSubInput, setShowSubInput] = useState(false);
  const [subValue, setSubValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef: dragRef,
  } = useDraggable({ id: task.id });
  const { setNodeRef: dropRef, isOver } = useDroppable({ id: task.id });

  useEffect(() => setValue(task.text), [task.text]);

  const submitEdit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== task.text) onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setValue(task.text);
    setIsEditing(false);
  };

  const submitSubtask = () => {
    const trimmed = subValue.trim();
    if (trimmed) {
      onAddSubtask(trimmed, task.id);
      setSubValue("");
      setShowSubInput(false);
      setIsExpanded(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <li
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      className={`${styles.todo} ${isOver ? styles.over : ""}`}
    >
      <div className={styles.row}>
        <span className={styles.dragHandle} {...listeners} {...attributes}>
          ⠿
        </span>

        {task.subtasks.length > 0 && (
          <button
            className={styles.toggle}
            onClick={() => setIsExpanded((p) => !p)}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        )}

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <input
            className={styles.editInput}
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onBlur={submitEdit}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span
            className={clsx(styles.text, task.completed && styles.completed)}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}

        <button
          className={styles.addSub}
          onClick={() => setShowSubInput((p) => !p)}
        >
          +
        </button>
        <button className={styles.remove} onClick={() => onRemove(task.id)}>
          ✕
        </button>
      </div>

      {task.subtasks.length > 0 && (
        <div className={styles.progressBar}>
          <div
            className={`${styles.progress} ${task.completed && styles.opacity_progress}`}
            style={{ width: `${getProgress(task)}%` }}
          />
        </div>
      )}

      {showSubInput && (
        <div className={styles.subInput}>
          <input
            type="text"
            value={subValue}
            autoFocus
            placeholder="Новая подзадача..."
            onChange={(e) => setSubValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitSubtask();
            }}
          />
          <button onClick={submitSubtask}>Добавить</button>
        </div>
      )}

      {isExpanded && task.subtasks.length > 0 && (
        <ul className={styles.children}>
          {task.subtasks.map((sub) => (
            <TodoItem
              key={sub.id}
              task={sub}
              level={level + 1}
              onToggle={onToggle}
              onRemove={onRemove}
              onEdit={onEdit}
              onAddSubtask={onAddSubtask}
              getProgress={getProgress}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
