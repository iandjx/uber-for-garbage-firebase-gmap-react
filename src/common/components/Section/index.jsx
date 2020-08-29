import styled from "styled-components";

/**
 *  @param {String} position - text-align values (left , center , right)
 *  @param {String} width - max-width.
 */
const Section = styled.section`
  text-align: ${({ position }) => (position ? position : "left")};
  max-width: ${({ width }) => (width ? `${width}px` : "100%")};
  width: 100%;
  margin: 0 auto;
`;

export default Section;
