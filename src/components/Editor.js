import React, { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { EditorView } from '@codemirror/view';

export default function Editor(props) {
  const { language, displayName, icon, value, setValue } = props;

  const [open, setOpen] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  function handleChange(value, viewUpdate) {
    setValue(value);
  }

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`} style={{border: isFocused ? "2px solid #80aaff" : "none"}}>
      <div className="editor-title">
        <div style={{ display: "flex" }}>
          {icon}
          {displayName}
        </div>
        <button
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          type="button"
          className="expand-collapse-btn"
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ReactCodeMirror
        value={value}
        height="42vh"
        theme={sublime}
        extensions={[language, EditorView.lineWrapping]}
        basicSetup={{
          drawSelection: false,
          history: true,
        }}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
