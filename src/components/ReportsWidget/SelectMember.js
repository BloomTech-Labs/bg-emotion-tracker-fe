import React from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';
import { Section } from '../common';

const StyledSelector = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 20px;
`;

export const SelectMember = ({ setMember, member, plot }) => {
  return (
    <StyledSelector>
      <Form>
        <Section>
          <Form.Item label="Select Member">
            <Select
              onChange={value => {
                setMember(value);
              }}
              style={{ width: '200px' }}
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
