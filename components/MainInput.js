import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { server } from "../config";
import { getWords } from "../pages/api/getWords";

import Word from "./Word";

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
  &:focus {
    outline: none;
    text-decoration: none;
  }
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
  const [index, setIndex] = useState(0);
  const [spaceCounter, setSpaceCounter] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [finish, setFinish] = useState(false);

  const focusRef = useRef(focus);
  const indexRef = useRef(index);
  const spaceRef = useRef(spaceCounter);
  const bottomRef = useRef(bottom);
  const inputRef = useRef(props.inputList);

  const forceUpdate = useForceUpdate();

  const setFocusRef = (boolean) => {
    focusRef.current = boolean;
    setFocus(boolean);
  };

  const setIndexRef = (sub) => {
    if (sub == "-") {
      if (indexRef.current > 0) {
        indexRef.current = indexRef.current - 1;
      }
    } else {
      indexRef.current = indexRef.current + 1;
    }
    setIndex(indexRef.current);
  };

  const handleUserClick = (e) => {
    const el = document.activeElement;
    if (focusRef.current == true) {
      if (el === document.getElementById("userInput")) {
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
      const { key, keyCode, code } = e;
      if (code == "Backspace") {
        setIndexRef("-");
        inputRef.current.pop();
      }

      if (code == "Space") {
        //count space if 12 spaces then add bottom: 4.3rem
        spaceRef.current += 1;
        if (spaceRef.current % 15 == 0) {
          inputRef.current = [];
          bottomRef.current += 4.3;
        }

        if (props.option.option == spaceRef.current) {
        }

        if (key == props.wordList[indexRef.current]) {
          props.setWordCounter((count) => count + 1);
          console.log(props.wordCounter);
        }

        setIndexRef();
        inputRef.current.push({
          corr: true,
          key: key,
        });
      }

      if (keyCode >= 49 && keyCode <= 90) {
        if (key == props.wordList[indexRef.current]) {
          setIndexRef();
          inputRef.current.push({
            corr: true,
            key: key,
          });
        } else {
          setIndexRef();
          inputRef.current.push({
            corr: false,
            key: props.wordList[indexRef.current - 1],
          });
        }
      }
      // } else if (code == "Space") {
      //   if()
      //   props.setWordCounter((count) => count + 1);
      //   setIndexRef();
      //   inputRef.current.push({
      //     corr: true,
      //     key: key,
      //   });
      // }
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
    indexRef.current = 0;
    props.setWordCounter(0);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.wordList]);

  return (
    <MainInputCont>
      {!focus && <Unfocused id="focus">🙌 Click here to resume 🙌</Unfocused>}
      <>
        <Input spellCheck="false" id="userInput" autoComplete="off" />
        <Words id="userInput">
          {props.wordList.map((obj) => {
            return (
              <Word
                word={obj}
                active={obj === props.wordList[props.wordCounter]}
              />
            );
          })}
        </Words>
        {/* <WordsCont id="userInput" bottom={bottomRef.current}>
          {props.wordList}
        </WordsCont> */}
      </>
    </MainInputCont>
  );
};

export default MainInput;
