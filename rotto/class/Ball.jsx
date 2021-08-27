import React, { memo } from "react";
//이 ball이라는 것은 hooks가 아니다. 단지 함수형 컴포넌트일뿐.
//hooks는 useState, useEffect 같은 것들을 얘기한다.

const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }

  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
