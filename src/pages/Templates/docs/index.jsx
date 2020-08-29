import React from "react";
import styled from "styled-components";

import Button from "@Components/Button";
import FormInput from "@Components/Form-Input";
import HeadingText from "@Components/Heading-text";
import Block from "@Components/Block";
import Logo from "@Components/Logo";
import ModalInput from "@Components/Modal-Input";

const Wrapper = styled.div`
  font-family: Montserrat;
`;

const Color = styled.div`
  height: 100px;
  width: 100px;
  min-height: 100px;
  min-width: 100px;
  border-radius: 100%;
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.palette[bgColor] : "#e0e0e0"};
  margin: 1rem;
`;

const Palettes = styled.div`
  display: flex;
  align-items: center;
  max-width: calc(100% + 2rem);
  overflow-x: scroll;
  margin: 0 -1rem;

  ${Color}&:last-child {
    margin-right: 2rem;
  }
`;

const DarkForm = styled.div`
  background-color: #f4f5f7;
  padding: 1rem 0;
`;

const Docs = () => {
  return (
    <Wrapper>
      <Block padding={1}>
        <HeadingText size="banner">Wayste Design Templates</HeadingText>

        <HeadingText size="large">Typography</HeadingText>
        <HeadingText size="banner">Banner</HeadingText>
        <HeadingText size="large">Large</HeadingText>
        <HeadingText size="medium">Medium</HeadingText>
        <HeadingText>default</HeadingText>
      </Block>

      <Block padding={1}>
        <HeadingText size="large">Color Palettes</HeadingText>
        <Palettes>
          <Color bgColor="primary"></Color>
          <Color bgColor="secondary"></Color>
          <Color bgColor="accent"></Color>
          <Color bgColor="darkerAccent"></Color>
          <Color bgColor="blue"></Color>
        </Palettes>
      </Block>

      <Block padding={1}>
        <HeadingText size="large">Buttons</HeadingText>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      </Block>

      <Block padding={1}>
        <HeadingText size="large">Inputs</HeadingText>
        <FormInput label="Full Name" type="text"></FormInput>
        <FormInput label="Password" type="password"></FormInput>
        <FormInput label="Email" type="email"></FormInput>
      </Block>

      <DarkForm>
        <Block padding={2}>
          <ModalInput
            group
            label="Garbage Type"
            items={["Recycle", "Non-Biodegradable", "Biodegradable"]}
            value={["Recycle", "Non-Biodegradable"]}
          ></ModalInput>
          <ModalInput
            label="What to do with waste?"
            items={["Sell", "Donate"]}
          ></ModalInput>
          <ModalInput
            label="Weight"
            items={["less than 5kg", "5kg - 10kg", "10kg - 20kg", "above 25kg"]}
          ></ModalInput>
        </Block>
      </DarkForm>
      <Block padding={1}>
        <HeadingText size="large">Logo</HeadingText>
        <Logo size="large"></Logo>
        <Logo size="medium"></Logo>
        <Logo></Logo>
      </Block>
    </Wrapper>
  );
};

export default Docs;
