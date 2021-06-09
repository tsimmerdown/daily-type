import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { server } from "../config";
import { getWords } from "../pages/api/getWords";

const MainInputCont = styled.div`
  margin: 18rem 18rem;
  font-size: 1.5rem;
  font-weight: 400;
  height: 7rem;
  overflow: hidden;
`;

const UserInput = styled.input`
  border: none;
  background: transparent;
  position: absolute;
  color: transparent;
  height: 7rem;
  width: calc(100% - 36rem);
  &:focus {
    outline: none;
    text-decoration: none;
  }
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
`;

const MainInput = (props) => {
  const [focus, setFocus] = useState(true);
  const [counter, setCounter] = useState(0);

  const focusRef = useRef(focus);
  const counterRef = useRef(counter);

  const setFocusRef = (boolean) => {
    focusRef.current = boolean;
    setFocus(boolean);
  };

  const setCounterRef = (sub) => {
    if (sub == "-") {
      if (counterRef.current > 0) {
        counterRef.current = counterRef.current - 1;
        setCounter(counter - 1);
        return;
      }
    }
    counterRef.current = counterRef.current + 1;
    setCounter(counter + 1);
  };

  const handleUserClick = () => {
    const el = document.activeElement;
    if (el === document.getElementById("userInput")) {
      setFocusRef(true);
    } else {
      setFocusRef(false);
    }
  };

  const handleKeyDown = (e) => {
    if (focusRef.current) {
      const { key, keyCode } = e;
      if (keyCode == 8) {
        setCounterRef("-");
        return;
      }

      if (key == props.wordList[counterRef.current]) {
        setCounterRef();
        console.log(
          `yay correct ${counterRef} : ${props.wordList[counterRef.current]}`
        );
      } else {
        console.log(
          `boo ${counterRef}  : ${props.wordList[counterRef.current]}`
        );
      }
    } else {
      console.log("hah");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleUserClick);

    return () => {
      window.removeEventListener("click", handleUserClick);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.wordList]);

  return (
    <MainInputCont>
      {!focus && <Unfocused>Click here to resume</Unfocused>}
      <>
        <UserInput spellCheck="false" id="userInput" />
        {props.wordList}
      </>
    </MainInputCont>
  );
};

export default MainInput;

// export const getServerSideProps = async (context) => {
//   const res = await getWords();
//   console.log(res);
//   return {
//     props: {
//       res,
//     },
//   };
// };
