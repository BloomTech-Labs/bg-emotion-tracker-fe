import React from 'react';

export const SelectMember = ({ setMember, member, plot }) => {
  return (
    <div>
      <label>
        Select Member
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setMember(e.target.value);
          }}
          value={member}
        >
          <option> </option>
          {plot.map((i, ind) => (
            <option value={ind} key={i + ind}>
              {i?.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
