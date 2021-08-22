import React, { Component } from "react";

class Try extends Component {
  render() {
    return (
      <li>
        {/* <b>{this.props.value.fruit}</b>-{this.props.index}
        <div>컨텐츠1</div>
        <div>컨텐츠2</div>
        <div>컨텐츠3</div>
        <div>컨텐츠4</div> */}
        <div>{this.props.tryInfo.try}</div>
        <div>{this.props.tryInfo.result}</div>{" "}
        {/*부모 컴포넌트인 NumberBaseball 컴포넌트로부터 props를 전달 받은 것이다. */}
      </li>
    );
  }
}
export default Try;

// import React, { PureComponent } from "react";
// //purecomponent를 쓰면 렌더링 최적화를 할 수는 있지만 문제는 코드의 구조가 복잡해지면
// // 제대로 인식해주지 못한다는 단점이 있다.
// class Try extends PureComponent {
//     constructor(props){
//         //constructor 는 함수형이다. 따라서 인자를 통해 좀 더 컨트롤하기 쉬워진다.
//         super(props)
//         this.state={
//             result: this.props.result,
//             try: this.props.try,
//         };

//     })

//     state={
//         result: this.props.result,
//         try: this.props.try,
//     };

//   render() {
//     return (
//       <li>

//         <div>{this.props.tryInfo.try}</div>
//         <div>{this.props.tryInfo.result}</div>{" "}
//         {/*부모 컴포넌트인 NumberBaseball 컴포넌트로부터 props를 전달 받은 것이다. */}
//       </li>
//     );
//   }
// }
// export default Try;
