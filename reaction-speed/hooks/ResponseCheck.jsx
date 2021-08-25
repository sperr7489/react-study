import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [Message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  var timeout, startTime, endTime;
  //반응속도 검사하기위한 시작시간. 반응속도 비교값
  //startTime과 endTime은 수정이되어도 렌더링이 발생시키지 않기 위해 state 밖에 선언한다.

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}></div>
    </>
  );
};

export default ResponseCheck;
