// import "../styles/globals.css";
import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import { AiFillSound, AiOutlineSound } from "react-icons/ai";

import ReactPlayer from "react-player";
import { useState } from "react";
import { OptionsProvider } from "../context/optionsContext";
import { WordListProvider } from "../context/wordListContext";
import { WordCounterProvider } from "../context/wordCounterContext";

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: #d8c292;

}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

`;

const SoundOnIcon = styled(AiFillSound)`
  position: absolute;
  right: 9rem;
  bottom: 4rem;
  height: 2rem;
  width: 2rem;
`;
const SoundOffIcon = styled(AiOutlineSound)`
  position: absolute;
  right: 9rem;
  bottom: 4rem;
  height: 2rem;
  width: 2rem;
`;

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 100%;
`;

function MyApp({ Component, pageProps }) {
  const [playing, setPlaying] = useState(false);

  return (
    <WordListProvider>
      <OptionsProvider>
        <WordCounterProvider>
          <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
            <GlobalStyle />
            <Head>
              <title>⌨️Daily Type⌨️</title>
              <meta name="description" content="Practice typing" />
            </Head>
            <Component {...pageProps} />
            {playing ? (
              <SoundOnIcon
                onClick={() => {
                  setPlaying(!playing);
                }}
              />
            ) : (
              <SoundOffIcon
                onClick={() => {
                  setPlaying(!playing);
                }}
              />
            )}
            <Player
              url="https://www.youtube.com/watch?v=5qap5aO4i9A"
              height={0}
              width={0}
              volume={0.1}
              playing={playing}
            />
          </div>
        </WordCounterProvider>
      </OptionsProvider>
    </WordListProvider>
  );
}

export default MyApp;
