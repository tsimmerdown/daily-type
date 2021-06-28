import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CounterCont = styled.div`
  font-size: 8rem;
  font-weight: 600;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Time = styled.div``;
const Count = styled.div``;

const Counter = ({ option, wordCounter, start, setFinish, setStart }) => {
  const [timeLeft, setTimeLeft] = useState(parseInt(option.subOption));
  const timeLeftRef = useRef(timeLeft);

  const calculateTimeLeft = () => {
    if (start && timeLeftRef.current > 0) {
      timeLeftRef.current -= 1;
      setTimeLeft((time) => time - 1);
    } else if (start && timeLeftRef.current <= 0) {
      timeLeftRef.current = parseInt(option.subOption);
      setTimeLeft(parseInt(option.subOption));
      setStart((state) => state && false);
      setFinish((state) => state || true);
    }
  };

  useEffect(() => {
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
    setTimeLeft(parseInt(option.subOption));
    timeLeftRef.current = parseInt(option.subOption);
    setStart((state) => state && false);
  }, [option]);

  return (
    <>
      {start && (
        <CounterCont>
          {option.option === "time" ? (
            <Time>{timeLeft}</Time>
          ) : (
            <Count>{` ${wordCounter} / ${option.subOption}`}</Count>
          )}
        </CounterCont>
      )}
    </>
  );
};

export default Counter;
