import { Todo } from "@/lib/types";
import { countRemaining } from "@/lib/utils";

interface Props {
  todos: Todo[];
}

export default function TodoStats({ todos }: Props) {
  const total = todos.length;
  const remaining = countRemaining(todos);
  const completed = total - remaining;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

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
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>완료율</span>
          <span className="font-medium text-[#D97757]">{percent}%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[#D97757] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
