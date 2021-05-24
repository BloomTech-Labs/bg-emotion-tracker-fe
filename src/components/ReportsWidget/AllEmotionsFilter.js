import React from 'react';

export const AllEmotionsFilter = ({ showAll, setShowAll }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <label>Show All Emotions</label>
      <input
        type="checkbox"
        style={{
          width: '1.5vh',
          height: '1.5vh',
          marginLeft: '0.6vh',
          marginTop: '2px',
        }}
        checked={showAll}
        onChange={e => {
          setShowAll(e.target.checked);
        }}
      />
    </div>
  );
};
