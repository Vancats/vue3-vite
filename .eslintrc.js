/*
 * @Author: Lqf
 * @Date: 2022-02-25 15:30:47
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-03 10:48:31
 * @Description: 我添加了修改
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  // parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021
  },
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    semi: ['off', 'never'],
    'vue/comment-directive': 'off',
    'vue/html-self-closing': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120, // 指定代码长度，超出换行
        tabWidth: 2, // tab 键的宽度
        useTabs: false, // 不使用tab
        semi: false,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
        trailingComma: 'none', //禁止随时添加逗号,这个很重要
        bracketSpacing: true,
        jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
        arrowParens: 'avoid', // 为单行箭头函数的参数添加圆括号
        requirePragma: false, // 是否严格按照文件顶部的特殊注释格式化代码
        insertPragma: false, // 是否在格式化的文件顶部插入Pragma标记，以表明该文件被prettier格式化过了
        proseWrap: 'always', // 文本样式进行折行
        htmlWhitespaceSensitivity: 'ignore', // html文件的空格敏感度，控制空格是否影响布局
        endOfLine: 'auto', // 结尾是 \n \r \n\r auto
        overrides: [
          {
            files: '*.html',
            options: {
              parser: 'babel'
            }
          }
        ]
      }
    ]
  }
}
