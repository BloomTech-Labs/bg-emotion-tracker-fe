import React from 'react';
import { DateRangeSelector } from './DateRangeSelector';
import styled from 'styled-components';
import { Section } from '../common';
import { Title } from './Title';

const StyledTemplate = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ChartTemplate = ({ dateRange, setDateRange, title, children }) => {
  return (
    <StyledTemplate>
      <Section>
        <Title>{title}</Title>
      </Section>
      <Section>
        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
      </Section>
      {children}
    </StyledTemplate>
  );
};
