프로젝트 개요는 @README.md 를 참조합니다.

# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)에게 가이드를 제공합니다.

## 개요

강의용 스타터 프로젝트로 만들어진 최소한의 한국어 할일 앱("미니 할일")입니다. Next.js 16 App Router, React 19, Tailwind CSS v4로 구성되어 있습니다. UI 텍스트, 주석, 커밋 맥락이 모두 한국어로 되어 있으니, 사용자에게 보이는 문자열을 추가할 때 이 관례를 유지하세요.

## 명령어

```bash
npm run dev      # http://localhost:3000 에서 개발 서버 실행 (Turbopack)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 빌드 서빙
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

테스트 러너는 설정되어 있지 않습니다. 포매팅은 Prettier를 사용합니다(`.prettierrc`: 세미콜론, 큰따옴표, 후행 쉼표, 80칸).

## 아키텍처

- **단일 페이지 클라이언트 앱.** `app/page.tsx`는 `"use client"` 컴포넌트로, `lib/mock-data.ts`에서 초기값을 받아 `useState`로 모든 할일 상태를 관리합니다. 백엔드, 라우터 네비게이션, 영속성이 없습니다 — 상태는 메모리에만 존재하며 새로고침하면 초기화됩니다. `app/layout.tsx`는 고정된 모바일 너비(`max-w-md`)의 흰색 카드 셸을 제공합니다.
- **상태는 아래로, 콜백은 위로.** `page.tsx`가 `addTodo` / `toggleTodo` / `deleteTodo`를 정의하고, `todos` 배열과 이 핸들러들을 프레젠테이션 컴포넌트(`Header`, `TodoInput`, `FilterBar`, `TodoList` → `TodoItem`)에 전달합니다. 컴포넌트에는 비즈니스 로직이 없습니다.
- **공유 타입은 `lib/types.ts`에 있습니다**(`Todo`, `Filter`). `@/*` 경로 별칭(저장소 루트로 매핑, 예: `@/lib/types`, `@/components/TodoItem`)을 통해 임포트하세요.


## 코딩 컨벤션

- 들여쓰기는 2칸
- 컴포넌트는 components 폴더로 분리, 타입은 lib/types.ts 파일로 분리