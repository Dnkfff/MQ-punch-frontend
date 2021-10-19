import React, { useState } from 'react';
import cn from 'classnames';

// components
import MqPunchCard from './components/MQPunchCard';
import MetamaskCard from './components/MetamaskCard';

const Balance = ({ data }) => {
  const [mode, setMode] = useState(null);

  return (
    <div className='balance-content'>
      <div className='balance-content-header'>
        <div className='close-button' onClick={data.onClose}>
          <i className='fas fa-times' />
        </div>
        <div className='settings-buttons'>
          <button className='settings' onClick={() => setMode(null)}>
            <i className='far fa-sliders-v' />
          </button>
          {/* URL TO OUR DOCS */}
          <a className='info' target='_blank' href='https://github.com/'>
            <i className='far fa-info-circle' />
          </a>
        </div>

        <div className='transfer-block'>
          <MqPunchCard />
          <div className='actions-area'>
            <button
              className={cn('withdraw', { active: mode === 'withdraw' })}
              onClick={() => setMode('withdraw')}
            >
              WITHDRAW
            </button>
            <div className='transfer-icon'>
              <i className='fad fa-exchange' />
            </div>
            <button
              className={cn('deposit', { active: mode === 'deposit' })}
              onClick={() => setMode('deposit')}
            >
              DEPOSIT
            </button>
            <span className='beta'>deposit by currency (Beta)</span>
          </div>
          <MetamaskCard />
        </div>
      </div>
      <div className='balance-content-body'>
        {mode === null && (
          <div className='settings'>
            <h3 className='history-screen-label'>MQ-Punch balance history</h3>
            <div className='history-list'>
              <div className='history-list-item'>
                <div className='left'>
                  <span className=''>deposit:</span>
                  <span className='status'>successful</span>
                </div>
                <div className='right'>
                  <span className='date'>15:12 May 17, 2021</span>
                  <span className='amount'>+ $50.50</span>
                </div>
              </div>
              <div className='history-list-item'>-500$</div>
            </div>
          </div>
        )}
        {mode === 'deposit' && (
          <div className='transfer-content'>
            <div className='transfer-main-area'>
              <div className='input-label'>
                <span>Enter an amount to deposit</span>
                <span className='current-balance'>
                  ( You have: <b>0.0000 ETH</b> )
                </span>
              </div>
              <div className='inputs'>
                <div className='input-item'>
                  <input />
                  <span>ETH</span>
                </div>
                <span>~</span>
                <div className='input-item'>
                  <input disabled />
                  <span className='transparent'>USD</span>
                </div>
              </div>
              <span className='warning'>
                <i className='far fa-question-circle' />
                Deposit transactions can take up to 5 minutes to confirm.
              </span>
            </div>
            <button className='transfer-button'>Deposit to MQPunch Balance</button>
          </div>
        )}
        {mode === 'withdraw' && (
          <div className='transfer-content'>
            <div className='transfer-main-area'>
              <div className='input-label'>
                <span>Enter an amount to withdraw</span>
                <span className='current-balance'>
                  ( You have: <b>0.0000 ETH</b> )
                </span>
              </div>
              <div className='inputs'>
                <div className='input-item'>
                  <input />
                  <span>ETH</span>
                </div>
                <span>~</span>
                <div className='input-item'>
                  <input disabled />
                  <span className='transparent'>USD</span>
                </div>
              </div>
              <span className='warning'>
                <i className='far fa-question-circle' />
                Withdrawal transactions can take up to 3 hours to confirm.
              </span>
            </div>
            <button className='transfer-button'>Withdraw to Metamask wallet</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
