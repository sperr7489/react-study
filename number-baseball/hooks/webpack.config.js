const path = require("path");
module.exports = {
  name: "baseball-number",
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: ["./client"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
};
