import React from 'react';
import cn from 'classnames';

export interface IIconButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

const IconButton: React.FC<IIconButton> = (props) => {
  const { style, className: propClassName, children, ...rest } = props;

  const className = cn('uk-icon-button', { [propClassName]: !!propClassName });

  return (
    <button className={className} style={style} {...rest}>
      {children}
    </button>
  );
};

export { IconButton };
