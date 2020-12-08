#!/usr/bin/env bash
echo "┏━━━ 🕵️ LINT: $(pwd) ━━━━━━━"
yarn eslint 'src/**/*.{js,jsx}' --cache
