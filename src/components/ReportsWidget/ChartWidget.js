import React from 'react';
import { useState, useRef } from 'react';
import { ChartByMember } from './ChartByMember';
import { ChartByActivity } from './ChartByActivity';
import { DateRangeSelector } from './DateRangeSelector';

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
        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
        {/* <div style={{ display: 'flex', marginTop: '1vh' }}>
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
          </div> */}
      </div>
      {chart}
    </div>
  );
}
