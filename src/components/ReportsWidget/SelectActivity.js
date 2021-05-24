import React from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';
import { Section } from '../common';

const StyledSelector = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 20px;
`;

export const SelectActivity = ({
  clubActivity,
  setClubActivity,
  plot,
  setChartType,
  plotRef,
  barToPie,
  chartType,
  Plot,
}) => {
  return (
    <StyledSelector>
      <Form>
        <Section>
          <Form.Item label="Select Activity">
            <Select
              value={clubActivity}
              onChange={value => {
                setClubActivity(value);
              }}
              style={{ width: '160px' }}
            >
              {plot.map((i, ind) => (
                <Select.Option value={ind} key={i + ind}>
                  {i?.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Section>
      </Form>
    </StyledSelector>
  );
};
