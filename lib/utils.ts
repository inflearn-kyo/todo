import { Todo, Priority } from "@/lib/types";

// 날짜 문자열을 보기 좋게 바꿔주는 함수
export function fd(d: string) {
  let result = "";
  const x = new Date(d);
  const y = x.getFullYear();
  const m = x.getMonth() + 1;
  const dd = x.getDate();
  if (m < 10) {
    result = result + y + "년 " + "0" + m + "월 ";
  } else {
    result = result + y + "년 " + m + "월 ";
  }
  if (dd < 10) {
    result = result + "0" + dd + "일";
  } else {
    result = result + dd + "일";
  }
  return result;
}

// 우선순위 정렬 가중치 (높음 → 보통 → 낮음)
const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  normal: 1,
  low: 2,
};

// 우선순위 한글 라벨
export const PRIORITY_LABEL: Record<Priority, string> = {
  high: "높음",
  normal: "보통",
  low: "낮음",
};

// 할일을 마감일이 빠른 순으로 정렬한다.
// 마감일이 없는 할일은 뒤로 보내며, 원본 배열은 변경하지 않는다.
export function sortByDueDate(todos: Todo[]) {
  return [...todos].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

// 할일을 우선순위(높음 → 보통 → 낮음) 순으로 정렬한다.
// 우선순위가 없으면 "보통"으로 간주하며, 원본 배열은 변경하지 않는다.
export function sortByPriority(todos: Todo[]) {
  return [...todos].sort(
    (a, b) =>
      PRIORITY_ORDER[a.priority ?? "normal"] -
      PRIORITY_ORDER[b.priority ?? "normal"],
  );
}

export function countRemaining(todos: Todo[]) {
  return todos.filter((todo) => !todo.completed).length;
}
