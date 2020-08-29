import React from "react";
import styled from "styled-components";

//component
import Block from "@Components/Block";
import Section from "@Components/Section";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.primary};
  padding: 1rem;
  color: ${({ theme }) => theme.palette.white};
  font-weight: 500;
  font-size: 0.75rem;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Link = styled.div`
  cursor: pointer;
  margin: 0.2rem 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;
const Footer = () => {
  return (
    <Wrapper>
      <Block>
        <Section position="center">
          © Wayste 2020
          <br />
          <FlexBox>
            <Link>Terms of service</Link>
            <Link>Privacy Policy</Link>
          </FlexBox>
        </Section>
      </Block>
    </Wrapper>
  );
};

export default Footer;
