import React, { useState } from 'react';

import Modal from '../../../UI/Modal/Modal';

import boxerPunchBag from '../../../../assets/website/boxer_punch_bag.png';

const WelcomeBlock = () => {
  const [modalData, setModalData] = useState(null);

  return (
    <>
      <Modal data={modalData} />
      <div className='welcome-block'>
        <p className='welcome-slogan'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p className='welcome-slogan'>
          Et consectetur dolore explicabo fugiat nulla veniam unde autem.
        </p>
        <button className='welcome-start-button' onClick={onOpenAuthModal}>
          <img src={boxerPunchBag.src} className='bg-image' alt='' />
          <span>start</span>
        </button>
      </div>
    </>
  );

  function onOpenAuthModal() {
    setModalData({
      template: 'auth-modal',
      onClose: () => setModalData(null),
    });
  }
};

export default WelcomeBlock;
