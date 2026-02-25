export const demoTodos = [
  {
    id: "project-portfolio",
    text: "Portfolio Project: Nested Todo App",
    completed: false,
    createdAt: Date.now(),
    subtasks: [
      {
        id: "ui",
        text: "UI & UX",
        completed: false,
        createdAt: Date.now(),
        subtasks: [
          {
            id: "layout",
            text: "Design main layout",
            completed: true,
            createdAt: Date.now(),
            subtasks: [],
          },
          {
            id: "responsive",
            text: "Make responsive layout",
            completed: true,
            createdAt: Date.now(),
            subtasks: [],
          },
          {
            id: "styles",
            text: "Polish styles & spacing",
            completed: false,
            createdAt: Date.now(),
            subtasks: [],
          },
        ],
      },
      {
        id: "logic",
        text: "Business logic",
        completed: false,
        createdAt: Date.now(),
        subtasks: [
          {
            id: "nested",
            text: "Nested todos support",
            completed: false,
            createdAt: Date.now(),
            subtasks: [],
          },
          {
            id: "progress",
            text: "Progress calculation",
            completed: true,
            createdAt: Date.now(),
            subtasks: [],
          },
          {
            id: "sync",
            text: "Parent/child completion sync",
            completed: false,
            createdAt: Date.now(),
            subtasks: [],
          },
        ],
      },
    ],
  },

  {
    id: "dnd",
    text: "Drag & Drop",
    completed: false,
    createdAt: Date.now(),
    subtasks: [
      {
        id: "move-inside",
        text: "Move task inside another task",
        completed: true,
        createdAt: Date.now(),
        subtasks: [],
      },
      {
        id: "move-root",
        text: "Move task to root",
        completed: false,
        createdAt: Date.now(),
        subtasks: [],
      },
      {
        id: "edge-cases",
        text: "Handle edge cases",
        completed: false,
        createdAt: Date.now(),
        subtasks: [],
      },
    ],
  },

  {
    id: "quality",
    text: "Code quality",
    completed: true,
    createdAt: Date.now(),
    subtasks: [
      {
        id: "hooks",
        text: "Extract logic into hooks",
        completed: true,
        createdAt: Date.now(),
        subtasks: [],
      },
      {
        id: "utils",
        text: "Move tree logic to utils",
        completed: true,
        createdAt: Date.now(),
        subtasks: [],
      },
      {
        id: "cleanup",
        text: "Refactor & cleanup",
        completed: true,
        createdAt: Date.now(),
        subtasks: [],
      },
    ],
  },
];
