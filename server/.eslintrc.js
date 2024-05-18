module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: ["standard"],
    parserOptions: {
        ecmaVersion: "latest"
    },
    rules: {
        "no-debugger": "off",
        semi: [2, "always"],
        indent: [0, 4],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "multiline-ternary": ["off"],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
                avoidEscape: true
            }
        ]
    }
};
