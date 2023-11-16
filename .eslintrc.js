module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
    ],
    rules: {
        'no-unused-vars': 'off',
        'no-useless-escape': 'off',
        'vue/require-valid-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'no-control-regex': 'off'
    }
}
