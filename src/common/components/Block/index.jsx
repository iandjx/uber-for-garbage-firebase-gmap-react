import React from "react";
import styled from "styled-components";

const BlockWrapper = styled.div`
  width: ${({ padding }) =>
    padding ? `calc(100% - ${padding * 2}rem)` : "100%"};
  padding: ${({ padding }) => {
    const isNumber = typeof padding === "number";
    if (padding) {
      if (isNumber) {
        return `${padding}rem`;
      } else {
        return padding;
      }
    } else {
      return 0;
    }
  }};
`;

const BlockContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

/**
 * component that makes a centered div
 * @param {String} padding - creates a padding within the middle container
 */
const Block = ({ children, padding }) => {
  return (
    <BlockWrapper padding={padding}>
      <BlockContainer>{children}</BlockContainer>
    </BlockWrapper>
  );
};

export default Block;
