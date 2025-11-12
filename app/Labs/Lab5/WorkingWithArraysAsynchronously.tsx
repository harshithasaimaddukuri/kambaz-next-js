
"use client";
import React, { useState, useEffect } from "react";
import { ListGroup, Form, Alert } from "react-bootstrap";
import { FaTrash, FaPlusCircle, FaPencil } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil as FaPencil6 } from "react-icons/fa6";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };

  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };

  const createNewTodo = async () => {
    const todos = await client.createNewTodo();
    setTodos(todos);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({ 
      title: "New Posted Todo", 
      description: "New Description",
      completed: false 
    });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      setErrorMessage(null);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Error deleting todo");
    }
  };

  const editTodo = (todo: any) => {
    const updatedTodos = todos.map(
      (t) => t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error updating todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <Alert 
          id="wd-todo-error-message" 
          variant="danger" 
          className="mb-2 mt-2"
          dismissible
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      )}
      <h4>
        Todos
        <FaPlusCircle 
          onClick={createNewTodo} 
          className="text-success float-end fs-3" 
          id="wd-create-todo"
          style={{ cursor: 'pointer' }}
        />
        <FaPlusCircle 
          onClick={postNewTodo} 
          className="text-primary float-end fs-3 me-3" 
          id="wd-post-todo"
          style={{ cursor: 'pointer' }}
        />
      </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <FaTrash 
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1" 
              id="wd-remove-todo"
              style={{ cursor: 'pointer' }}
            />
            <TiDelete 
              onClick={() => deleteTodo(todo)} 
              className="text-danger float-end me-2 fs-3" 
              id="wd-delete-todo"
              style={{ cursor: 'pointer' }}
            />
            <FaPencil6 
              onClick={() => editTodo(todo)} 
              className="text-primary float-end me-2 mt-1"
              style={{ cursor: 'pointer' }}
            />
            <input 
              type="checkbox" 
              className="form-check-input me-2 float-start"
              checked={todo.completed}
              onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
            />
            {!todo.editing ? (
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </span>
            ) : (
              <Form.Control 
                className="w-50 float-start" 
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) => {
                  const updatedTodo = { ...todo, title: e.target.value };
                  setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
                }}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}