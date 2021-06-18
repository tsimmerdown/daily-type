import styled from "styled-components";

const CharCont = styled.span`
  color: ${(props) => (props.correct ? "white" : "red")};
  // display: inline-block;
  // margin: 0 0.7px;
`;

const Character = ({ char, corr }) => {
  return <CharCont correct={corr}>{char}</CharCont>;
};

export default Character;
