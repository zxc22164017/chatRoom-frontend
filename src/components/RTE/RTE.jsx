import React, { useState, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const RTE = () => {
  const quillRef = useRef();
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onChange = () => {
      const file = input.files[0];
      console.log(file);
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const [value, setValue] = useState();
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />
      <div style={{ marginTop: "20px" }}>
        <strong>Output:</strong>
        <div dangerouslySetInnerHTML={createMarkup(value)} />
      </div>
    </div>
  );
};

export default RTE;
