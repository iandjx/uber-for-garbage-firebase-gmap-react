import React, { useRef, useState } from "react";

//getting sub components
import Label from "./Label";
import Input from "./Input";
import InputWrapper from "./Input-wrapper";
import Icon from "@Components/Icon";

/**
 * abstract for input element. added labels and a material ui -like function
 * @param {String} label - like a placeholder
 * @param {String} type - type of input. (text , number , email , password)
 * @param {*} onChange - props function to trigger the onChange event
 * @param {String} iconColor - color for the icon . see theme.palette
 */
const FormInput = ({ label, type, onChange, iconColor }) => {
  const [isLabel, setLabel] = useState(false);
  const [value, setValue] = useState("");

  const [showPassword, setShowPassword] = useState(type !== "password");

  const inputRef = useRef();

  // pass the value from input to props.onChange
  // also set value for the local var "value"
  const handleInputChange = (evt) => {
    // passing the value
    const value = evt.target.value;

    //passing to prop onChange
    if (onChange) onChange(value);

    //setting the value to local state "value"
    setValue(value);
  };

  //function to check the type
  const checkType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    } else {
      return type;
    }
  };
  return (
    <InputWrapper>
      <Label small={isLabel} onClick={(e) => inputRef.current.focus()}>
        {label}
      </Label>
      <Input
        type={checkType()}
        ref={inputRef}
        onChange={handleInputChange}
        onFocus={(e) => setLabel(!value || isLabel)}
        onBlur={(e) => setLabel(value)}
      />
      {type === "password" && (
        <Icon
          icon="visibility"
          color={iconColor}
          onClickDown={(e) => setShowPassword(true)}
          onClickUp={(e) => setShowPassword(false)}
        ></Icon>
      )}
    </InputWrapper>
  );
};

export default FormInput;
