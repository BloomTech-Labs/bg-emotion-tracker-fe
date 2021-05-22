import React from 'react';
import { useState, useRef } from 'react';
import { ChartByMember } from './ChartByMember';
import { ChartByActivity } from './ChartByActivity';

export default function ChartWidget({ setMode, mode }) {
  const [showAll, setShowAll] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const fromref = useRef();
  const toref = useRef();

  let chart = <div></div>;

  if (mode === 'members') {
    chart = (
      <ChartByMember
        mode={mode}
        showAll={showAll}
        setShowAll={setShowAll}
        dateRange={dateRange}
      />
    );
  } else {
    chart = (
      <ChartByActivity
        mode={mode}
        showAll={showAll}
        setShowAll={setShowAll}
        dateRange={dateRange}
      />
    );
  }

  return (
    <div style={{ margin: '1vh' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', marginTop: '1vh' }}>
          <label
            style={{
              marginLeft: '1vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Show All Emotions
            <input
              type="checkbox"
              style={{ width: '1.5vh', height: '1.5vh' }}
              checked={showAll}
              onChange={e => {
                setShowAll(e.target.checked);
              }}
            />
          </label>
        </div>
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
      {chart}
    </div>
  );
}
