//jsx라고 하는 파일은 js파일이긴 하지만 jsx문법을 사용한다는 뜻을 가진 js 파일이라고 할 수 있다.
//이를 보았을때 react를 다루는 것이라는걸 한눈에 알아 볼 수 있다는 점에서 실용적이다.
const React = require("react");
const ReactDom = require("react-dom");

const WordRelay = require("./wordrelay");

ReactDom.render(<WordRelay />, document.querySelector("#root"));
