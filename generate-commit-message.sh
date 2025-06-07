#!/usr/bin/env bash

# Checa se há staged changes
if ! git diff --cached --quiet; then
  # Pega o diff das mudanças staged
  DIFF=$(git diff --cached)

  if [ -z "$DIFF" ]; then
    echo "⚠️ Nenhuma mudança staged encontrada."
    exit 0
  fi

  echo "🔍 Gerando sugestão de mensagem de commit com Sourcegraph Cody..."

  # Cria o prompt para o assistant
  PROMPT="Gere uma mensagem de commit concisa baseada no seguinte diff, começando com um verbo no infinitivo em inglês (ex: add, fix, update, remove, refactor, docs, test, chore):\n\n$DIFF"

  # Chama o cody chat para gerar a mensagem
  COMMIT_MESSAGE=$(echo -e "$PROMPT" | cody chat --stdin)

  # Define emojis para cada verbo
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

  # Extrai o primeiro verbo da mensagem, remove pontuação e normaliza para minúsculo
  FIRST_WORD=$(echo "$COMMIT_MESSAGE" | grep -o -E '[a-zA-Z]+' | head -1 | tr '[:upper:]' '[:lower:]')

  # Normaliza variações comuns para as chaves do array
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

  # Verifica se existe emoji para o verbo (depois do case!)
  EMOJI=${EMOJIS[$FIRST_WORD]}

  # Remove qualquer emoji ou caractere especial do início da mensagem sugerida
  COMMIT_MESSAGE_CLEAN=$(echo "$COMMIT_MESSAGE" | sed ':a;N;$!ba;s/^[^a-zA-Z0-9]*//;s/[[:space:]]*$//')

  # Adiciona o emoji correto no início
  if [ -n "$EMOJI" ]; then
    FINAL_MESSAGE="$EMOJI $COMMIT_MESSAGE_CLEAN"
  else
    FINAL_MESSAGE="$COMMIT_MESSAGE_CLEAN"
  fi

  # Remove crases do início e fim da mensagem, se existirem
  FINAL_MESSAGE=$(echo "$FINAL_MESSAGE" | sed 's/^`\\{3\\}//;s/`\\{3\\}$//')

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