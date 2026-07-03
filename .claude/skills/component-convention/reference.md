# 컴포넌트 컨벤션 — 상세 규칙

SKILL.md의 요약 규칙을 자세히 풀어 쓴 문서. 컴포넌트를 만들 때 헷갈리면 이 파일을 참고한다.
모든 규칙은 실제 저장소(`components/`, `lib/`, `app/`)의 코드에서 뽑아낸 것이다.

## 1. 폴더 구조

`src/` 없이 저장소 루트에 바로 둔다.

```
components/        # 모든 컴포넌트 (PascalCase 파일명)
│   ├── Header.tsx
│   ├── TodoInput.tsx
│   ├── TodoList.tsx
│   └── TodoItem.tsx
lib/
│   ├── types.ts   # 공용 타입 (Todo, Filter, Sort, Priority)
│   ├── utils.ts   # 공용 함수 (formatDate, sortBy*, countRemaining ...)
│   └── mock-data.ts
app/
    ├── page.tsx   # 상태를 소유하는 클라이언트 루트
    └── layout.tsx
```

- 컴포넌트는 반드시 `components/` 안에 둔다. 한 파일 = 한 컴포넌트.
- 파일명과 컴포넌트명을 똑같이 맞춘다 (`TodoStats.tsx` → `TodoStats`).

## 2. 네이밍

- 파일·컴포넌트: **PascalCase**
- props 타입: 컴포넌트 파일 상단에 **`interface Props`** 로 선언 (컴포넌트명을 붙이지 않는다)
- 콜백 props: **`on` + 동작** (`onToggle`, `onDelete`, `onAdd`, `onFilterChange`)
- 컴포넌트 내부 이벤트 핸들러: **`handle` + 동작** (`handleAdd`)
- `page.tsx`의 상태 변경 함수: **동사 + 대상** (`addTodo`, `toggleTodo`, `deleteTodo`)

## 3. export

- 항상 **`export default function`** 으로 내보낸다. named export(`export function ...`)를 쓰지 않는다.

```tsx
export default function TodoList({ todos }: Props) { ... }
```

## 4. props 타입

- 컴포넌트 파일 상단에 `interface Props`로 분리한다. 인라인(`{ x }: { x: T }`)으로 쓰지 않는다.
- props에 들어가는 도메인 타입(`Todo`, `Priority` 등)은 **직접 선언하지 않고** `@/lib/types`에서 import 한다.

```tsx
import { Todo } from "@/lib/types";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
}
```

## 5. 상태(state) / "use client"

- `useState`·`useEffect` 같은 훅을 쓰거나, `onClick`·`onChange` 등 **이벤트 핸들러를 붙이면** 파일 첫 줄에 `"use client"`.
- 순수하게 props만 받아 그리는 컴포넌트(`Header`, `TodoStats`)는 `"use client"` 없이 **서버 컴포넌트**로 둔다.

## 6. import 순서 & 경로 별칭

1. React / 외부 라이브러리 (`import { useState } from "react"`)
2. 내부 모듈 (`@/lib/types`, `@/lib/utils`)
3. 컴포넌트 (`@/components/...`)

- 경로 별칭 `@/*` 는 저장소 루트를 가리킨다. 상대경로(`../lib/types`) 대신 `@/lib/types`를 쓴다.

## 7. 스타일

- **Tailwind 유틸 클래스만** 사용. `.css`/`.module.css` 파일을 새로 만들지 않는다.
- 팔레트:
  - 텍스트/보더/배경: `gray-*`(예: `text-gray-900`, `border-gray-200`, `bg-gray-50`)
  - 포인트 컬러(강조·액션): **`#D97757`** (`text-[#D97757]`, `bg-[#D97757]`)
  - 상태색: 위험/삭제 `red-*`, 우선순위 배지 `red`/`amber`/`green`
- 조건부 클래스는 템플릿 리터럴로 조합한다.

## 8. 기타

- 들여쓰기는 **2칸**.
- UI 텍스트·주석은 **한국어**로 작성한다.
