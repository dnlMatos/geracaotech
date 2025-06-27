ccm() {
    tokens='🏗️ build, 🔧 ci, 🚧 chore, ✏️ docs, ✨ feat, 🐛 fix, 🚀 perf, ♻️ refactor, ⏪️ revert, 💄 style, 🧪 test, 🌐 i18n, 🎉 initial, 📈 analytics, 🗃️ database'
    
    # Gera a sugestão de mensagem de commit
    commit_msg=$(git diff | cody chat --stdin -m 'Write only a commit title message to describe the changes made in all files for this diff using this pattern: `emoji: message`. The message must be imperative and in lowercase. The available emojis are: '"$tokens")

    # Exibe a sugestão para o usuário
    echo ""
    echo "💬 Sugestão de mensagem de commit:"
    echo "$commit_msg"
    echo ""
    
    # Solicita confirmação ao usuário
    read -p "✅ Deseja usar esta mensagem para o commit? (s/n): " confirm
    if [[ "$confirm" == "s" || "$confirm" == "S" ]]; then
        git commit -m "$commit_msg"
        echo "✅ Commit realizado com sucesso!"
    else
        echo "❌ Commit cancelado pelo usuário."
    fi
}
