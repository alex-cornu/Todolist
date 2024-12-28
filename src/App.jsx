import "./App.css";
import React, { useState } from "react";
import { Plus } from "lucide-react";

// Composant pour afficher un todo avec une case à cocher et un bouton Delete
function Todo({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item flex items-center gap-2">
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
        className="grow"
      >
        {todo.todo}
      </span>
      <button
        className="btn btn-square btn-outline"
        onClick={() => onDelete(todo.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

// Composant principal App
export default function App() {
  const [todos, setTodos] = useState([
    {
      todo: "faire des courses",
      completed: false,
      id: Date.now(),
    },
  ]);

  // Fonction pour basculer l'état completed d'un todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Fonction pour supprimer un todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Gestion de la soumission du formulaire
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo");

    if (!todo.trim()) return; // Ignore les entrées vides et supprime les espaces

    const newTodo = {
      todo: todo,
      completed: false,
      id: Date.now(),
    };

    setTodos([...todos, newTodo]);
    e.currentTarget.reset();
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            name="todo"
            type="text"
            className="grow"
            placeholder="Ajouter une tâche"
          />
          <button type="submit" className="btn btn-outline btn-sm">
            <Plus size={16} />
          </button>
        </label>
      </form>
      <div className="flex flex-col gap-4 mt-4">
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
