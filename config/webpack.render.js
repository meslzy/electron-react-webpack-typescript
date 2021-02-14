const path = require("path");
const root = path.join(__dirname, "..");

const dist = path.join(root, "dist");
const render = path.join(root, "app/render");

const DefinePlugin = require("webpack").DefinePlugin;
const HtmlPlugin = require("html-webpack-plugin");
const HtmlExternalsPlugin = require("html-webpack-externals-plugin");

module.exports = (mode) => {
  const dev = mode === "dev";

  console.log(`build for render with ${dev ? "development" : "production"} mode`);

  const definePlugin = new DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(dev ? "development" : "production"),
  });
  const htmlPlugin = new HtmlPlugin({
    filename: "index.html",
    template: "index.html",
    cache: true,
  });
  const htmlExternalsPlugin = new HtmlExternalsPlugin({
    cwpOptions: {
      context: path.join(root, "node_modules"),
    },
    externals: [
      {
        module: "react",
        global: "React",
        entry: dev ? "umd/react.development.js" : "umd/react.production.min.js",
      },
      {
        module: "react-dom",
        global: "ReactDOM",
        entry: dev ? "umd/react-dom.development.js" : "umd/react-dom.production.min.js",
      },
    ],
    outputPath: "assets",
  });

  return {
    context: render,
    target: "electron-renderer",
    mode: dev ? "development" : "production",
    entry: {
      "polyfill": "@babel/polyfill",
      "render": "./index.tsx",
    },
    output: {
      filename: "[name].js",
      path: dist,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"]
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/,
          use: [{loader: "url-loader?limit=100000"}],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
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
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "fs": "require('fs')",
    },
    devServer: {
      contentBase: dist,
      compress: true,
      hot: true,
      port: 9000,
      historyApiFallback: true,
    },
    performance: {
      hints: false,
    },
    plugins: [definePlugin, htmlExternalsPlugin, htmlPlugin],
  };
};
