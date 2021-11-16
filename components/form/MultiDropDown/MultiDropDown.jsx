import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

// components
import PortalModal from '../../UI/PortalModal/PortalModal';
import SelectDivisionItems from './SelectDivisionItems/SelectDivisionItems';

// constants
import { DIVISION_SELECTOR_TYPE } from '../../../inside-services/constants/constants';

const PADDING_FROM_WINDOW_BORDER = 20;

const MultiDropDown = (props) => {
  const { items, setSelectedItems, selectedItems, options, className } = props;

  const [opened, setOpened] = useState({
    className: 'collapsed',
    isOpened: false,
  });
  const [position, setPosition] = useState({ top: '0px', left: '0px' });
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const nodeRef = useRef(options.labelText);
  const listRef = useRef(options.labelText + 'list');

  useEffect(() => {
    if (opened && nodeRef && nodeRef.current) {
      const htmlPosition = nodeRef.current.getBoundingClientRect();
      setPosition({
        top: `${htmlPosition.y + htmlPosition.height}px`,
        left: `${htmlPosition.x}px`,
      });
      setMaxWidth(Math.floor(window.innerWidth - htmlPosition.left - PADDING_FROM_WINDOW_BORDER));
      setMaxHeight(
        Math.floor(
          window.innerHeight - htmlPosition.top - htmlPosition.height - PADDING_FROM_WINDOW_BORDER
        )
      );
    }
  }, [opened]);

  useEffect(() => {
    if (opened.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [opened.isOpened, opened.isOpen]);

  const nodeClassName = 'cflow-multiselect-wrapper ' + className || '';
  const nodeStyle = options.width ? { width: options.width } : null;
  const somethingSelected = selectedItems && selectedItems.length !== 0;

  return (
    <div ref={nodeRef} className={nodeClassName} style={nodeStyle}>
      <div className='cflow-multiselect-toggle-btn'>
        {options.labelText && (
          <label className={'cflow-label big-label ' + options.labelPosition}>
            {options.labelText}
          </label>
        )}
        <button
          onClick={onMultiselectButtonToggle}
          className={cn('black-button', opened.className)}
        >
          <div className='cflow-multiselect-caption'>
            {somethingSelected && <p>{selectedItems.map((el) => el.label + ', ')}</p>}
            {!somethingSelected && <span className='placeholder'>{options.placeholder}</span>}
          </div>
          <div className='drop-down-arrow'>
            <i className='fas fa-caret-up' />
          </div>
        </button>
      </div>
      <PortalModal
        position={position}
        onOutsideRange={() => setOpened({ className: 'collapsed', isOpened: false })}
      >
        <div
          className={
            `cflow-multiselect-options-wrapper ${options.itemsClassName || 'left'} ` +
            opened.className
          }
          style={{
            maxWidth: `${maxWidth}px`,
            maxHeight: `${maxHeight}px`,
          }}
        >
          <ul
            className='cflow-multiselect-opt'
            style={{
              border: 'none',
              maxWidth: `${maxWidth}px`,
              maxHeight: `${maxHeight}px`,
            }}
            ref={listRef}
          >
            {options.type === DIVISION_SELECTOR_TYPE && (
              <SelectDivisionItems
                items={items}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            )}
          </ul>
        </div>
      </PortalModal>
    </div>
  );

  function handleClickOutside(event) {
    if (listRef.current.contains(event.target)) {
      return;
    } else {
      setOpened({ className: 'collapsed', isOpen: false });
    }
  }

  function onMultiselectButtonToggle() {
    const newOpened = {
      isOpen: !opened.isOpen,
      className: opened.isOpen ? 'collapsed' : 'opened',
    };

    setOpened(newOpened);
  }
};

export default MultiDropDown;
