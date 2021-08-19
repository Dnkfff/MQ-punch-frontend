import React, { memo, useState, useEffect } from 'react';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';

import modalSelectTemplateByData from './ModalTemplates/modalSelectTemplateByData';

const Modal = memo((props) => {
  const { data } = props;

  const ModalContentTemplate = data ? modalSelectTemplateByData(data) : <></>;

  // for normal animation
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (data) setShow(true);
    else setShow(false);
  }, [data]);

  return (
    <>
      <div className={cn('global-modal-backdrop', { show: show, hidden: !show })} onClick={data?.onClose} />
      <CSSTransition in={show} timeout={500} classNames='global-modal-anim' unmountOnExit>
        <div className={cn('global-modal-window-content', data?.template)}>{ModalContentTemplate}</div>
      </CSSTransition>
    </>
  );
});

export default Modal;
