import React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';

const StyledSelector = styled.div`
  display: flex;
  padding: 20px;
`;

export const DateRangeSelector = ({ dateRange, setDateRange }) => {
  const fromref = useRef();
  const toref = useRef();

  return (
    <StyledSelector>
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
    </StyledSelector>
  );
};
