/*
 * @Author: Lqf
 * @Date: 2022-02-25 15:30:47
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-02 18:03:43
 * @Description: 我添加了修改
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    // "@vue/prettier",
    // "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    semi: ["off", "never"],
    "vue/comment-directive": "off",
    "vue/html-self-closing": "off",
  },
}
