# 컴포넌트 예시

컨벤션을 그대로 지킨 실제 저장소 컴포넌트들. 새 컴포넌트를 만들 때 이 스타일을 따라 한다.

## 예시 1 — 순수 표시 컴포넌트 (서버 컴포넌트)

props만 받아 그리고 이벤트 핸들러가 없으므로 `"use client"` 불필요.
타입은 `@/lib/types`에서, 계산은 `@/lib/utils`에서 가져온다. props 타입은 상단 `interface Props`.

```tsx
// components/TodoStats.tsx
import { Todo } from "@/lib/types";
import { countRemaining } from "@/lib/utils";

interface Props {
  todos: Todo[];
}

export default function TodoStats({ todos }: Props) {
  const total = todos.length;
  const remaining = countRemaining(todos);
  const completed = total - remaining;

  return (
    <section className="border-b border-gray-200 p-4">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-lg font-bold text-gray-900">{total}</p>
          <p className="text-xs text-gray-500">전체</p>
        </div>
        <div>
          <p className="text-lg font-bold text-[#D97757]">{remaining}</p>
          <p className="text-xs text-gray-500">남은 할일</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{completed}</p>
          <p className="text-xs text-gray-500">완료</p>
        </div>
      </div>
    </section>
  );
}
```

## 예시 2 — 콜백을 받는 상호작용 컴포넌트 (클라이언트 컴포넌트)

`onClick` 이벤트 핸들러가 있으므로 첫 줄에 `"use client"`.
콜백 props는 `on*`(`onToggle`, `onDelete`) 네이밍. 상태를 소유하지 않고 위로 콜백만 올린다.

```tsx
// components/TodoList.tsx
"use client";

import { Todo } from "@/lib/types";
import TodoItem from "@/components/TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
```

## 예시 3 — 상태(useState)를 쓰는 입력 컴포넌트

`useState`를 쓰므로 `"use client"`.
내부 이벤트 처리 함수는 `handle*`(`handleAdd`), 부모로 올리는 콜백 prop은 `on*`(`onAdd`).
포인트 컬러 `#D97757`, 회색 팔레트, 2칸 들여쓰기.

```tsx
// components/TodoInput.tsx
"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("할일을 입력하세요");
      return;
    }
    onAdd(trimmed, "normal");
    setText("");
    setError("");
  };

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#D97757] focus:bg-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할일을 입력하세요."
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#D97757] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c96647]"
        >
          추가
        </button>
      </div>
      {error && <p className="mt-2 px-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
```

---

정리: **`export default function` · 상단 `interface Props` · `@/lib/*` import · 이벤트/훅 있으면 `"use client"` · `on*`/`handle*` 네이밍 · Tailwind(gray + `#D97757`) · 2칸 들여쓰기 · 한국어 텍스트** — 이 스타일을 그대로 지켜서 새 컴포넌트를 만든다.
