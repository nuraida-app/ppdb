import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: props.value || "" };
    this.reactQuillRef = null;
  }

  handleChange = (html) => {
    // Debug log
    this.setState({ editorHtml: html });
    this.props.onChange(html);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ editorHtml: this.props.value });
    }
  }

  render() {
    const { placeholder } = this.props;

    return (
      <Box sx={{ height: "68vh", bgcolor: "white" }}>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme="snow"
          value={this.state.editorHtml}
          onChange={this.handleChange}
          modules={Editor.modules()}
          formats={Editor.formats}
          placeholder={placeholder}
          style={{ height: "80%" }}
        />
      </Box>
    );
  }
}

Editor.modules = () => ({
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
  clipboard: {
    matchVisual: false,
  },
});

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

Editor.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Editor;
