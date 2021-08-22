// import React from "react";

// const Try = ({ tryInfo }) => {
//   return (
//     <>
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//         {/*부모 컴포넌트인 NumberBaseball 컴포넌트로부터 props를 전달 받은 것이다. */}
//       </li>
//     </>
//   );
// };
// export default Try;

import React, { memo } from "react";

//memo 를 하는것도 purecomponent와 기능을 같이 한다.
const Try = memo(({ tryInfo }) => {
  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
        {/*부모 컴포넌트인 NumberBaseball 컴포넌트로부터 props를 전달 받은 것이다. */}
      </li>
    </>
  );
});
//memo로 감싸주는 것.
export default Try;
