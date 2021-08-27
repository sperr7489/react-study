import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  //두번째 요소가 바뀌지 않는 이상 계속해서 기억하고 있는다.
  //getWinNumbers로 반환되는 값을 기억하고 있기에 Balls가 렌더링 될때 계속해서
  //getWinNumber를 호출하는 것을 막을 수 있다.
  //useMemo는 복잡한 함수 결괏값을 기억
  //useRef는 일반 값을 기억한다.

  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  //두번째 인수는 그 인수가 변화할 때 까먹게 하는 것.
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  const timeouts = useRef([]);

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      //let을 쓰면 closure 문제가 발생하지 않는다.
      timeouts.current[i] = setTimeout(() => {
        //지금 이것은 timeouts.current가 바뀌는 것이 아니다. 이 배열의 element가 바뀌는 것
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
        console.log(winBalls, "얘가 winBalls");
        console.log(winBalls.length, "이것이 배열의길이");
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    console.log(winNumbers.length);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);
  /* didUpdate는 onClickRedo함수가 실행될 때 바뀐다.
  timeouts.current[i]가 바뀌는 거 말고 timeouts.current가 바뀌는 게 중요하다.
  
   이두번째 인수에 winNumbers.length를 넣으면 안되는 이유 값이 바뀌지 않아서 useEffect가
   재실행되지 않는다. 근데 왜 balls는 7개 다나오냐면 그것은 이미 for문이 돌아가고 있기 때문이다.

   두번째 인수로 winBalls.length를 넣어주면 안되는 이유
   그러면 winBalls는 계속 set현상이 벌어져서 useEffect가 계속 실행되는데 이 때 중요한건 
   set함수가 비동기 함수이기 때문에 winBalls가 지속적으로 초깃값으로 재설정되어 첫번째 배열만 
   주구장창 리렌더링 할 것이기 때문이다. */

  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");

    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = []; //이것은 timeouts.current가 바뀌는 것이다.
    //위에것은 timeouts.current의 [i]요소들이 바뀌는 것이다.
    console.log("이부분이 실행되려나?");
  }, [winNumbers]);
  //useCallback을 사용하면 함수의 반환값이 아닌 함수 자체를 기억해둔다.
  //두번째 인수는 그 인수가 변화할 때 까먹게 하는 것.
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
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {/* onClickRedo는 useCallback 함수이기 때문에 기존의 정보를 저장해두고있다.
      이에따라서 useCallback의 두번째 인수인 winNumber가 바뀌지 않는 이상 
      리렌더링을 하는 것을 방지해줄 수 있다.  */}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
