import { useEffect, useState } from "react";
import styled from "styled-components";
import Character from "./Character";
import { useWordList } from "../../context/wordListContext";

const WordCont = styled.div`
  margin: 0.1rem 0.5rem;
  height: 2rem;
  border-bottom: ${(props) =>
    props.active ? `3px solid #c19065` : props.error && "3px solid red"};
`;

const Word = (props) => {
  const [chars, setChars] = useState([]);
  const [error, setError] = useState(false);

  const { state } = useWordList();

  useEffect(() => {
    const toString = () => {
      setChars(props.word.split(""));
      setError(false);
    };
    toString();
  }, [state.wordList]);

  useEffect(() => {
    if (error) {
      props.setErrorCounter((count) => count + 1);
    }
  }, [props.active]);

  return (
    <WordCont active={props.active} error={error}>
      {chars.map((obj, index) => {
        return (
          <Character
            key={index}
            char={obj}
            curr={index == props.activeCharIndex && props.active}
            active={index == props.activeCharIndex + 1 && props.active}
            corr={
              props.input[props.activeCharIndex] ==
              props.word.charAt(props.activeCharIndex)
            }
            setError={setError}
          />
        );
      })}
    </WordCont>
  );
};

export default Word;
