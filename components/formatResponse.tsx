import React from "react";
import ReactMarkdown from "react-markdown";
interface FormatResponseProps {
  content: string;
}
const FormatResponse = ({ content }: FormatResponseProps) => {
  // Add your formatting logic here
  // For example, you can split the content into separate lines
  return content.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <strong {...props} />,
          h2: ({ node, ...props }) => <strong {...props} />,
          h3: ({ node, ...props }) => <strong {...props} />,
          h4: ({ node, ...props }) => <strong {...props} />,
          h5: ({ node, ...props }) => <strong {...props} />,
          h6: ({ node, ...props }) => <strong {...props} />,
        }}
      >
        {line}
      </ReactMarkdown>
      <br />
    </React.Fragment>
  ));
};

export default FormatResponse;
