import React from 'react';
import cn from 'classnames';

interface SpinnerPropsType {
  size?: 'small' | 'medium' | 'big';
  style?: any;
}

const Spinner: React.FC<SpinnerPropsType> = (props) => {
  const { size, style } = props;

  return (
    <div className={cn('mq-punch-spinner', { [size]: !!size })} style={style || null}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
