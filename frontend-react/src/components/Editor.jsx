import React, { memo, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MdParser from "./MdParser";
import "react-markdown-editor-lite/lib/index.css";

const Editor = memo(({ handlingChange, value }) => {
  // const [images, setImages] = useState([]);

  const handleImageUpload = file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const renderHTML = text => {
    // return text;
    return MdParser.render(text);
  };

  return (
    <MdEditor
      name="body"
      value={value || ""}
      renderHTML={renderHTML}
      onChange={handlingChange}
      onImageUpload={handleImageUpload}
    />
  );
});

export default Editor;
