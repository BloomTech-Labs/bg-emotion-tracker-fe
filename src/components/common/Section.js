import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  height: ${props => props.height || '100%'};
`;
