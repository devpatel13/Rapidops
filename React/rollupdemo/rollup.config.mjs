import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: ["src/RenderAdd.js", "src/RenderSub.js"],
    output: [
      {
        dir: "build/cjs",
        format: "cjs",
        sourcemap: true,
        entryFileNames: "[name].js",
      },
      {
        dir: "build/esm",
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].js",
      },
    ],

    plugins: [
      external(),
      nodeResolve({ extensions: [".js", ".jsx"] }),
      babel({
        babelHelpers: "bundled",
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
        extensions: [".js", ".jsx"],
      }),
      commonjs(),
      replace({
        preventAssignment: false,
        "process.env.NODE_ENV": '"development"',
      }),
      terser(),
    ],
  },
];
