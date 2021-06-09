import Head from "next/head";
import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";
import Typist from "react-typist";
import { useState } from "react";

import Link from "next/link";

const LanderCont = styled(animated.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  span {
    font-size: 5rem;
    letter-spacing: 0.75rem;
  }

  .Typist .Cursor {
    display: inline-block;
  }
  .Typist .Cursor--blinking {
    opacity: 1;
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const IntroCont = styled(animated.div)`
  margin-top: 1rem;
  font-weight: 300;
`;

export default function Home() {
  const [done, setDone] = useState(false);

  const props = useSpring({
    opacity: done ? 1 : 0,
  });

  return (
    <Link href="/main">
      <LanderCont>
        <Typist
          avgTypingDelay={150}
          startDelay={1000}
          onTypingDone={() => {
            setDone(true);
          }}
        >
          <span>hi...</span>
          <Typist.Backspace count={5} delay={800} />
          <span>
            welcome to <span style={{ color: "#C19065" }}>daily types</span>
          </span>
        </Typist>
        {done && <IntroCont style={props}>click anywhere to begin</IntroCont>}
      </LanderCont>
    </Link>
  );
}
