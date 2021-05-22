import React from 'react';
import { useRef } from 'react';

export const DateRangeSelector = ({ dateRange, setDateRange }) => {
  const fromref = useRef();
  const toref = useRef();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', marginTop: '1vh' }}>
        <label
          style={{
            marginLeft: '1vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          From ‎
          <input type="date" id="fromdate" name="fromdate" ref={fromref} />
        </label>
        <label
          style={{
            marginLeft: '1vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          To ‎
          <input type="date" id="todate" name="todate" ref={toref} />
        </label>
        <button
          style={{ marginLeft: '1vh' }}
          onClick={e => {
            setDateRange({
              from: fromref.current.value,
              to: toref.current.value,
            });
          }}
        >
          {' '}
          Set Date{' '}
        </button>
      </div>
    </div>
  );
};
