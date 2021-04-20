import React from 'react';
import { PageHeader, Table } from 'antd';

export default function ViewList(props) {
  const { title, sortedBy, columns, members } = props;

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title={title}
        subTitle={`Sorted by ${sortedBy}`}
      />
      <Table
        columns={columns}
        dataSource={members}
        style={{ paddingLeft: 8 }}
        pagination={{ position: ['none', 'bottomRight'] }}
      />
    </div>
  );
}
