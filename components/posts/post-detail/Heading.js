import { createElement } from "react";
const elements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

export default function Heading({ level, children, ...props }) {
  return createElement(elements[level] || elements.h1, props, children);
}

Heading.defaultProps = {
  type: "h1",
};
