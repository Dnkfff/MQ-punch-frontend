import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import Input from '../../../form/Input/Input';
import DoubleDateSelector from '../../../form/DoubleDateSelector/DoubleDateSelector';

// functions
import { generateFilteringForm } from './helper';
import { setUpdatedFilteringForm } from '../../../../redux/reducers/tournaments/slice';

// constants
import {
  INPUT_TYPE,
  DOUBLE_DATE_SELECTOR_TYPE,
} from '../../../../inside-services/constants/constants';

const FilteringSection = (props) => {
  const { currentPage } = props;
  const currentPageLabel = currentPage.label;
  const dispatch = useDispatch();
  const filteringForm = useSelector((state) => state.tournaments[currentPageLabel]);
  if (!filteringForm && currentPage.filtering) {
    dispatch(
      setUpdatedFilteringForm({
        updatedFilteringForm: generateFilteringForm(currentPage.filtering),
        page: currentPageLabel,
      })
    );
  }

  const setFilteringForm = (value) => {
    if (typeof value === 'function') {
      const updatedFilteringForm = value(filteringForm);
      return dispatch(setUpdatedFilteringForm({ updatedFilteringForm, page: currentPageLabel }));
    }

    if (typeof value === 'object') {
      const updatedFilteringForm = value;
      return dispatch(setUpdatedFilteringForm({ updatedFilteringForm, page: currentPageLabel }));
    }
  };

  const filteringFormContent = [];
  if (filteringForm) {
    Object.keys(filteringForm).forEach((key) => {
      const element = filteringForm[key];

      if (element.type === INPUT_TYPE) {
        filteringFormContent.push(
          <div className='form-item'>
            <span className='form-item-caption'>{element.caption}</span>
            <div className='input-container'>
              <Input
                types={['primary']}
                inputType={element.inputType}
                placeholder={element.placeholder}
                value={element.value}
                onChange={(event) => onChangeFilteringSectionInputValue(event, element)}
              />
            </div>
          </div>
        );
        return;
      }

      if (element.type === DOUBLE_DATE_SELECTOR_TYPE) {
        filteringFormContent.push(
          <div className='form-item'>
            <span className='form-item-caption'>{element.caption}</span>
            <div className='double-date-container'>
              <DoubleDateSelector />
            </div>
          </div>
        );
        return;
      }

      filteringFormContent.push(null);
    });
  }

  return (
    <section className='filtering-section'>
      <div className='form-row'>{filteringFormContent}</div>
    </section>
  );

  function onChangeFilteringSectionInputValue(event, element) {
    const newValue = element.formatFunc({
      oldValue: filteringForm[element.field].value,
      newValue: event.target.value,
    });
    setFilteringForm({
      ...filteringForm,
      [element.field]: {
        ...filteringForm[element.field],
        value: newValue,
      },
    });
  }
};

export default FilteringSection;
