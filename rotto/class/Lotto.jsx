import React, { Component } from "react";
import Ball from "./Ball";
function getWinNumbers() {
  //로또 숫자들 뽑는것
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    //여기까지는 undefined로 45개의 element가 갖춰진다.
    .map((v, i) => i + 1);
  //이렇게 해주게 되면 index+1씩해준것들이 현재 처리중인 v 에 return 값으로 되어
  //1부터 45까지의 숫자가 candidate 숫자로 입력
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );

    //splice 함수는 두번째 인수가 1이면 첫번째 인수를 해당 인덱스로 하고 그 인덱스의 element
    //를 삭제한다는 뜻이고 이를 배열로 리턴한다. 그래서 [0]을 해줌으로써 그 배열의 값을 온전히
    //구할 수 있는 것이다.
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => {
    //slice(0,6)은 index 0부터 6미만까지 추출해내는 것이다.
    p - c;
    //sort함수에서 첫번째 인수 - 두번째 인수를 햇음으로 이는 오름차순 정리이다. 작은것=>큰것 순서
  });
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), //당첨숫자들
    winBalls: [], //
    bonus: null,
    redo: false,
  };
  timeouts = [];

  runTimeouts = () => {
    console.log("runTimeouts");
    const { winNumbers } = this.state;
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      //let을 쓰면 closure 문제가 발생하지 않는다.
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };
  componentDidMount() {
    console.log("didmount");
    this.runTimeouts();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("update");
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  } //onClickRedo를 실행하면 update과정이 진행되므로 componentDidUpdate가 발생.

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }
  //componentDidMount는  밑의
  //{winBalls.map((v) => ( <Ball key={v} number={v} />))}
  //부분이 렌더링 되면서 발생하는 이벤트이다. 이에따라 (i+1*1000)마다 setTimeout을
  //실행한다.
  onClickRedo = () => {
    console.log("onClickRedo");
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
    console.log("이부분이 실행되려나?");
  };

  render() {
    const { winBalls, bonus, redo } = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
          {/* jsx에서 반복문에 쓰이는 것들은 컴포넌트로 빼서 재사용성을 늘려줄 수 있다.  */}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}
export default Lotto;
