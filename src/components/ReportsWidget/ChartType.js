import React from 'react';

export const ChartType = ({ setChartType }) => {
  return (
    <div style={{ alignSelf: 'flex-start' }}>
      <label style={{ padding: '1vh' }}>
        Chart Type
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setChartType(e.target.value);
          }}
        >
          <option value={0}> Bar </option>
          <option value={1}> Pie </option>
        </select>
      </label>
    </div>
  );
};
