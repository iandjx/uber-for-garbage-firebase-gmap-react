import styled from "styled-components";

/**
 * @param {Boolean} small - boolean check to shrink the size of the label
 */
const Label = styled.span`
  position: absolute;
  font-family: Montserrat;
  font-size: ${({ small }) => (small ? "0.8rem" : "1rem")};
  top: ${({ small }) => (small ? "2px" : "25px")};
  left: ${({ small }) => (small ? "25px" : "25px")};
  font-weight: ${({ small }) => (small ? 400 : 500)};
  transition: all 0.2s ease-in-out;
  z-index: 0;
  color: ${({ theme }) => theme.palette.primary};
  opacity: 0.6;
`;

export default Label;
