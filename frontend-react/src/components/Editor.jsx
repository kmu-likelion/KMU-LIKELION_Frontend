import React, { memo } from "react";

import api from "../api/BoardAPI";

import MdEditor from "react-markdown-editor-lite";
import MdParser from "./MdParser";
import "react-markdown-editor-lite/lib/index.css";

const Editor = memo(({ handlingChange, value }) => {
  const handleImageUpload = file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        let sendData = {
          image: data.target.result
        };
        api.uploadImage(sendData).then(res => {
          resolve(res.data.image);
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const renderHTML = text => {
    return MdParser.render(text);
  };

  return (
    <div class="image-fixer">
      <MdEditor
        name="body"
        value={value || ""}
        renderHTML={renderHTML}
        onChange={handlingChange}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
});

export default Editor;
