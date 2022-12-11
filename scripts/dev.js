const { build } = require("esbuild");

const { resolve, relative } = require('path')

const target = "reactivity"

build({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
    bundle: true,
    sourcemap: true,
    format: 'esm',
    platform: 'browser',
    watch: {
        onRebuild() {
            console.log("rebuild")
        }
    }

}).then(() => {
    console.log("starting")
})