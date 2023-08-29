import React, { useState } from "react";
import Card from "./components/card/Card";
import Input from "./components/input/Input";
import Modal from "./components/modal/Modal";
import TodoItem from "./components/todo-item/TodoItem";
import TextArea from "./components/input/TextArea";
import Button from "./components/button/Button";
import "./App.css";

const TODOS_MOCK = [
  {
    id: "1",
    title: "Todo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!",
    completed: false,
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
  {
    id: "4",
    title: "Todo 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
];

function App() {
  const [todos, setTodos] = useState(TODOS_MOCK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() !== '') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTitle = formData.title.trim() === '' ? (editingTodo ? editingTodo.title : '') : formData.title;
    const newDescription = formData.description.trim() === '' ? (editingTodo ? editingTodo.description : '') : formData.description;
  
    if (editingTodo) {
      const updatedTodo = { ...editingTodo, title: newTitle, description: newDescription };
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } else {
      const newTodo = {
        id: (Math.random() * 1000).toString(),
        title: newTitle,
        description: newDescription,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
  
    setFormData({ title: "", description: "" });
    setEditingTodo(null);
    toggleModal();
  };

  const handleCheckboxChange = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    toggleModal();
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="App">
      <div className="app-container">
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <Card>
            <h2>{editingTodo ? "Edit Todo" : "Create Todo"}</h2>
            <form onSubmit={handleSubmit}>
              <Input
                onChange={handleInputChange}
                value={formData.title}
                name="title"
                placeholder="Title"
                type="text"
              />
              <TextArea
                onChange={handleInputChange}
                value={formData.description}
                name="description"
                placeholder="Description"
              />
              <Button type="submit">{editingTodo ? "Update" : "Create"}</Button>
            </form>
          </Card>
        </Modal>
        <Card>
          <h1>My todos</h1>
          <Button onClick={toggleModal}>Add +</Button>
          <div className="list-container">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onCheckboxChange={handleCheckboxChange}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>

          <div className="separator"></div>

          <h2>Completed</h2>
          <div className="list-container">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onCheckboxChange={handleCheckboxChange}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
