import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux';

import Modal from '../../UI/Modal/Modal';
import BigHeaderMenuLinks from '../BigHeaderMenuLinks/BigHeaderMenuLinks';

import { getUUID } from '../../../inside-services/get-uuid/get-uuid';
import { changeHeaderHeight } from '../../../redux/reducers/GlobalManager/slice';

import mainBigLogoPath from '../../../assets/website/mq-rect-punch-logo-white.png';
import boxingRingPict from '../../../assets/website/boxing-ring.png';

const BigHeader = (props) => {
  const { header_height } = props;
  const dispatch = useDispatch();
  const headerRef = useRef(getUUID());

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (header_height === 0) {
      dispatch(changeHeaderHeight(headerRef.current.clientHeight));
    }

    window.onresize = () => {
      if (headerRef.current.clientHeight !== header_height) {
        dispatch(changeHeaderHeight(headerRef.current.clientHeight));
      }
    };
  }, []);

  return (
    <>
      <Modal data={modalData} />
      <header className='app-container-big-header' ref={headerRef}>
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

const mapStateToProps = (state) => ({
  header_height: state.global_manager.header_height,
});

export default connect(mapStateToProps)(BigHeader);
