import { useEffect, useState } from "react";
import styled from "styled-components";
import { useWordList } from "../../context/wordListContext";
import { useCharacterCount } from "../../context/characterCountContext";

const CharCont = styled.span`
  color: ${(props) => props.seen && props.color};
  display: inline-block;
  position: relative;
  margin: 0 1.2px;
`;

const Type = styled.span`
  position: absolute;
  border-left: ${(props) => props.active && "2px solid green"};
  height: 90%;
  width: 1px;
  left: -2px;
  // animation: 0.5s linear 0s infinite alternate flashing;
  // @keyframes flashing {
  //   from {
  //     opacity: 0%;
  //   }
  //   to {
  //     opacity: 100%;
  //   }
  // }
`;

const Character = ({ char, curr, corr, active, setError }) => {
  const [seen, setSeen] = useState(false);
  const [color, setColor] = useState("black");

  const { state } = useWordList();
  const { characterCountDispatch } = useCharacterCount();

  useEffect(() => {
    const checkCorr = () => {
      if (curr && !seen) {
        setSeen(true);
        if (corr) {
          setColor("white");
          characterCountDispatch({ type: "INCREMENT" });
        } else {
          setColor("red");
          setError(true);
          characterCountDispatch({ type: "INCORRECT" });
        }
      } else if (active && seen) {
        setSeen(false);
        setError(false);
        setColor("black");
        if (color == "red") {
          characterCountDispatch({ type: "DECREMENT_ERROR" });
        } else {
          characterCountDispatch({ type: "DECREMENT" });
        }
      }
    };
    checkCorr();
  }, [curr]);

  useEffect(() => {
    setSeen(false);
  }, [state.wordList]);

  return (
    <>
      <CharCont correct={corr} seen={seen} color={color} active={active}>
        <Type active={active} />
        {char}
      </CharCont>
    </>
  );
};

export default Character;
