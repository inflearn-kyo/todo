type TodoBadgeProps = {
  count: number;
};

export function TodoBadge({ count }: TodoBadgeProps) {
  return <span className="badge">{count === 0 ? "완료" : count}</span>;
}
