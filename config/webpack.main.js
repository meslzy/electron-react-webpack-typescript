const path = require("path");
const root = path.join(__dirname, "..");

const dist = path.join(root, "dist");
const main = path.join(root, "app/main");

const DefinePlugin = require("webpack").DefinePlugin;

module.exports = mode => {
  const dev = mode === "dev";

  console.log(`build for main with ${dev ? "development" : "production"} mode`);

  const definePlugin = new DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(dev ? "development" : "production"),
  });

  return {
    context: main,
    target: "electron-main",
    mode: dev ? "development" : "production",
    entry: {
      "main": "./index.ts",
    },
    output: {
      filename: "[name].js",
      path: dist,
    },
    resolve: {
      extensions: ["ts", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-env",
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        },
      ],
    },
    plugins: [definePlugin],
  };
};
