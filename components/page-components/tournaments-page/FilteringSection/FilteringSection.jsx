import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import Input from '../../../form/Input/Input';
import DoubleDateSelector from '../../../form/DoubleDateSelector/DoubleDateSelector';
import MultiDropDown from '../../../form/MultiDropDown/MultiDropDown';

// functions
import { generateFilteringForm } from './helper';
import { setUpdatedFilteringForm } from '../../../../redux/reducers/tournaments/slice';

// constants
import {
  INPUT_TYPE,
  DOUBLE_DATE_SELECTOR_TYPE,
  DIVISION_SELECTOR_TYPE,
} from '../../../../inside-services/constants/form';
import { pageMatchEventStatus } from '../../../../inside-services/constants/events';
import { SELECT_DIVISION_ITEMS } from '../../../../inside-services/constants/rating';

// api
import EventsAPI from '../../../../api/events/events';

const FilteringSection = (props) => {
  const { currentPage } = props;
  const currentPageLabel = currentPage.label;
  const dispatch = useDispatch();
  const filteringForm = useSelector((state) =>
    state.tournaments[currentPageLabel] ? state.tournaments[currentPageLabel].form : null
  );
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
            <DoubleDateSelector
              className={'mq-punch-double-date-selector'}
              fromConfig={{
                value: null,
                placeholder: 'Start date',
                label: 'From:',
              }}
              toConfig={{ value: null, placeholder: 'End date', label: 'To:' }}
            />
          </div>
        );
        return;
      }

      if (element.type === DIVISION_SELECTOR_TYPE) {
        filteringFormContent.push(
          <div className='form-item'>
            <span className='form-item-caption'>{element.caption}</span>
            <div className='double-date-container'>
              <MultiDropDown
                items={SELECT_DIVISION_ITEMS}
                options={{
                  labelPosition: 'left',
                  width: '300px',
                  placeholder: 'select division',
                  type: DIVISION_SELECTOR_TYPE,
                }}
                selectedItems={[]}
                setSelectedItems={() => {}}
              />
            </div>
          </div>
        );
        return;
      }

      throw new Error(`${element.type} element type is incorrect`);
    });
  }

  return (
    <section className='filtering-section'>
      <div className='form-row'>{filteringFormContent}</div>
      <button className='filtering-section-button' onClick={triggerEventsSearch}>
        Search
      </button>
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

  function triggerEventsSearch() {
    const eventsAPI = new EventsAPI();

    eventsAPI.setPageParameters({
      status: pageMatchEventStatus[currentPageLabel],
      dateAfter: null,
      dateBefore: null,
      divisions: null,
    });
    eventsAPI.getEvents();
  }
};

export default FilteringSection;
