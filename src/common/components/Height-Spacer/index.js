import styled from "styled-components";

/**
 * @param {Number} size - number. sets the height
 */
const HeightSpacer = styled.div`
  height: ${({ size }) => (size ? `${size}rem` : 0)};
`;

export default HeightSpacer;
