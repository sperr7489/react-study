import React, { Component, createRef } from "react";
//purecomponent 를 사용하면 성능 최적화를 할 수가 있다.
import Try from "./try";
function getNumbers() {
  //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    /**
     * splice는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경.
     * array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
     * start는 배열을 변경할 인덱스. deleteCount는 제거할 요소의 수, 그 뒤 인자들은 배열에 추가할 요소(없으면 삭제만 진행.)
     * i는 4개를 뽑아야하므로 1씩  4번 줄어드는데 1개씩 줄어들때마다 배열의 원소갯수가 하나씩 줄어들기 때문에 Math.random()*(9-i)로 배열의 갯수만큼 랜덤으로 돌려주는 것이다.
     * splice의 return은 배열을 리턴하므로 마지막에 [0]을 해주는 것.
     */
    array.push(chosen);
  }

  return array;
}

class NumberBaseball extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       result: "",
  //       value: "",
  //       answer: getNumbers(),
  //       tries: [],
  //     };
  //   }  constructor를 굳이 써줄 필요는 없다.
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };
  onSubmitForm = (e) => {
    //답을 제출하는 순간 답을 비교한다.
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState((prevState) => {
        return {
          //이전걸 가져올때는 함수형으로 state를 가져와야 다음 this.setState와 충돌할수 있는 문제를 예방할 수 있다.
          result: "홈런",
          tries: [
            ...prevState.tries,
            { try: this.state.value, result: "홈런" },
          ], //this.state.tries는 그전 tries 배열. 그뒤 객체는 현재 입력된 것과 홈런 문자열
        };
      });

      alert("게임을 다시 시작합니다.");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus(); //createRef를 통해서 ref를 쓸 때 사용하는 방법
    } else {
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        //10번이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`,
        });
        alert("게임을 다시시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        //답틀렸으면
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: this.state.value,
                result: `${strike}스트라이크 ${ball}볼입니다.`,
              },
            ],
            value: "",
          };
        });
        this.inputRef.current.focus();
      }
    }
  };
  inputRef = createRef();

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };
  //   fruits = [
  //     { fruit: "사과", taste: "맛있다." },
  //     { fruit: "무", taste: "맛없어." },
  //     { fruit: "사과", taste: "맛있다." },
  //     { fruit: "사과", taste: "맛있다." },
  //     { fruit: "사과", taste: "맛있다." },
  //     { fruit: "사과", taste: "맛있다." },
  //   ];
  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => {
            //{ try: this.state.value, result: "홈런" }객체로 v가 들어온다. 이를 통해 v.try, v.result를 props로 사용가능해진다.
            //v는 map함수로 호출되는 배열의 하나의 element, i는 그 인덱스값.
            return <Try key={`${i + 1}차 시도:`} tryInfo={v} />;
            //이런 속성값을 정해주는거를 html에서는 attribute React에서는 Props라고 부른다. try에 인자로 전달하기 위한 props
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
