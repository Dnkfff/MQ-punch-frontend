import React, { useState } from 'react';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';

// components
import MqPunchCard from './components/MQPunchCard';
import MetamaskCard from './components/MetamaskCard';

interface IBalance {
  data: {
    onClose: () => void;
  };
}

const Balance: React.FC<IBalance> = ({ data }) => {
  const [mode, setMode] = useState<'withdraw' | 'deposit' | null>(null);

  return (
    <>
      <div className='balance-content-header'>
        <div className='close-button' onClick={data.onClose}>
          <i className='fas fa-times' />
        </div>
        <div className='settings-buttons'>
          <button className='settings' onClick={() => setMode(null)} data-tip data-for='historyTip'>
            <i className='far fa-sliders-v' />
          </button>
          <ReactTooltip id='historyTip' place='top' effect='solid' type='light'>
            Balance history
          </ReactTooltip>
          {/* URL TO OUR DOCS */}
          <a
            className='info'
            target='_blank'
            href='https://github.com/'
            data-tip
            data-for='infoTip'
          >
            <i className='far fa-info-circle' />
          </a>
          <ReactTooltip id='infoTip' place='top' effect='solid' type='light'>
            Help
          </ReactTooltip>
        </div>

        <div className='transfer-block'>
          <div className='row'>
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
          <div className='actions-area-small'>
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
          </div>
          <span className='beta-small'>deposit by currency (Beta)</span>
        </div>
      </div>
      <div className='balance-content-body'>
        {mode === null && (
          <div className='settings'>
            <h3 className='history-screen-label'>MQ-Punch balance history</h3>
            <div className='history-list'>
              <div className={cn('history-list-item', 'deposit')}>
                <div className='left'>
                  <span className='operation-type'>deposit</span>
                  <span className='status'>successful</span>
                </div>
                <div className='right'>
                  <span className='date'>15:12 May 17, 2021</span>
                  <span className='amount'>+ $50.50</span>
                </div>
              </div>
              <div className={cn('history-list-item', 'withdraw')}>
                <div className='left'>
                  <span className='operation-type'>withdraw</span>
                  <span className='status'>successful</span>
                </div>
                <div className='right'>
                  <span className='date'>17:38 May 18, 2021</span>
                  <span className='amount'>- $150.50</span>
                </div>
              </div>
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
    </>
  );
};

export default Balance;
