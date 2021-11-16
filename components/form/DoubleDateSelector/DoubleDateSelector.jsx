import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

// functions
import { renderCustomHeader } from './renderCustomHeader';

import 'react-datepicker/dist/react-datepicker.css';

const DoubleDateSelector = (props) => {
  const { className, fromConfig, toConfig } = props;
  const [startDate, setStartDate] = useState(fromConfig.value);
  const [endDate, setEndDate] = useState(toConfig.value);

  return (
    <div className={className}>
      <div>
        <span>{fromConfig.label}</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          withPortal
          portalId='global-portal-datepicker'
          renderCustomHeader={renderCustomHeader}
          placeholderText={fromConfig.placeholder}
        />
      </div>
      <div>
        <span>{toConfig.label}</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          withPortal
          portalId='global-portal-datepicker'
          renderCustomHeader={renderCustomHeader}
          placeholderText={toConfig.placeholder}
        />
      </div>
    </div>
  );
};

export default DoubleDateSelector;
