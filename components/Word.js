import { useEffect, useState } from "react";
import styled from "styled-components";
import Character from "./Character";

const WordCont = styled.div`
  margin: 0.1rem 0.5rem;
  height: 2rem;
  border-bottom: ${(props) => props.active && `3px solid #c19065`};
`;

const Word = (props) => {
  const [chars, setChars] = useState([]);
  useEffect(() => {
    const toString = () => {
      setChars(props.word.split(""));
    };
    toString();
  }, []);
  return (
    <WordCont active={props.active}>
      {chars.map((obj) => {
        return <Character char={obj} />;
      })}
    </WordCont>
  );
};

export default Word;
