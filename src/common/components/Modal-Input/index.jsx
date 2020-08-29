import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

import Button from "@Components/Button";
import CheckBox from "@Components/CheckBox";

export const ModalSelection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 2rem);
  height: calc(100vh - 2rem);
  z-index: 2;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.72);
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 360px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: 0.5rem;
  margin-top: 5rem;
  border-radius: 10px;
  text-align: center;

  @media (max-height: 569px) {
    margin-top: 1rem;
  }
`;

export const ModalItem = styled.div`
  display: flex;
  align-items: center;
`;

const ModalButton = styled.div`
  background-color: white;
  border-radius: 21px;
  position: relative;
  box-shadow: 0 13px 34px 0 rgba(36, 165, 169, 0.12);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  margin: 1.2rem 0;
  opacity: 0.72;
  min-height: 70px;
`;

const Info = styled.div`
  flex: 2;
  overflow: hidden;
`;

/**
 * @param {Boolean} small - boolean value to change the font-size , font-weight , margin
 */
const Label = styled.div`
  font-size: ${({ small }) => (small ? "0.8rem" : "1rem")};
  color: ${({ theme }) => theme.palette.primary};
  font-weight: ${({ small }) => (small ? 400 : 500)};
  margin: ${({ small }) => (small ? "5px 0" : "0 0")};
`;

const Heading = styled.h1`
  color: #797979;
  font-size: 18px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid #b2b2b2;
  border-radius: 21px;
  color: ${({ theme }) => theme.palette.primary};
  opacity: 0.71;
  margin: 1rem 0.5rem;
  font-weight: 500;
`;

const Value = styled.div`
  color: #797979;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 20px);
`;

/**
 *  component that is a form of input. shows a modal and an array of items
 *  @param {String} label label to show on the button and heading for modal container
 *  @param {Array} items items to show on the modal
 *  @param {Boolean} group Element attr check if a group select or not
 *  @param {String[]} value value for the list
 *  @param {*} onChange trigger onChange event when local value has been updated
 */
const ModalInput = ({ label, items, group, value, onChange }) => {
  //constants
  const [showModal, setShowModal] = useState(false);
  const [_value, _setValue] = useState(group ? [] : "");

  useEffect(() => {
    if (value) {
      // check if has value. then set the value on the local state
      _setValue(group ? [...value] : value);
    }
  }, [value, group]);

  // function to check if the item is in the local state or not;
  const isCheck = (item) => {
    if (group) {
      const isOn = _value.filter((val) => val === item).length > 0;

      return isOn;
    } else {
      return _value === item;
    }
  };

  // function for handling item clicks
  const handleItemClick = (item) => {
    // set value on state
    _setValue((prev) => {
      // check if multiple values
      if (group) {
        // check if item already in list to decide
        // if you want to add it or remove it on the list
        prev = !isCheck(item)
          ? [...prev, item] // add item using spreaders.
          : prev.filter((pre) => pre !== item); // remove if in list
      } else {
        // if not multiple values;
        prev = item;
      }

      // pass to onChange props
      if (onChange) onChange(prev);

      return prev;
    });
  };

  return (
    <>
      <ModalButton onClick={(e) => setShowModal(true)}>
        <Info>
          <Label small={_value.toString()}>{label}</Label>
          {_value && <Value>{_value.toString()}</Value>}
        </Info>
      </ModalButton>
      {showModal && (
        <ModalSelection>
          <ModalContainer>
            <Heading>{label}</Heading>
            {items && //check if items is not null
              typeof items === "object" && //check if items is an array ?
              items.map((
                item,
                key // map the items
              ) => (
                <Item key={key} onClick={(e) => handleItemClick(item)}>
                  <CheckBox selected={isCheck(item)}></CheckBox>
                  {item}
                </Item>
              ))}
            <Button primary onClick={(e) => setShowModal(false)}>
              OK
            </Button>
          </ModalContainer>
        </ModalSelection>
      )}
    </>
  );
};

export default ModalInput;
