import React, { memo, useState } from "react";

import api from "../api/BoardAPI";

import MdEditor from "react-markdown-editor-lite";
import MdParser from "./MdParser";
import "react-markdown-editor-lite/lib/index.css";

const Editor = memo(({ handlingChange, value }) => {
  // const [images, setImages] = useState([]);

  const handleImageUpload = file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        let sendData = {
          image: data.target.result,
        }
        api.uploadImage(sendData).then(res => {
          resolve(res.data.image);
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // const handleCustomImageUpload = event => {
  //   console.log(event);
  //   return new Promise(resolve => {
  //     const reader = new FileReader();
  //     // reader.onload = data => {
  //     //   resolve(data.target.result);
  //     // };
  //     // reader.readAsDataURL(file);
  //     reader.onload = data => {
  //       console.log(data);
  //       let sendData = {
  //         image: reader.result,
  //       }
  //       let res = api.uploadImage(sendData);
  //       console.log(res);
  //       resolve(res.image);
  //     }
  //   });
  // };

  const renderHTML = text => {
    // return text;
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
