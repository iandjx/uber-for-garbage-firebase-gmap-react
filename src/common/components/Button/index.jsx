import styled, { css } from "styled-components";

/**
 * @param {Boolean} primary - boolean check if primary style
 * @param {Boolean} secondary - boolean value if secondary style.
 */
export const Button = styled.button`
  width: calc(100%);
  padding: 1rem;
  font-family: Montserrat;
  text-align: center;
  font-weight: 700;
  border: none;
  outline: none;
  padding: 1.5rem;
  font-size: 1rem;
  border-radius: 21px;
  box-shadow: 15px 15px 40px 0 rgba(36, 165, 169, 0.12);
  margin: 0.5rem 0;

  ${({ primary }) =>
    primary &&
    css`
      background-color: #2fbfc0;
      color: #fff;
      cursor: pointer;
      background-image: radial-gradient(
        ellipse at 0% 10%,
        #afd03b 0%,
        #2fbfc0 90%
      );
    `};

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: #e0e0e0;
      color: #afafaf;
      cursor: not-allowed;
    `}
`;

export default Button;
