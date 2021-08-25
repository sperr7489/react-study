import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [Message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  var timeout, startTime, endTime;
  //반응속도 검사하기위한 시작시간. 반응속도 비교값
  //startTime과 endTime은 수정이되어도 렌더링이 발생시키지 않기 위해 state 밖에 선언한다.
  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
      timeout = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      console.log(timeout);
    } else if (state === "ready") {
      //준비단계
      clearTimeout(timeout);
      setState("waiting");
      setMessage("너무 성급해! 좀만 천천히 해봐!");
    } else if (state === "now") {
      //자 이제 눌러!!
      endTime = new Date();
      setState("waiting");
      setResult((prevResult) => {
        return [...prevResult, endTime - startTime];
      });
      setMessage("클릭해서 다시 시작하세요!");
    }
  };
  const onReset = () => {
    setResult([]);
  };
  const renderAverage = () => {
    var index = result.length - 1;
    console.log(result);
    return result.length === 0 ? null : (
      <>
        <div>순간시간 : {result[index]}ms </div>
        <div>평균시간 : {result.reduce((a, b) => a + b) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {Message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
