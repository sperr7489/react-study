const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmwh/rea");
module.exports = {
  name: "",
  mode: "development", //실서비스에서는 production으로 설정한다.
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
    //이렇게 resolve에 extensions 속성을 설정해주면 entry파일의 확장자를 수시로 붙일 필요가 없다.
  },

  entry: {
    //  [ './client.jsx','wordrelay.jsx'] client.jsx에 wordrelay.jsx가 포함되므로
    //client.jsx만 사용가능! 확장자명은 위의 resolve 속성을 이용해 해결!
    app: ["./client"],
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
                targets: {
                  browsers: ["> 5% in KR", "last 2 chrome versions"],
                },
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    //entry에 있는 것들을 전부 합쳐서 dist 폴더 안의 app.js라는 파일로 새로 만들어 준다.
  }, //출력

  //webpack에서는 entry 와 output이 가장 중요하다.
};
