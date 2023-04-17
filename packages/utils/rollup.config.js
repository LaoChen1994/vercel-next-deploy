const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { readFileSync } = require('fs')

const pkg = JSON.parse(readFileSync("./package.json"))

export default [{
    input: "src/index.ts",
    output: {
        name: "pd-worship-utils",
        file: pkg.browser
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json"
        })
    ]
}, {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs"
        },
        {
            file: pkg.module,
            format: "es"
        }
    ],
    plugins: [typescript({
        tsconfig: "./tsconfig.json"
    })]
}]
