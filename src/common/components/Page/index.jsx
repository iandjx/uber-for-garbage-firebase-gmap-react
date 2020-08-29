import React, { useState } from "react";
import styled from "styled-components";

//components
import Logo from "@Components/Logo";
import Icon from "@Components/Icon";
import Section from "@Components/Section";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const MenuIcon = styled.div`
  @media (max-width: 700px) {
    position: fixed;
    top: 30px;
    left: 5px;
    display: block;
  }
`;

const ActionBar = styled.div`
  padding: 0.5rem;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  background-color: #ffffff;
  align-items: center;
  position: relative;
  z-index: 2;
  @media (max-width: 700px) {
    flex-direction: column;
    padding-top: 1rem;
    box-shadow: transparent;
  }
`;

const Content = styled.div`
  flex: 2;
  display: flex;
  min-width: 320px;
  position: relative;
  flex-direction: column;
  overflow: auto;
`;

const PageSection = styled(Section)`
  @media (max-width: 700px) {
    text-align: center;
  }
`;

const CloseFacade = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 5;
`;

/**
 * @param {Object} SideBar - a component that will be shown on the menu (side-bar)
 */
const Page = ({ children, SideBar }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Wrapper>
      <SideBar show={showMenu} onClose={(e) => setShowMenu(false)}></SideBar>
      <Content>
        {showMenu && (
          <CloseFacade onClick={(e) => setShowMenu(false)}></CloseFacade>
        )}
        <ActionBar>
          <MenuIcon onClick={(e) => setShowMenu(!showMenu)}>
            <Icon
              onClick={(e) => console.log(e)}
              icon="menu"
              color="primary"
            ></Icon>
          </MenuIcon>
          <PageSection position="left">
            {" "}
            <Logo size="small"></Logo>{" "}
          </PageSection>
        </ActionBar>
        <Content>{children}</Content>
      </Content>
    </Wrapper>
  );
};

export default Page;
