import React from 'react';

export const SelectClub = ({
  setSelectClub,
  selectedClub,
  clubSummary,
  label,
}) => {
  return (
    <div>
      <label>
        {label}
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setSelectClub(e.target.value);
          }}
          value={selectedClub}
        >
          <option> </option>
          {clubSummary.map((i, ind) => (
            <option value={i.clubid} key={i + ind}>
              {i.clubname.replace(/^\w/, c => c.toUpperCase())}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
