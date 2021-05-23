import React from 'react';

export const SelectActivity = ({
  clubActivity,
  setClubActivity,
  plot,
  setChartType,
  plotRef,
  barToPie,
  chartType,
  Plot,
}) => {
  return (
    <div>
      <label>
        Select Activity
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          value={clubActivity}
          onChange={e => {
            setClubActivity(e.target.value);
          }}
        >
          <option> </option>

          {plot.map((i, ind) => (
            <option value={ind} key={i + ind}>
              {i?.label}
            </option>
          ))}
        </select>
      </label>
      <label>
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

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ alignSelf: 'center' }}></h2>
          <div style={{ width: '50vh', alignSelf: 'center' }} ref={plotRef}>
            {console.log(plot)}
            {chartType == 1 ? (
              <Plot
                data={[barToPie(plot[clubActivity * 1])]}
                layout={{
                  autosize: true,
                  font: {
                    size: '20',
                  },
                  title: plot[clubActivity * 1]?.label,
                }}
              />
            ) : (
              <Plot
                data={[plot[clubActivity * 1]]}
                layout={{
                  autosize: true,
                  font: {
                    size: '20',
                  },
                  title: plot[clubActivity * 1]?.label,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
