import React from "react";

const Try = ({ tryInfo }) => {
  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
        {/*부모 컴포넌트인 NumberBaseball 컴포넌트로부터 props를 전달 받은 것이다. */}
      </li>
    </>
  );
};
export default Try;
