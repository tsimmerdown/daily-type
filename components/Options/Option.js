import styled from "styled-components";

const OptionCont = styled.span`
  margin: 0 0.25rem;
  color: ${(props) => (props.active ? "#000000" : "#5b5b5b")};

  &:hover {
    color: ${(props) => (props.active ? "#000000" : "#ffffff")};
  }
`;

const Option = ({ option, setOption, label, sub }) => {
  const clickHandler = (target) => {
    if (sub) {
      setOption({
        option: option?.option,
        subOption: target,
      });
    } else {
      setOption({
        option: target,
        subOption: target === "time" ? "30" : "25",
      });
    }
  };

  return (
    <OptionCont
      active={sub ? option.subOption === label : option.option === label}
      onClick={(e) => {
        clickHandler(e.target.innerHTML);
      }}
    >
      {label}
    </OptionCont>
  );
};

export default Option;
