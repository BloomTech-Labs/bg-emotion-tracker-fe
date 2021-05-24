import React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { Section } from '../common';

const StyledSelector = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 10px;
  }
`;

export const DateRangeSelector = ({ dateRange, setDateRange }) => {
  const fromref = useRef();
  const toref = useRef();

  return (
    <StyledSelector>
      <Form>
        <Section>
          <Form.Item label="From">
            <Input type="date" id="fromdate" name="fromdate" ref={fromref} />
          </Form.Item>
          <Form.Item label="To" style={{ marginLeft: '20px' }}>
            <Input type="date" id="todate" name="todate" ref={toref} />
          </Form.Item>
          <Button
            type="primary"
            onClick={e => {
              setDateRange({
                from: fromref.current.value,
                to: toref.current.value,
              });
            }}
          >
            Set Date
          </Button>
        </Section>
      </Form>
    </StyledSelector>
  );
};
