import React from 'react';
import { DateRangeSelector } from './DateRangeSelector';
import { Typography } from 'antd';
import styled from 'styled-components';
import { Section } from '../common';

const { Title } = Typography;
const StyledTemplate = styled.section`
  display: flex;
  flex-direction: column;
  section:nth-child(1) {
    margin: 40px auto 0;
  }
`;

export const ChartTemplate = ({ dateRange, setDateRange, title, children }) => {
  return (
    <StyledTemplate>
      <Section>
        <Title level={2}>{title}</Title>
      </Section>
      <Section>
        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
      </Section>
      {children}
    </StyledTemplate>
  );
};
