"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import FilterBar from "@/components/FilterBar";
import SortBar from "@/components/SortBar";
import TodoStats from "@/components/TodoStats";
import TodoList from "@/components/TodoList";
import { mockTodos } from "@/lib/mock-data";
import { Filter, Priority, Sort, Todo } from "@/lib/types";
import { sortByDueDate, sortByPriority } from "@/lib/utils";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("created");

  const addTodo = (text: string, priority: Priority, dueDate?: string) => {
    const newTodo: Todo = {
      id: String(Date.now()),
      text,
      completed: false,
      createdAt: new Date().toISOString().slice(0, 10),
      priority,
      dueDate,
    };
    setTodos([newTodo, ...todos]);
    console.log("할일 추가됨:", text);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const visibleTodos =
    sort === "dueDate"
      ? sortByDueDate(filteredTodos)
      : sort === "priority"
        ? sortByPriority(filteredTodos)
        : filteredTodos;

  return (
    <>
      <Header todos={todos} />
      <TodoStats todos={todos} />
      <TodoInput onAdd={addTodo} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <SortBar sort={sort} onSortChange={setSort} />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </>
  );
}
