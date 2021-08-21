const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "wordrelay-setting",
  mode: "development", //실서비스에서는 production으로 설정한다.
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
    //이렇게 resolve에 extensions 속성을 설정해주면 entry파일의 확장자를 수시로 붙일 필요가 없다.
  },

  entry: {
    //  [ './client.jsx','wordrelay.jsx'] client.jsx에 wordrelay.jsx가 포함되므로
    //client.jsx만 사용가능! 확장자명은 위의 resolve 속성을 이용해 해결!
    app: "./client",
  }, //입력

  module: {
    rules: [
      {
        test: /\.jsx$/, //js나 jsx를 따져준다.
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["> 1% in KR"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/", //이것이 뜻하는 것이  노드에서의  app.use('/dist',express.static(__dirname,"dist"))  이것과 비슷한걸로 생각하면 된다.
  }, //entry에 있는 것들을 전부 합쳐서 dist 폴더 안의 app.js라는 파일로 새로ㅌ 만들어 준다.
  devServer: {
    publicPath: "/dist/",
    hot: true,
    port: 9000,
  },

  //webpack에서는 entry 와 output이 가장 중요하다.
  //   devServer: {
  //     publicPath: "/dist/",
  //     hot: true,
  //   },
};
