import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Word from "./Word";
import Finish from "../Finish";

const MainInputCont = styled.div`
  margin: 18rem 18rem;
  font-size: 1.5rem;
  font-weight: 400;
  height: 7rem;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  position: absolute;
  color: transparent;
  height: 7rem;
  width: calc(100% - 36rem);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
  &:focus {
    outline: none;
    text-decoration: none;
  }
  cursor: default;
  z-index: 3;
`;

const Unfocused = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 32rem);
  left: 17rem;
  height: 7rem;
  backdrop-filter: blur(4px);
  z-index: 10;
`;

const Words = styled.div`
  border: none;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  height: 7rem;
  width: calc(100% - 36rem);
  user-select: none;
  overflow: hidden;
  z-index: 2;
`;

const WordsCont = styled.span`
  position: relative;
  bottom: ${(props) => props.bottom}rem;
`;

const MainInput = (props) => {
  const useForceUpdate = () => {
    const [, setState] = useState();
    return () => setState({});
  };

  const [focus, setFocus] = useState(true);
  const [bottom, setBottom] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(-1);

  const focusRef = useRef(focus);
  //bottomRef keeps track of shifting upwards
  const bottomRef = useRef(bottom);
  //inputRef keeps track of inputs by user
  const inputRef = useRef(props.inputList);
  //allows me to keep active index from going below -1
  const activeIndexRef = useRef(activeCharIndex);
  const startRef = useRef(props.start);
  const finishRef = useRef(props.finish);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    startRef.current = props.start;
    finishRef.current = props.finish;
    console.log(finishRef.current);
  }, [props.start, props.finish]);

  useEffect(() => {
    document
      .getElementById("userInput")
      .addEventListener("mousedown", (event) => {
        event.preventDefault();
      });
  }, []);

  const setFocusRef = (boolean) => {
    focusRef.current = boolean;
    setFocus(boolean);
  };

  const handleUserClick = (e) => {
    if (focusRef.current == true) {
      if (e.target === document.getElementById("userInput")) {
        setFocusRef(true);
      } else {
        setFocusRef(false);
      }
    } else {
      if (e.target === document.getElementById("focus")) {
        setFocusRef(true);
      } else {
        setFocusRef(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (focusRef.current) {
      if (startRef.current == false && finishRef.current == false) {
        props.setStart((state) => state || true);
        startRef.current = true;
      }
      const { key, keyCode, code } = e;
      if (code == "Backspace") {
        if (activeIndexRef.current > -1) {
          setActiveCharIndex((index) => index - 1);
          activeIndexRef.current -= 1;
          inputRef.current.pop();
        }
      }

      if (code == "Space") {
        //count space if 12 spaces then add bottom: 4.3rem
        // spaceRef.current += 1;
        // if (spaceRef.current % 15 == 0) {
        //   inputRef.current = [];
        //   bottomRef.current += 4.3;
        // }

        setActiveCharIndex(-1);
        activeIndexRef.current = -1;

        props.setWordCounter((count) => count + 1);
        inputRef.current = [];
      }

      if (keyCode >= 49 && keyCode <= 90) {
        inputRef.current.push(key);
        setActiveCharIndex((index) => index + 1);
        activeIndexRef.current += 1;
      }
    }
    forceUpdate();
  };

  useEffect(() => {
    window.addEventListener("click", handleUserClick);

    return () => {
      window.removeEventListener("click", handleUserClick);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    inputRef.current = [];
    props.setWordCounter(0);
    setActiveCharIndex(-1);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.wordList]);

  return (
    <MainInputCont>
      {props.finish ? (
        <Finish
          setFinish={props.setFinish}
          setStart={props.setStart}
          option={props.option}
          setWordList={props.setWordList}
          setInputList={props.setInputList}
        />
      ) : (
        <>
          {!focus && (
            <Unfocused id="focus">🙌 Click here to resume 🙌</Unfocused>
          )}
          <Input id="userInput" spellCheck="false" autoComplete="off" />
          <Words>
            {props.wordList.map((obj) => {
              return (
                <Word
                  word={obj}
                  active={obj === props.wordList[props.wordCounter]}
                  input={inputRef.current}
                  activeCharIndex={activeCharIndex}
                  wordList={props.wordList}
                />
              );
            })}
          </Words>
        </>
      )}
    </MainInputCont>
  );
};

export default MainInput;
