"use client";

import { Filter } from "@/lib/types";

interface Props {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const filters: { label: string; value: Filter }[] = [
  { label: "전체", value: "all" },
  { label: "진행중", value: "active" },
  { label: "완료", value: "completed" },
];

export default function FilterBar({ filter, onFilterChange }: Props) {
  return (
    <div className="flex gap-2 px-4 pb-2">
      {filters.map((f) => {
        const isActive = f.value === filter;
        return (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200 active:scale-95 ${
              isActive
                ? "border-[#D97757] bg-[#D97757] text-white"
                : "border-gray-200 text-gray-600 hover:border-[#D97757] hover:text-[#D97757]"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
