import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

//import components
import Block from "@Components/Block";
import Logo from "@Components/Logo";
import HeadingText from "@Components/Heading-text";
import FormInput from "@Components/Form-Input";
import Button from "@Components/Button";
import HeightSpacer from "@Components/Height-Spacer";
import Section from "@Components/Section";
import LinkWrapper from "@Components/Link-Wrapper";
import Text from "@Components/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Highlights = styled.div`
  color: ${({ theme }) => theme.palette.secondary};
  font-size: 0.8rem;
  font-weight: 700;
  margin: 1rem auto;
  max-width: 300px;
`;

const Login = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Block padding="0 1rem">
        <Section position="center" width={460}>
          <HeightSpacer size={5}></HeightSpacer>
          <HeadingText size="medium">Welcome to</HeadingText>
          <Logo size="medium"></Logo>
          <Highlights>
            A reliable and eco-friendly end-to-end waste management platform
          </Highlights>
          <HeightSpacer size={2}></HeightSpacer>
          <FormInput type="email" label="Email/Phone Number"></FormInput>
          <FormInput type="password" label="Password"></FormInput>
          <Text fontSize={15}>
            Don't have an Account?{" "}
            <LinkWrapper onClick={(e) => navigate("/sign-up")}>
              Sign Up
            </LinkWrapper>
          </Text>
          <HeightSpacer size={5}></HeightSpacer>
          <Button primary>Login</Button>
          <HeightSpacer size={4}></HeightSpacer>
          <Text clickable fontSize={13}>
            Privacy Policy
          </Text>
          <Text clickable fontSize={13}>
            Terms of Use
          </Text>
        </Section>
      </Block>
    </Wrapper>
  );
};

export default Login;
