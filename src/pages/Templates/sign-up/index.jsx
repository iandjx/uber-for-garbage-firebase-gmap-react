import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// import components
import Block from '@Components/Block';
import FormInput from '@Components/Form-Input';
import HeadingText from '@Components/Heading-text';
import HeightSpacer from '@Components/Height-Spacer';
import Section from '@Components/Section';
import Button from '@Components/Button';
import CheckBox from '@Components/CheckBox';
import Text from '@Components/Text';
import LinkWrapper from '@Components/Link-Wrapper';

const dashboardLink = '/test/disposer';
const Wrapper = styled.div``;

const AgreeWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const SignUpForm = styled.form``;

const SignUp = () => {
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    navigate(dashboardLink);
  };
  return (
    <Wrapper>
      <Block padding="0 1rem">
        <Section position="center" width={460}>
          <HeightSpacer size={1}></HeightSpacer>
          <HeadingText size="large">Sign Up</HeadingText>
          <HeightSpacer size={1}></HeightSpacer>
          <SignUpForm onSubmit={onSubmit}>
            <FormInput label="Full Name"></FormInput>
            <FormInput label="Contact Number"></FormInput>
            <FormInput label="Email" type="email"></FormInput>
            <FormInput label="Password" type="password"></FormInput>
            <FormInput label="Confirm Password" type="password"></FormInput>
            <Section position="center" width={420}>
              <AgreeWrapper>
                <CheckBox></CheckBox>
                <Text>
                  I agree to the <LinkWrapper>Terms of Use</LinkWrapper> and{' '}
                  <LinkWrapper>Privacy Policy</LinkWrapper>.
                </Text>
              </AgreeWrapper>
            </Section>
            <HeightSpacer size={1}></HeightSpacer>
            <Button primary>Submit</Button>
          </SignUpForm>
        </Section>
      </Block>
    </Wrapper>
  );
};

export default SignUp;
