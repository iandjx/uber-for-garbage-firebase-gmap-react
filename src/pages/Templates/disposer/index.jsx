import React from "react";
import styled from "styled-components";
//components
import Page from "@Components/Page";
import PageHeader from "@Components/Page/Page-Header";
import HeadingText from "@Components/Heading-text";
import Scrollable from "@Components/Scrollable";
import SideBar from "./Side-Bar";
import Footer from "@Components/Footer";
import ModalInput from "@Components/Modal-Input";
import Block from "@Components/Block";
import Button from "@Components/Button";
import HeightSpacer from "@Components/Height-Spacer";

const Content = styled.div`
  flex: 2;
  background-color: #e0e0e0;
`;

const RequestForm = styled.form``;

// requestForm values
const garbageTypes = ["Recyclables", "Biodegradables", "Residuals"];
const wtd = ["Sell", "Donate"];
const weight = ["less than 5kg", "5kg - 10kg", "10kg - 20kg", "above 25kg"];

const Disposer = () => {
  return (
    <Page SideBar={SideBar}>
      <PageHeader>
        <HeadingText size="medium">Schedule a Pick Up</HeadingText>
      </PageHeader>
      <Scrollable>
        <Content>
          <Block padding="0 2rem">
            <RequestForm>
              <ModalInput
                label="Garbage Type"
                items={garbageTypes}
                group
              ></ModalInput>
              <ModalInput
                label="What to do with waste?"
                items={wtd}
              ></ModalInput>
              <ModalInput label="Weight" items={weight}></ModalInput>
              <ModalInput label="Location"></ModalInput>
              <ModalInput label="Photo"></ModalInput>
              <Button primary>FIND ECO AID</Button>
              <HeightSpacer size={1}></HeightSpacer>
            </RequestForm>
          </Block>
        </Content>
        <Footer></Footer>
      </Scrollable>
    </Page>
  );
};

export default Disposer;
