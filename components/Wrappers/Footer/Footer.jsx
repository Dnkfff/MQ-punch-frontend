import React from 'react';
import Link from 'next/link';

// assets
import bigLogo from '../../../assets/website/mq-rect-punch-logo-black.png';

const Footer = () => {
  return (
    <footer className='global-footer'>
      <nav className='links'>
        <Link href='/terms'>
          <span>Terms Of Service</span>
        </Link>
        <Link href='/privacy'>
          <span>Privacy Policy</span>
        </Link>
      </nav>
      <div className='logo'>
        <img src={bigLogo.src} alt='logo' />
      </div>
      <div className='media'>
        <div className='media-item'>
          <i class='fab fa-facebook'></i>
        </div>

        <div className='media-item'>
          <i class='fab fa-telegram'></i>
        </div>

        <div className='media-item'>
          <i class='fab fa-instagram'></i>
        </div>

        <div className='media-item'>
          <i class='fab fa-twitter'></i>
        </div>
        <div className='media-item'>
          <i class='fab fa-discord'></i>
        </div>
      </div>
      <div className='date'>
        <span>© 2021</span>
      </div>
    </footer>
  );
};

export default Footer;
