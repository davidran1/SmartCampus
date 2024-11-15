import React from "react";

const IFrameTemplate = ({ src, title, width, height, loading, ...props }) => {
  return (
    <iframe
      src={src}
      title={title}
      width={width || "100%"}
      height={height || "500px"}
      loading={loading || "lazy"}
      {...props}
    />
  );
};

export default IFrameTemplate;
