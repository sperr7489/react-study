import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서시작하세요",
    result: [],
  };
  timeout;
  startTime; //반응속도 검사하기위한 시작시간.
  endTime; //반응속도 비교값
  //startTime과 endTime은 수정이되어도 렌더링이 발생시키지 않기 위해 state 밖에 선언한다.
  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭",
        }); //2~3초 랜덤
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
      });
      //초록색 되기 전에 성급히 클릭
    } else if (state === "now") {
      //반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        console.log(
          `${this.endTime} = 이것이 끝난시간 \n${
            this.startTime
          } = 이것이 시작시간 \n${
            this.endTime - this.startTime
          } = 이것이 두개의 차 \n   
          ${[...prevState.result, this.endTime - this.startTime]}\n
          ${[...prevState.result, this.endTime - this.startTime].length}
          `
        ); //지금 이렇게 해보면 result의 배열의길이가 1이 나온다.
        // result.length로 나누는 이유는 배열이 길어졌을 때 각각의 합을 쭉 더해서 평균값을 따지기 위해서이다.

        return {
          state: "waiting",
          result: [...prevState.result, this.endTime - this.startTime],
          message: "클릭해서 시작하세요",
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };
  renderAverage = () => {
    const { result } = this.state;
    const index = result.length - 1;
    return result.length === 0 ? null : (
      <>
        <div>순간 시간: {result[index]}ms</div>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };
  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {/*react엑서는 조건문과 반복문을 다른 방식으로 처리. 반복문은 map 함수로 처리랬다.*/}
        {this.renderAverage()}
        {/* 렌더링 하는 부분을 빼는 방법을 기억하도록 하자.  */}
        {/* false undefined null은 jsx에서 아무것도 없다는 것을 의미한다.  */}
      </>
    );
  }
}
export default ResponseCheck;
