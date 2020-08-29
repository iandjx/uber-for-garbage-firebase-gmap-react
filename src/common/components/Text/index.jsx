import styled from "styled-components";

/**
 * @param {Number} fontSize - number value to change the font-size.
 * @param {Boolean} clickable - a boolean value to change the appearance and cursor
 */
const Text = styled.div`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "15px")};
  font-weight: 500;
  color: #003839;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  &:hover {
    text-decoration: ${({ clickable }) => (clickable ? "underline" : "none")};
  }
`;

export default Text;
