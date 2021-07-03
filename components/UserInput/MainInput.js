import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import Word from "./Word";
import Finish from "../Finish";
import { useWordList } from "../../context/wordListContext";
import { useWordCounter } from "../../context/wordCounterContext";
import { useOptions } from "../../context/optionsContext";

const MainInputCont = styled.div`
  margin: 15rem 25rem;
  font-size: 1.5rem;
  font-weight: 400;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  position: absolute;
  color: transparent;
  width: calc(100% - 50rem);
  height: 16rem;
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
  height: 17rem;
  backdrop-filter: blur(4px);
  z-index: 10;
  user-select: none;
`;

const Words = styled.div`
  border: none;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  max-height: 16rem;
  width: calc(100% - 50rem);
  user-select: none;
  overflow: hidden;
  z-index: 2;
`;

const MainInput = (props) => {
  const useForceUpdate = () => {
    const [, setState] = useState();
    return () => setState({});
  };

  const { state } = useWordList();
  const { options } = useOptions();
  const { wordCounter, wordCounterDispatch } = useWordCounter();

  const [currTime, setCurrTime] = useState();
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
  const wordCounterRef = useRef(wordCounter + 1);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    startRef.current = props.start;
    finishRef.current = props.finish;
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
        let startTime = moment();
        setCurrTime(startTime);
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
        if (options.option == "words") {
          if (wordCounterRef.current >= parseInt(options.subOption)) {
            finishRef.current = true;
            props.setFinish((state) => state || true);
            wordCounterRef.current = 0;
          }
        }

        setActiveCharIndex(-1);
        activeIndexRef.current = -1;
        wordCounterRef.current += 1;
        wordCounterDispatch({ type: "INCREMENT" });
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
    wordCounterDispatch({ type: "RESET" });
    setActiveCharIndex(-1);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.wordList]);

  return (
    <MainInputCont>
      {props.finish ? (
        <Finish
          finish={props.finish}
          setFinish={props.setFinish}
          setStart={props.setStart}
          setWordList={props.setWordList}
          setInputList={props.setInputList}
          errorCounter={props.errorCounter}
          setErrorCounter={props.setErrorCounter}
          currTime={currTime}
          setIsLoading={props.setIsLoading}
        />
      ) : (
        <>
          {!focus && (
            <Unfocused id="focus">🙌 Click here to resume 🙌</Unfocused>
          )}
          <Input id="userInput" spellCheck="false" autoComplete="off" />
          <Words>
            {state.wordList.map((obj, key) => {
              return (
                <Word
                  key={key}
                  word={obj}
                  active={obj === state.wordList[wordCounter]}
                  input={inputRef.current}
                  activeCharIndex={activeCharIndex}
                  setErrorCounter={props.setErrorCounter}
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
