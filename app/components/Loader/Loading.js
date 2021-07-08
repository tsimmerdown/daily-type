import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { useState } from "react";

const Loader = styled(animated.div)`
  border: 10px solid black;
  border-radius: 100%;
  left: 50%;
  opacity: props.opacity;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = () => {
  const useForceUpdate = () => {
    const [, setState] = useState();
    return () => setState({});
  };
  const forceUpdate = useForceUpdate();

  const restHandler = () => {
    forceUpdate();
  };

  const props = useSpring({
    reset: true,
    onRest: restHandler,
    from: {
      opacity: 1,
      height: 0,
      width: 0,
    },
    to: { opacity: 0, height: 100, width: 100 },
  });

  return <Loader style={props}></Loader>;
};

export default Loading;
