import { useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';

const DropDownModal = ({ children, className, position, onOutsideRange }) => {
  const el = useMemo(() => document.createElement('div'), []);
  const target = document.body;

  useEffect(() => {
    // Default classes
    const classList = ['mq-punch-portal-modal'];
    // If className prop is present add each class the classList
    if (className) className.split(' ').forEach((item) => classList.push(item));

    classList.forEach((item) => el.classList.add(item));

    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, [el, className]);

  useEffect(() => {
    const onHideElementWhenScroll = () => onOutsideRange();
    window.onresize = () => onOutsideRange();
    window.addEventListener('scroll', onHideElementWhenScroll);

    return () => {
      window.onresize = () => {};
      window.removeEventListener('scroll', onHideElementWhenScroll);
    };
  }, []);

  useEffect(() => {
    el.style.top = position.top;
    el.style.left = position.left;
  }, [position]);

  return createPortal(children, el);
};

export default DropDownModal;
