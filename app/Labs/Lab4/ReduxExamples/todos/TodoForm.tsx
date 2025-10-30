"use client"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex gap-2 align-items-center">
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Enter todo title"
        id="wd-todo-title-input"
      />
      <Button 
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        variant="warning"
        className="text-nowrap"
      > 
        Update 
      </Button>
      <Button 
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        variant="success"
        className="text-nowrap"
      > 
        Add 
      </Button>
    </ListGroupItem>
  );
}