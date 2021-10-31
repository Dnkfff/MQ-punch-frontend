import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// functions
import { generateFilteringForm } from './helper';
import { setUpdatedFilteringForm } from '../../../../redux/reducers/tournaments/slice';

const FilteringSection = (props) => {
  const { currentPage } = props;
  const currentPageLabel = currentPage.label;
  const dispatch = useDispatch();
  const filteringForm = useSelector((state) => state.tournaments[currentPageLabel]);
  if (!filteringForm) {
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

      filteringFormContent.push(<span key={element.id}>{element.placeholder}</span>);
    });
  }

  return <section className='filtering-section'>{filteringFormContent}</section>;
};

export default FilteringSection;
