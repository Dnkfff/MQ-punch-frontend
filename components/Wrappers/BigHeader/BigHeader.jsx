import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Modal from '../../UI/Modal/Modal';

// constants
import { bigHeaderMenuLinks } from '../../../inside-services/constants/constants';

import mainBigLogoPath from '../../../assets/website/mq-rect-punch-logo-white.png';
import boxingRingPict from '../../../assets/website/boxing-ring.png';

const BigHeaderMenuLinks = () => {
  const router = useRouter();

  return bigHeaderMenuLinks.map((el) => (
    <Link
      key={el.id}
      href={{
        pathname: el.pathname,
      }}
    >
      <a className={router.pathname.includes(el.pathname) ? 'active' : 'no-active'}>{el.label}</a>
    </Link>
  ));
};

const BigHeader = (props) => {
  const [modalData, setModalData] = useState(null);

  return (
    <>
      <Modal data={modalData} />
      <header className='app-container-big-header'>
        <div className='main-picture'>
          <img src={boxingRingPict.src} alt='boxing-ring' className='boxing-ring-pict' />
          <img src={mainBigLogoPath.src} alt='MQPUNCH' className='main-big-logo' />
          <div className='under-picture-info'>
            <button className='start' onClick={onOpenAuthModal}>
              Start
            </button>
          </div>
        </div>
        <div className='big-header-menu'>
          <nav className='links'>
            <BigHeaderMenuLinks />
          </nav>
        </div>
      </header>
    </>
  );

  function onOpenAuthModal() {
    setModalData({
      template: 'auth-modal',
      onClose: () => setModalData(null),
      onLogin: () => {
        setModalData(null);
        // login func
        console.log('success login');
      },
    });
  }
};

export default BigHeader;
