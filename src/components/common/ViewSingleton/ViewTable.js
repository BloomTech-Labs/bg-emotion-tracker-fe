import React from 'react';
import { PageHeader, Table } from 'antd';
import styled from 'styled-components';

const StyledList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export default function ViewList(props) {
  const { title, sortedBy, columns, rows } = props;

  return (
    <StyledList>
      <PageHeader
        className="site-page-header"
        title={title}
        subTitle={`Sorted by ${sortedBy}`}
      />
      <Table
        columns={columns}
        dataSource={rows}
        style={{ paddingLeft: 8 }}
        pagination={{ position: ['none', 'bottomRight'] }}
      />
    </StyledList>
  );
}
