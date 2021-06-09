import styled from "styled-components";

const Input = styled.input`
  background: transparent;
  //   width: 2.5rem;
  border: none;
`;

const Timer = () => {
  return <Input type="time" placeholder="00:00" />;
};

export default Timer;
