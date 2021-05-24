import React from 'react';
import { useState, useRef } from 'react';
import { ChartByMember } from './ChartByMember';
import { ChartByActivity } from './ChartByActivity';
import styled from 'styled-components';

const StyledWidget = styled.section``;

export default function ChartWidget({ setMode, mode }) {
  const [showAll, setShowAll] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const fromref = useRef();
  const toref = useRef();

  let chart = <div></div>;

  if (mode === 'members') {
    chart = (
      <ChartByMember
        mode={mode}
        showAll={showAll}
        setShowAll={setShowAll}
        dateRange={dateRange}
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
