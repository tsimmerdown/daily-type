import styled from "styled-components";
import {
  AiOutlineInfoCircle,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";

import Timer from "./Timer";

const HeaderCont = styled.div`
  margin: 4rem 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: 400;
    flex: 5 1 auto;
  }
`;

const IconList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const About = styled(AiOutlineInfoCircle)`
  height: 2rem;
  width: 2rem;
  margin: 0 0.5rem 0 3rem;
  color: #5b5b5b;
  &:hover {
    color: #000000;
  }
`;
const Settings = styled(AiOutlineSetting)`
  height: 2rem;
  width: 2rem;
  margin: 0 0.5rem;
  color: #5b5b5b;
  &:hover {
    color: #000000;
  }
`;
const User = styled(AiOutlineUser)`
  color: #5b5b5b;
  height: 2rem;
  width: 2rem;
  margin: 0 0.5rem;
  &:hover {
    color: #000000;
  }
`;

const Header = () => {
  return (
    <HeaderCont>
      <h1>⌨daily type</h1>
      <Timer />
      <IconList>
        <About />
        <Settings />
        <User />
      </IconList>
    </HeaderCont>
  );
};

export default Header;
