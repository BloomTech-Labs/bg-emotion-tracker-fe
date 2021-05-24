import React from 'react';

export const AllEmotionsFilter = ({ showAll, setShowAll }) => {
  return (
    <div
      style={{ display: 'flex', marginTop: '0.2em', alignSelf: 'flex-start' }}
    >
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
          style={{ width: '1.5vh', height: '1.5vh', marginLeft: '0.6vh' }}
          checked={showAll}
          onChange={e => {
            setShowAll(e.target.checked);
          }}
        />
      </label>
    </div>
  );
};
