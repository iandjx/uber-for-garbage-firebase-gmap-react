import React from "react";
import styled from "styled-components";

//components
import Icon from "@Components/Icon";

const DisposerSideBar = styled.div`
  background-color: ${({ theme }) => theme.palette.appleGreen};
  width: ${({ theme }) => theme.sidebar.width};
  min-width: ${({ theme }) => theme.sidebar.width};
  position: relative;
  z-index: 10;
  transition: all 0.2s ease-in-out;
  margin-left: ${({ show, theme }) => (!show ? `-${theme.sidebar.width}` : 0)};
`;

/**
 *
 * @param {Boolean} show - boolean value to change the position of the sidebar
 */
const SideBar = ({ show, onClose }) => {
  return (
    <DisposerSideBar show={show}>
      <Icon
        onClick={(e) => onClose()}
        icon="keyboard_arrow_left"
        color="white"
      ></Icon>
    </DisposerSideBar>
  );
};

export default SideBar;
