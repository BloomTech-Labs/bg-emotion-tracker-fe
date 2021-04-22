import React from 'react';
import { PageHeader, Table } from 'antd';
import styled from 'styled-components';

const StyledList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const StyledView = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default function ViewList(props) {
  const { title, sortedBy, columns, rows, RenderAddButton } = props;

  return (
    <StyledList>
      <StyledView>
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={`Sorted by ${sortedBy}`}
        />
        <RenderAddButton />
      </StyledView>
      <Table
        columns={columns}
        dataSource={rows}
        style={{ paddingLeft: 8 }}
        pagination={{ position: ['none', 'bottomRight'] }}
      />
    </StyledList>
  );
}
