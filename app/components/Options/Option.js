import styled from "styled-components";
import { useOptions } from "../../context/optionsContext";

const OptionCont = styled.span`
  margin: 0 0.25rem;
  color: ${(props) => (props.active ? "#000000" : "#5b5b5b")};

  &:hover {
    color: ${(props) => (props.active ? "#000000" : "#ffffff")};
  }
`;

const Option = ({ label, sub }) => {
  const { options, optionsDispatch } = useOptions();

  const clickHandler = (target) => {
    if (sub) {
      optionsDispatch({ type: "SET_SUBOPTION", payload: target });
    } else {
      optionsDispatch({
        type: "SET_OPTION",
        payload: { option: target, subOption: target === "time" ? "30" : "25" },
      });
    }
  };

  return (
    <OptionCont
      active={sub ? options.subOption === label : options.option === label}
      onClick={(e) => {
        clickHandler(e.target.innerHTML);
      }}
    >
      {label}
    </OptionCont>
  );
};

export default Option;
