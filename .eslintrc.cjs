module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": "@typescript-eslint/parser"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "vue/multi-word-component-names":"off",
        'no-console': 0,
        'no-invalid-regexp': 2,
        'no-debugger': 1, // 禁用 debugger
        'no-invalid-this': 2,
        'no-inline-comments': 0,
        'no-lonely-if': 0,
        'no-multiple-empty-lines': [
        1,
        {
            max: 2,
        },
        ],
        'no-obj-calls': 0,
        'no-path-concat': 0,
        'no-plusplus': 0,
        'no-redeclare': 2,
        'no-unused-vars': [
        0,
        {
            vars: 'all',
            args: 'after-used',
        },
        ],
        'no-var': 0,
        'spaced-comment': 1,
        'no-proto': 0,
        'no-sync': 0,
        'no-shadow': 2,
        'no-dupe-args': 2,
        'no-undef-init': 0,
        'no-self-compare': 2, // 不能比较自身
        'no-undefined': 0,
        'init-declarations': 0,
        'no-const-assign': 2,
        'no-use-before-define': 2, // 未定义前不能使用
        'no-useless-call': 2, // 禁止不必要的call和apply
        'no-void': 2, // 禁用void操作符
        'no-unreachable': 2,
        'max-params': [0, 10],
    }
}
