import React from "react";
import styled from "styled-components";

/**
 * @param {Boolean} clickable - boolean to change the cursor look.
 * @param {String} color - theme.palette value
 */
const IconWrapper = styled.div`
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  height: inherit;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color, theme }) => (color ? theme.palette[color] : "#9a9a9a")};
`;

/**
 * component that shows material icons .
 * @param {String} icon - material icon value. string
 * @param {*} onClick - passess the onClick function
 * @param {*} onClickUp - function to be triggered when keyUp touchUp
 * @param {String} color - string value for the theme.palette
 * @param {*} onClickDown - function to be triggered when keyDown touchDown
 */
const Icon = ({ icon, onClick, onClickUp, color, onClickDown }) => {
  return (
    <IconWrapper
      color={color}
      clickable={onClick ? true : false}
      onClick={(e) => (onClick ? onClick() : false)}
      onMouseUp={(e) => (onClickUp ? onClickUp() : false)}
      onMouseDown={(e) => (onClickDown ? onClickDown() : false)}
      onPointerUp={(e) => (onClickUp ? onClickUp() : false)}
      onPointerDown={(e) => (onClickDown ? onClickDown() : false)}
    >
      <i className="material-icons" style={{ fontSize: "2rem" }}>
        {icon}
      </i>
    </IconWrapper>
  );
};

export default Icon;
