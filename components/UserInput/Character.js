import { useEffect, useState } from "react";
import styled from "styled-components";

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

const Character = ({ char, curr, corr, wordList, active, setError }) => {
  const [seen, setSeen] = useState(false);
  const [color, setColor] = useState("black");

  useEffect(() => {
    const checkCorr = () => {
      if (curr && !seen) {
        setSeen(true);
        if (corr) {
          setColor("white");
        } else {
          setColor("red");
          setError(true);
        }
      } else if (active && seen) {
        setSeen(false);
        setError(false);
        setColor("black");
      }
    };
    checkCorr();
  }, [curr]);

  useEffect(() => {
    setSeen(false);
  }, [wordList]);

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
