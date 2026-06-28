"use client";

import { Priority, Todo } from "@/lib/types";
import { fd, PRIORITY_LABEL } from "@/lib/utils";
import Checkbox from "./Checkbox";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// 우선순위별 배지 색상
const PRIORITY_STYLE: Record<Priority, string> = {
  high: "bg-red-50 text-red-500",
  normal: "bg-amber-50 text-amber-600",
  low: "bg-green-50 text-green-600",
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const priority = todo.priority ?? "normal";

  return (
    <li className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors duration-200 hover:bg-orange-50/40">
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLE[priority]}`}
          >
            {PRIORITY_LABEL[priority]}
          </span>
          <p
            className={`transition-colors duration-200 ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.text}
          </p>
        </div>
        <span className="text-xs text-gray-400">
          {fd(todo.createdAt)}
          {todo.dueDate && ` · 마감 ${fd(todo.dueDate)}`}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="rounded-md px-2 py-1 text-sm text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
      >
        삭제
      </button>
    </li>
  );
}
