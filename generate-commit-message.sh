#!/usr/bin/env bash

# Checa se há staged changes
if ! git diff --cached --quiet; then
  DIFF=$(git diff --cached)

  if [ -z "$DIFF" ]; then
    echo "⚠️ Nenhuma mudança staged encontrada."
    exit 0
  fi

  echo "🔍 Gerando sugestão de mensagem de commit com Sourcegraph Cody..."

  PROMPT="Gere somente uma mensagem de commit, em uma única linha, começando por um verbo no infinitivo em inglês (add, fix, update, remove, refactor, docs, test, chore), seguido de dois pontos e um resumo da mudança. Não escreva explicações, não use blocos de código, markdown ou frases antes ou depois.

$DIFF"

  COMMIT_MESSAGE_RAW=$(echo -e "$PROMPT" | cody chat --stdin)

 # Remove asteriscos, espaços e quebras de linha extras
COMMIT_MESSAGE=$(echo "$COMMIT_MESSAGE_RAW" | grep -E '^(add|fix|update|remove|refactor|docs|test|chore):' | head -1 | sed 's/\*\*//g;s/^[[:space:]]*//;s/[[:space:]]*$//')
if [ -z "$COMMIT_MESSAGE" ]; then
  COMMIT_MESSAGE=$(echo "$COMMIT_MESSAGE_RAW" | awk '/^```/{flag=!flag;next} flag' | grep -E '^(add|fix|update|remove|refactor|docs|test|chore):' | head -1 | sed 's/\*\*//g;s/^[[:space:]]*//;s/[[:space:]]*$//')
fi
if [ -z "$COMMIT_MESSAGE" ]; then
  COMMIT_MESSAGE=$(echo "$COMMIT_MESSAGE_RAW" | grep -v '^\s*$' | grep -v '^[`]' | grep -v '^bash$' | head -1 | sed 's/\*\*//g;s/^[[:space:]]*//;s/[[:space:]]*$//')
fi

FIRST_WORD=$(echo "$COMMIT_MESSAGE" | sed 's/^[^a-zA-Z]*//' | grep -o -E '^[a-zA-Z]+' | tr '[:upper:]' '[:lower:]')

  # Emojis para cada verbo
  declare -A EMOJIS=(
    ["add"]="✨"
    ["fix"]="🐛"
    ["update"]="🔄"
    ["remove"]="🔥"
    ["refactor"]="♻️"
    ["docs"]="📝"
    ["test"]="✅"
    ["chore"]="🔧"
  )

  # Extrai o verbo
  FIRST_WORD=$(echo "$COMMIT_MESSAGE" | grep -o -E '^[a-zA-Z]+' | tr '[:upper:]' '[:lower:]')
  case "$FIRST_WORD" in
  add|adds|added) FIRST_WORD="add" ;;
  fix|fixes|fixed) FIRST_WORD="fix" ;;
  update|updates|updated) FIRST_WORD="update" ;;
  remove|removes|removed) FIRST_WORD="remove" ;;
  refactor|refactors|refactored) FIRST_WORD="refactor" ;;
  docs|doc|document|documents|documented) FIRST_WORD="docs" ;;
  test|tests|tested) FIRST_WORD="test" ;;
  chore|chores|chored) FIRST_WORD="chore" ;;
esac

  EMOJI=${EMOJIS[$FIRST_WORD]}

  # Limpa espaços extras
  COMMIT_MESSAGE_CLEAN=$(echo "$COMMIT_MESSAGE" | sed 's/^[^a-zA-Z0-9]*//;s/[[:space:]]*$//')

  # Adiciona emoji
  if [ -n "$EMOJI" ]; then
    FINAL_MESSAGE="$EMOJI $COMMIT_MESSAGE_CLEAN"
  else
    FINAL_MESSAGE="$COMMIT_MESSAGE_CLEAN"
  fi

  echo -e "\n💬 Sugestão de commit:\n$FINAL_MESSAGE\n"

  # Confirmação do usuário
  printf "%s" "Deseja commitar com essa mensagem? (s/n) "
  read CONFIRM
  echo
  if [[ "$CONFIRM" == "s" || "$CONFIRM" == "S" ]]; then
    git commit -m "$FINAL_MESSAGE"
    echo "✅ Commit realizado."
  else
    echo "🚫 Commit cancelado."
  fi
else
  echo "⚠️ Nenhuma mudança staged para commit."
fi