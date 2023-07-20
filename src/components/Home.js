import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import UseLocalStorage from "../hooks/UseLocalStorage";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import Header from "./Header";
import {
  faExclamationCircle,
  faCode,
  faStarOfLife,
  faFileCode,
  faExpand
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { html as htmllang } from "@codemirror/lang-html"
import { css as csslang } from "@codemirror/lang-css"
import { javascript as javascriptlang } from "@codemirror/lang-javascript"

export default function Home() {
  const [html, setHtml] = UseLocalStorage("html", "");
  const [css, setCss] = UseLocalStorage("css", "");
  const [javascript, setJavascript] = UseLocalStorage("javascript", "");
  const [srcDoc, setSrcDoc] = useState("");
  const hanglefullscreen = useFullScreenHandle()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  return (
    <>
      <Header />
      <div className="small-screen">
        <FontAwesomeIcon icon={faExclamationCircle} id="error-icon" />
        <h1>Site is not available for your device. (ScreenSize too small)</h1>
      </div>
      <div>
        <div className="pane">
          <Editor
            language={htmllang()}
            displayName="HTML"
            icon={
              <FontAwesomeIcon
                icon={faCode}
                style={{
                  background: "blue",
                  padding: "2px 5px",
                  borderRadius: "5px",
                  marginRight: "7px",
                }}
              />
            }
            value={html}
            setValue={setHtml}
          />
          <Editor
            language={csslang()}
            displayName="CSS"
            icon={
              <FontAwesomeIcon
                icon={faStarOfLife}
                style={{
                  background: "red",
                  padding: "2px 5px",
                  borderRadius: "5px",
                  marginRight: "7px",
                }}
              />
            }
            value={css}
            setValue={setCss}
          />
          <Editor
            language={javascriptlang({jsx: true})}
            displayName="JavaScript"
            icon={
              <FontAwesomeIcon
                icon={faFileCode}
                style={{
                  background: "yellow",
                  color: "grey",
                  padding: "2px 5px",
                  borderRadius: "5px",
                  marginRight: "7px",
                }}
              />
            }
            value={javascript}
            setValue={setJavascript}
          />
        </div>
        <button
          onClick={hanglefullscreen.enter}
          className="fullscreen-toggler"
        >
          <FontAwesomeIcon icon={faExpand} />Fullscreen
        </button>
        <div>
          <FullScreen handle={hanglefullscreen}>
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              width="99%"
              height="100%"
              className="output"
            />
          </FullScreen>
        </div>
      </div>
    </>
  );
}
