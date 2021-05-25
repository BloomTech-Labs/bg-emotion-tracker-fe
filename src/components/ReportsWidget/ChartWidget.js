import React from 'react';
import { useState, useRef } from 'react';
import { ChartByMember } from './ChartByMember';
import { ChartByActivity } from './ChartByActivity';
import styled from 'styled-components';

const StyledWidget = styled.section``;

export default function ChartWidget({ setMode, mode, setDateRange }) {
  const [showAll, setShowAll] = useState(false);
  const [dateRange] = useState({ from: '', to: '' });

  let chart = <div></div>;

  if (mode === 'members') {
    chart = (
      <ChartByMember
        mode={mode}
        showAll={showAll}
        setShowAll={setShowAll}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    );
  } else {
    chart = (
      <ChartByActivity
        mode={mode}
        showAll={showAll}
        setShowAll={setShowAll}
        dateRange={dateRange}
      />
    );
  }

  return <StyledWidget>{chart}</StyledWidget>;
}
