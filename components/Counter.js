import { useEffect, useState } from "react";
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

const Counter = ({ option, wordCounter }) => {
  return (
    <CounterCont>
      {option.option === "time" ? (
        <Time>{option.subOption}</Time>
      ) : (
        <Count>{` ${wordCounter} / ${option.subOption}`}</Count>
      )}
    </CounterCont>
  );
};

export default Counter;
