import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  alignItems: "center",
  padding: "100px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const RenderDropzoneInput = ({ input, meta, label, onChangeInput }) => {
  const [files, setFile] = useState([]);
  const [err, setErr] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    //maxSize: 10000000,
    onDrop: acceptedFiles => {
      const isFileValid = acceptedFiles[0].size <= 10000000;
      setErr(isFileValid);
      if (isFileValid) {
        setFile(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
        input.onChange(acceptedFiles[0]);

        const dt = new Date(acceptedFiles[0].lastModifiedDate);
        var mm = dt.getMonth() + 1;
        var dd = dt.getDate();
        var yyyy = dt.getFullYear();
        if (mm < 10) {
          mm = "0" + mm;
        }
        if (dd < 10) {
          dd = "0" + dd;
        }
        var newDate = yyyy + "-" + mm + "-" + dd;

        input.onChange(
          onChangeInput(acceptedFiles[0].name, newDate, acceptedFiles[0])
        );
      } else {
        acceptedFiles[0] = null;
      }
    }
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const pic = files.map(file => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} className="ui image" />
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const renderError = ({ error, touched }) => {
    if (!err) {
      return (
        <div style={{ color: "red" }}>
          File size too big, must be under 10MB / 10000KB / .01GB
        </div>
      );
    }
    if (touched && error) {
      return <div style={{ color: "red" }}>{error}</div>;
    }
  };

  return (
    <div className="ui stackable two column grid">
      <div className="column">
        <div {...getRootProps({ className: "dropzone", style })}>
          <input {...getInputProps()} type="file" name="image" />
          <p>Drag 'n' drop photo here, or click to select photo</p>
          {renderError(meta)}
        </div>
      </div>
      <div className="column">{pic}</div>
    </div>
  );
};

export default RenderDropzoneInput;
