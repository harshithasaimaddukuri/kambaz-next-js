"use client"
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";

export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex gap-2 align-items-center">
      <span className="flex-grow-1">{todo.title}</span>
      <Button 
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
        variant="primary"
        className="text-nowrap"
      > 
        Edit 
      </Button>
      <Button 
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
        variant="danger"
        className="text-nowrap"
      > 
        Delete 
      </Button>
    </ListGroupItem>
  );
}