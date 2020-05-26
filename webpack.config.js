const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "app.bundle.js",
    path: __dirname + "/dist",
    publicPath: "/",
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "eslint-loader" },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./assets", to: "./assets" }]),
    new HtmlWebpackPlugin({ template: "index.html" }),
  ],
};
