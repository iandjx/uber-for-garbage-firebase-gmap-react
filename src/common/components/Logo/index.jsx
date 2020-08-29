import React from "react";
import styled from "styled-components";

// import assets
import LogoLarge from "@Assets/wayste-logo/large.png";

const LogoWrapper = styled.div``;

const Img = styled.img`
  height: ${({ size }) => {
    switch (size) {
      case "large":
        return "240px";
      case "medium":
        return "140px";
      case "small":
        return "40px";
      default:
        return "66px";
    }
  }};

  @media (max-width: 500px) {
    height: ${({ size }) => {
      switch (size) {
        case "large":
          return "140px";
        case "small":
          return "66px";
        default:
          return "66px";
      }
    }};
  }
`;

/**
 *
 * @param {String} size - change the height of the component . [large, small]
 */
const Logo = ({ size }) => {
  return (
    <LogoWrapper>
      <Img src={LogoLarge} size={size}></Img>
    </LogoWrapper>
  );
};

export default Logo;
