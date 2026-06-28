"use client";

import { Sort } from "@/lib/types";

interface Props {
  sort: Sort;
  onSortChange: (sort: Sort) => void;
}

const sorts: { label: string; value: Sort }[] = [
  { label: "기본", value: "created" },
  { label: "마감일순", value: "dueDate" },
  { label: "우선순위순", value: "priority" },
];

export default function SortBar({ sort, onSortChange }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 pb-3">
      <span className="text-xs text-gray-400">정렬</span>
      {sorts.map((s) => {
        const isActive = s.value === sort;
        return (
          <button
            key={s.value}
            onClick={() => onSortChange(s.value)}
            className={`rounded-full border px-3 py-1 text-xs transition-all duration-200 active:scale-95 ${
              isActive
                ? "border-[#D97757] bg-[#D97757] text-white"
                : "border-gray-200 text-gray-600 hover:border-[#D97757] hover:text-[#D97757]"
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
