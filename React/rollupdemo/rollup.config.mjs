import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: ["src/index.js", "src/demo.js"],
    output: {
      dir: "build",
      format: "es",
    },
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
