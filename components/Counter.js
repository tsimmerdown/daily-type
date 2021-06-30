import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useWordList } from "../context/wordListContext";
import { useOptions } from "../context/optionsContext";
import { useWordCounter } from "../context/wordCounterContext";

const CounterCont = styled.div`
  font-size: 8rem;
  font-weight: 600;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Time = styled.div``;
const Count = styled.div``;

const Counter = ({ start, finish, setFinish, setStart }) => {
  const { options } = useOptions();
  const { wordCounter } = useWordCounter();

  const [timeLeft, setTimeLeft] = useState(parseInt(options.subOption));
  const timeLeftRef = useRef(timeLeft);

  const calculateTimeLeft = () => {
    if (options.option == "time") {
      if (start && timeLeftRef.current > 0) {
        timeLeftRef.current -= 1;
        setTimeLeft((time) => time - 1);
      } else if (start && timeLeftRef.current <= 0) {
        timeLeftRef.current = parseInt(options.subOption);
        setTimeLeft(parseInt(options.subOption));
        setStart((state) => state && false);
        setFinish((state) => state || true);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
    setTimeLeft(parseInt(options.subOption));
    timeLeftRef.current = parseInt(options.subOption);
    setStart((state) => state && false);
  }, [options]);

  return (
    <>
      {start && !finish && (
        <CounterCont>
          {options.option === "time" ? (
            <Time>{timeLeft}</Time>
          ) : (
            <Count>{` ${wordCounter} / ${options.subOption}`}</Count>
          )}
        </CounterCont>
      )}
    </>
  );
};

export default Counter;
