import React from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';
import { Section } from '../common';

const StyledSelector = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 10px;
  }
`;

export const SelectClub = ({
  setSelectClub,
  selectedClub,
  clubSummary,
  label,
}) => {
  return (
    <StyledSelector>
      <Form>
        <Section>
          <Form.Item label={label}>
            <Select
              onChange={value => {
                setSelectClub(value);
              }}
              style={{ width: '200px' }}
            >
              {clubSummary &&
                clubSummary.map((i, ind) => (
                  <Select.Option value={i.clubid} key={i + ind}>
                    {i.clubname.replace(/^\w/, c => c.toUpperCase())}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Section>
      </Form>
    </StyledSelector>
  );
};
