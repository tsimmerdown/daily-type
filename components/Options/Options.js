import { useEffect } from "react";
import styled from "styled-components";
import { getWords } from "../../pages/api/getWords";
import Option from "./Option";

const OptionCont = styled.div`
  position: absolute;
  left: 9rem;
  bottom: 4rem;
  color: #5b5b5b;
`;

const SubOptionCont = styled.div`
  display: flex;
`;

const Options = (props) => {
  useEffect(() => {
    const getWordList = async () => {
      const optionProps =
        props.option.option === "words" ? props.option.subOption : "100";
      const words = await getWords(optionProps);
      props.setWordList(words);
      props.setInputList([]);
    };

    getWordList();
  }, [props.option]);

  return (
    <OptionCont>
      <div style={{ display: "flex" }}>
        <Option label="time" {...props} />
        <Option label="words" {...props} />
      </div>
      {props.option.option === "words" ? (
        <SubOptionCont>
          <Option label="10" sub {...props} />
          <Option label="25" sub {...props} />
          <Option label="50" sub {...props} />
          <Option label="100" sub {...props} />
        </SubOptionCont>
      ) : (
        <SubOptionCont>
          <Option label="15" sub {...props} />
          <Option label="30" sub {...props} />
          <Option label="60" sub {...props} />
          <Option label="120" sub {...props} />
        </SubOptionCont>
      )}
    </OptionCont>
  );
};

export default Options;
