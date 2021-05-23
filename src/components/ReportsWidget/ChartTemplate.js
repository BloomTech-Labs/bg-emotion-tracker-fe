import React from 'react';
import Plot from 'react-plotly.js';
import { barToPie } from './helpers';
import { DateRangeSelector } from './DateRangeSelector';
import { Typography } from 'antd';
import { SelectClub } from './SelectClub';
import { SelectMember } from './SelectMember';
import { ChartType } from './ChartType';
import styled from 'styled-components';
import { Section } from '../common';

const { Title } = Typography;
const StyledTemplate = styled.section`
  display: flex;
  flex-direction: column;
  color: red;
`;

export const ChartTemplate = ({
  dateRange,
  setDateRange,
  setSelectClub,
  setMember,
  selectedClub,
  clubSummary,
  member,
  plot,
  setChartType,
  plotRef,
  chartType,
  title,
}) => {
  return (
    <StyledTemplate>
      <Section>
        <Title level={2}>{title}</Title>
      </Section>
      <section>
        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
      </section>
      <section>
        <SelectClub
          setSelectClub={setSelectClub}
          setMember={setMember}
          selectedClub={selectedClub}
          clubSummary={clubSummary}
          label="Select Club"
        />
        <SelectMember setMember={setMember} member={member} plot={plot} />
      </section>
      <ChartType setChartType={setChartType} />
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ alignSelf: 'center' }}></h2>
          <div style={{ width: '50vh', alignSelf: 'center' }} ref={plotRef}>
            {console.log(plot)}
            {chartType == 1 ? (
              <Plot
                data={[barToPie(plot[member * 1])]}
                layout={{
                  autosize: true,
                  font: {
                    size: '20',
                  },
                  title: plot[member * 1]?.label,
                }}
              />
            ) : (
              <Plot
                data={[plot[member * 1]]}
                layout={{
                  autosize: true,
                  font: {
                    size: '20',
                  },
                  title: plot[member * 1]?.label,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </StyledTemplate>
  );
};
