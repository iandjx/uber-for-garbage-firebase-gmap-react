import React from 'react';
import styled from 'styled-components';

const CheckBoxWrapper = styled.div`
  height: 20px;
  min-height: 20px;
  min-width: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-right: 1rem;
  box-shadow: 0 13px 34px 0 rgba(36, 165, 169, 0.13);
  border: solid 1px #b2b2b2;
`;

const Checker = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.palette.accent};
`;


const CheckBox = ({selected}) => {
    return (
        <CheckBoxWrapper>{selected && <Checker></Checker>}</CheckBoxWrapper>
    )
}

export default CheckBox;