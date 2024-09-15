import React, { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/Todoform";
import TodoItem from "./components/Todoitem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== prevTodo.id));
  };
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    try {
      if (savedTodos) {
        // Try parsing the saved todos, if invalid it will fall into the catch block
        setTodos(JSON.parse(savedTodos));
      } else {
        // Set an empty array if there is no data in localStorage
        setTodos([]);
      }
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      // If the stored data is invalid, clear it and set an empty array
      localStorage.removeItem("todos");
      setTodos([]);
    }
  }, []);
  
  

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
