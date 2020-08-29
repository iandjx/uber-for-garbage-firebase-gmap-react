import styled from "styled-components";

/**
 * @param {String} size - font-size. [banner , large , medium]
 */
const HeadingText = styled.h1`
  font-size: ${({ size }) => {
    switch (size) {
      case "banner":
        return "3rem";

      case "large":
        return "2rem";

      case "medium":
        return "1.5rem";

      default:
        return "1rem";
    }
  }};

  color: ${({ theme }) => theme.palette.blue};
`;

export default HeadingText;
