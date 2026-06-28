"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";
import { PRIORITY_LABEL } from "@/lib/utils";

interface Props {
  onAdd: (text: string, priority: Priority, dueDate?: string) => void;
}

const priorities: Priority[] = ["high", "normal", "low"];

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("할일을 입력하세요");
      return;
    }
    onAdd(trimmed, priority, dueDate || undefined);
    setText("");
    setPriority("normal");
    setDueDate("");
    setError("");
  };

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#D97757] focus:bg-white focus:ring-2 focus:ring-[#D97757]/20"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          placeholder="할일을 입력하세요."
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#D97757] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#c96647] active:scale-95"
        >
          추가
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-1">
          {priorities.map((p) => {
            const isActive = p === priority;
            return (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`rounded-full border px-2.5 py-1 text-xs transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "border-[#D97757] bg-[#D97757] text-white"
                    : "border-gray-200 text-gray-500 hover:border-[#D97757] hover:text-[#D97757]"
                }`}
              >
                {PRIORITY_LABEL[p]}
              </button>
            );
          })}
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 outline-none transition-all duration-200 focus:border-[#D97757] focus:bg-white focus:ring-2 focus:ring-[#D97757]/20"
        />
      </div>
      {error && <p className="mt-2 px-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
