import { DndContext } from "@dnd-kit/core";

import { useTodos } from "./hooks/useTodos";
import { TodoInput } from "./components/TodoInput/TodoInput";
import { TodoList } from "./components/TodoList/TodoList";

import "./App.css";
import { getProgress } from "./utils/todoProgress";

export const App = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodo,
    moveTodo,
    moveTodoToRoot,
  } = useTodos();

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    if (active.id === over.id) return;

    if (over.id === "ROOT") {
      moveTodoToRoot(active.id);
    } else {
      moveTodo(active.id, over.id);
    }
  };

  return (
    <main>
      <h1>Список задач</h1>
      <TodoInput onAdd={addTodo} />

      <DndContext onDragEnd={handleDragEnd}>
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onRemove={removeTodo}
          onEdit={editTodo}
          onAddSubtask={addTodo}
          getProgress={getProgress}
        />
      </DndContext>
    </main>
  );
};

export default App;
