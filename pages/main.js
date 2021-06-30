import { useState } from "react";
import styled from "styled-components";
import Counter from "../components/Counter";
import Header from "../components/Header";
import MainInput from "../components/UserInput/MainInput";
import Options from "../components/Options/Options";

const MainCont = styled.div``;

const main = () => {
  const [inputList, setInputList] = useState([]);
  const [errorCounter, setErrorCounter] = useState(0);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  return (
    <div>
      <Header />
      <Counter
        start={start}
        finish={finish}
        setFinish={setFinish}
        setStart={setStart}
      />
      <MainInput
        inputList={inputList}
        setInputList={setInputList}
        start={start}
        setStart={setStart}
        finish={finish}
        setFinish={setFinish}
        errorCounter={errorCounter}
        setErrorCounter={setErrorCounter}
      />
      <Options
        setInputList={setInputList}
        setStart={setStart}
        setErrorCounter={setErrorCounter}
      />
    </div>
  );
};

export default main;
