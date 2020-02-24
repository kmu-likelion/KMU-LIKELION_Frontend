import React, { memo } from "react";
import MdParser from "./MdParser";
import "react-markdown-editor-lite/lib/index.css";

const Viewer = memo(({ value }) => {
  const renderHTML = text => {
    // return text;
    return { __html: MdParser.render(text) };
  };

  return (
    <div
      dangerouslySetInnerHTML={renderHTML(value)}
      className="html-wrap"
    ></div>
  );
});

export default Viewer;
