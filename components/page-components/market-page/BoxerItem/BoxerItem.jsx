import puncherBayExample from '../../../../assets/website/chel.jpeg';
import React from 'react';

const BoxerItem = () => (
  <div className='market__item'>

    <div className={'puncher__icons'}>

    </div>

    <div className='puncher__photo'>
      <img src={puncherBayExample.src} alt='no_photo' className='' />
    </div>


    <div className='puncher__name'>
      <div className='puncher__nick'>Up&cumming Rapper</div>
    </div>

    <div className={'div-hr'} />

    <div className='puncher__info'>
      <div className={'puncher__weight__div'}>
        <div className={'puncher__weight'}>
          HEAVYWEIGHT
        </div>
      </div>
      <div className='puncher__footer'>
        <div className='puncher__price__value'>3 ETH</div>
        <div className='puncher__buy'>
          <button className='market__bay__btn' type='button'>
            BUY
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default BoxerItem;