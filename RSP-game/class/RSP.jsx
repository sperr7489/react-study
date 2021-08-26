import React, { Component } from "react";

const rspCoords = {
  바위: 0,
  가위: "-142px",
  보: "-285px",
};
const scores = {
  가위: -1,
  바위: 0,
  보: 1,
};
//이겼을 때는 -2,1 이 나오겠다.
//졌을 때는 나머지 경우!
const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};
/**Object.entries(rspCoords) 하면
  [ [ '바위', 0 ], [ '가위', '-142px' ], [ '보', '-285px' ] ]가 출력 
  endries가 [key, value] 쌍의 " 배열 "을 반환
  [ [ '바위', 0 ], [ '가위', '-142px' ], [ '보', '-285px' ].find 
  find에 첫번째 인자로 콜백함수가 들어간다. 그리고 그 콜백함수의 인자로 불러준 배열의
  원소들이 차례대로 들어가는데 이때 콜백함수의 리턴값이 true가 될 때의 그 배열을 반환한다.
  v[1]은 각각의 배열에서 imgCoords가 있는 부분이다. 이것이 parameter로 전달된 imgCoords
  와 같은 지 비교하여 true false를 반환하는 것이다.
  */
class RSP extends Component {
  state = {
    result: "",
    imgCoord: 0,
    scores: 0,
  };
  /*****************************  이부분이 라이프 사이클 시작이다.  
    클래스의 경우 -> constructor -> render -> ref -> componentDidMout
    ->(setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render
    -> componentDidUpdate -> 부모컴포넌트에서 없어질 때 -> componentWillUnmount
    -소멸
    **********************/
  interval;
  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.바위) {
      //이미지의 위치를 잘라서 출력되게끔 하기위해
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };
  componentDidMount() {
    //비동기 요청을 많이 한다.
    //rendering이 처음으로 실행될 때 사용되는 lifecycle 함수이다.
    this.interval = setInterval(this.changeHand, 100);
  }

  componentDidUpdate() {
    //리렌더링 후에 발생하는 함수.
  }
  componentWillUnmount() {
    //비동기 요청 정리를 많이 한다.
    //컴포넌트가 제거되기 직전에 발생!
    clearInterval(this.interval);
  }
  onClickBtn = (choice) => () => {
    //이렇게 함으로써  onClick={() => this.onClickBtn("바위")}을
    //onClick={onClickBtn("바위")}이렇게 바꿔줄 수 있음
    //react에서 굉장히 많이 사용되는 패턴으로 이를 고차함수라고 한다.
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    //imgCoord는 위의 componentDidMount 이벤트에서
    //setInterval 비동기 요청에서 계속해서 바뀌게 된다.
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다!",
      });
    } else if ([-2, 1].includes(diff)) {
      //include함수는 array.include(what) 에서 array에 what이 존재하면 true반환!
      this.setState((prevState) => {
        //이전 상태를 바꾸어 줄때에는
        console.log("이부분이 실행된다.");

        return {
          result: "이겼습니다.!",
          scores: prevState.scores + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        console.log("이부분이 실행될까>?.");

        return {
          result: "젔습니다!",
          scores: prevState.scores - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
    console.log(myScore, choice, "내가 고른것");
    console.log(cpuScore, computerChoice(imgCoord), "컴퓨터가 고른것");
    console.log(diff, "이것이 점수의 차이이다.");
  };

  render() {
    const { result, scores, imgCoord } = this.state;

    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {scores}점</div>
      </>
    );
  }
}
export default RSP;
