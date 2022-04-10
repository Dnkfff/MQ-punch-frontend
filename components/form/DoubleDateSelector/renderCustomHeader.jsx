import React from 'react';
import moment from 'moment';

// constants
import { START_PERIOD_YEAR, YEARS_RANGE, MONTHS } from 'services/constants/constants';

export const renderCustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const years = Array.from(new Array(YEARS_RANGE), (_, i) => START_PERIOD_YEAR + i);
  const months = MONTHS;

  return (
    <div
      style={{
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
      }}
      className='global-portal-datepicker-header'
    >
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {'<'}
      </button>
      <select
        value={moment(date).get('year')}
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={months[moment(date).get('month')]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {'>'}
      </button>
    </div>
  );
};
