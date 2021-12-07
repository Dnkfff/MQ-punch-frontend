import React from 'react';

const SelectDivisionItems = ({ items, setSelectedItems, selectedItems }) => {
  return (
    <>
      <li
        onClick={cancelAll}
        className='cancel'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        Відмінити вибір
      </li>
      <li
        onClick={chooseAll}
        className='choose-all'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        Обрати всі
      </li>
      {items.map((el) => {
        const handler = () => onChangeItemSelectedState(el);
        const cN =
          selectedItems && selectedItems.find((selectedItem) => selectedItem.id === el.id)
            ? 'selected'
            : '';

        return (
          <li key={el.id} onClick={handler} className={cN}>
            <input
              type='checkbox'
              checked={
                selectedItems && selectedItems.find((selectedItem) => selectedItem.id === el.id)
              }
            />
            {el.secondLabel && <span className='second-label'>{el.secondLabel}</span>}
            <span className='first-label'>{el.label}</span>
          </li>
        );
      })}
    </>
  );

  function onChangeItemSelectedState(item) {
    if (selectedItems && selectedItems.find((el) => el.id === item.id)) {
      return setSelectedItems([...selectedItems].filter((el) => el.id !== item.id));
    }

    setSelectedItems(selectedItems ? [...selectedItems].concat([item]) : [item]);
  }

  function cancelAll() {
    setSelectedItems(null);
  }

  function chooseAll() {
    setSelectedItems([...items]);
  }
};

export default SelectDivisionItems;
