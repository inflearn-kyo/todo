#!/usr/bin/env bash
# PreToolUse(Bash) 훅: rm -rf 같은 위험 명령을 실행 전에 차단합니다.
# stdin 으로 훅 입력 JSON 을 받아 command 를 검사하고,
# 위험 패턴이면 permissionDecision "deny" 를 반환해 실행을 막습니다.

set -euo pipefail

input=$(cat)
command=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')

# 차단할 위험 패턴 (설명|정규식) 목록
patterns=(
  "rm 재귀·강제 삭제(rm -rf)|(^|[^[:alnum:]])rm[[:space:]]+(-[[:alnum:]]*[rR][[:alnum:]]*[fF]|-[[:alnum:]]*[fF][[:alnum:]]*[rR]|-[rR][[:space:]]+-[fF]|-[fF][[:space:]]+-[rR])"
  "디스크 직접 덮어쓰기(dd of=)|(^|[^[:alnum:]])dd[[:space:]].*of=/dev/"
  "파일시스템 포맷(mkfs)|(^|[^[:alnum:]])mkfs"
  "디스크 장치로 리다이렉트|>[[:space:]]*/dev/(sd|nvme|disk)"
  "포크 폭탄|:\(\)[[:space:]]*\{[[:space:]]*:[[:space:]]*\|[[:space:]]*:"
  "루트 권한 재귀 변경(chmod -R 777 /)|(^|[^[:alnum:]])chmod[[:space:]]+-R[[:space:]]+777[[:space:]]+/"
)

for entry in "${patterns[@]}"; do
  desc="${entry%%|*}"
  regex="${entry#*|}"
  if printf '%s' "$command" | grep -Eq "$regex"; then
    reason="위험 명령으로 판단되어 차단했습니다: ${desc}. 실행하려던 명령: ${command}"
    jq -n --arg reason "$reason" '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: $reason
      }
    }'
    exit 0
  fi
done

# 위험 패턴이 없으면 그대로 통과
exit 0
