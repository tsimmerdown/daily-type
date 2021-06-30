import { useState } from "react";
import styled from "styled-components";
import Counter from "../components/Counter";
import Header from "../components/Header";
import MainInput from "../components/UserInput/MainInput";
import Options from "../components/Options/Options";

const MainCont = styled.div``;

const main = () => {
  const [inputList, setInputList] = useState([]);
  const [wordCounter, setWordCounter] = useState(0);

  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  return (
    <div>
      <Header />
      <Counter
        wordCounter={wordCounter}
        start={start}
        setFinish={setFinish}
        setStart={setStart}
      />
      <MainInput
        inputList={inputList}
        setInputList={setInputList}
        wordCounter={wordCounter}
        setWordCounter={setWordCounter}
        start={start}
        setStart={setStart}
        finish={finish}
        setFinish={setFinish}
      />
      <Options setInputList={setInputList} setStart={setStart} />
    </div>
  );
};

export default main;
