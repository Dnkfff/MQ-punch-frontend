import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

// functions
import { renderCustomHeader } from './renderCustomHeader';

import 'react-datepicker/dist/react-datepicker.css';

const DoubleDateSelector = (props) => {
  const { className } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className={className}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        withPortal
        portalId='global-portal-datepicker'
        renderCustomHeader={renderCustomHeader}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        withPortal
        portalId='global-portal-datepicker'
        renderCustomHeader={renderCustomHeader}
      />
    </div>
  );
};

export default DoubleDateSelector;
