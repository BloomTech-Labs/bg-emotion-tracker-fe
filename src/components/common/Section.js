import React from 'react';
import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
<<<<<<< Updated upstream
  flex-direction: ${props => props.direction};
=======
  flex-direction: ${props => (props.column ? 'column' : 'row')};
>>>>>>> Stashed changes
`;
