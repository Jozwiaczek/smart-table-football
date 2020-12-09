module.exports = {
  '*.{js,jsx}': ['eslint --cache --fix'],
  '**/*.{js,jsx,ts,tsx,md,json}': ['prettier --write --ignore-path .prettierignore'],
};
