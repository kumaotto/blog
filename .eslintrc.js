module.exports = {
  plugins: ["prettier"],
  extends: ["plugin:react/recommended"],
  rules: {
    "prettier/prettier": "error",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015,
  },
};
