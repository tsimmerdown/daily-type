import styled from "styled-components";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const TimerCont = styled.div`
  position: relative;
  height: 16px;
  width: 5rem;
  transform: translate(0, 25%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  position: absolute;
  color: transparent;
  width: 5rem;
  right: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  user-select: none;
  // outline: none;
  // &:focus {
  //   outline: none;
  //   text-decoration: none;
  // }
  cursor: default;
  z-index: 10;
`;

const Timer = () => {
  const [selectedTime, setSelectedTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

  const selectedTimeRef = useRef(selectedTime);
  const startTimerRef = useRef(startTimer);

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      setStartTimer(true);
      startTimerRef.current = true;
    }
  };

  const timeHandler = () => {
    const subtract = moment.duration(1, "seconds");
    if (startTimerRef.current) {
      if (selectedTimeRef.current > 0) {
        selectedTimeRef.current = selectedTimeRef.current.subtract(subtract);
        setSelectedTime(
          () =>
            `${selectedTimeRef.current._data.minutes} : ${selectedTimeRef.current._data.seconds}`
        );
      } else {
        startTimerRef.current = false;
        setStartTimer(false);
      }
    }
  };

  const changeHandler = (e) => {
    if (e.target == document.getElementById("time-input")) {
      setSelectedTime(e.target.value);
      selectedTimeRef.current = moment.duration(e.target.value, "m");
    }
  };

  useEffect(() => {
    const time = setInterval(() => {
      timeHandler();
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <TimerCont>
      {selectedTime <= 0 ? "00:00" : selectedTime}
      <Input
        id="time-input"
        type="number"
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
      />
    </TimerCont>
  );
};

export default Timer;
