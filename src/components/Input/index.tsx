import {
  useEffect,
  useRef,
  useState,
  useCallback, ChangeEventHandler,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
import {IconType} from "react-icons";

interface InputProps {
  name: string
  placeholder: string
  icon?: IconType
  onChange?: ChangeEventHandler<HTMLInputElement>
}


const Input = ({ name, placeholder, onChange }: InputProps): JSX.Element => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {/*{Icon && <Icon size={20} />}*/}

      <input
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={onChange}
        defaultValue={defaultValue}
        ref={inputRef}
      />
    </Container>
  );
};

export default Input;
