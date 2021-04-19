import React from 'react';
import PropTypes from 'prop-types';

const View = props => (
  <div>
    {props.data.map(item => (
      <figure key={item.id}>
        <p>{item.member_id}</p>
      </figure>
    ))}
  </div>
);

export default View;

View.propTypes = {
  data: PropTypes.arrayOf(
    // Here is an example of enforcing an object structure that we expect to receive in our props:
    PropTypes.shape({
      // Here we require an id of type number or string to prevent a "unique key prop" warning
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      //all other fields that may be present
      member_id: PropTypes.string,
    })
  ).isRequired,
};
