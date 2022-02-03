import React from 'react';
import cn from 'classnames';

const Input = (props) => {
  const { types, inputType, placeholder, value, onChange, ...otherProps } = props;

  const inputClassName =
    types && types.length !== 0 ? cn('mq-punch-form-input', ...types) : cn('mq-punch-form-input');

  return (
    <input
      className={inputClassName}
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...otherProps}
    >
      {props.children}
    </input>
  );
};

export default Input;
