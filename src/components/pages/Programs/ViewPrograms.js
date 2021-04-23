import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportPrograms } from './ImportPrograms';
const mockData = {
  rows: [
    {
      staff_id: 'ST5o0YOuLRPT',
      staff_name: 'bob the builder',
      staff_role: 'YDA',
    },
    {
      staff_id: 'STURdYPfyMXs',
      staff_name: 'bob the builder',
      staff_role: 'YDA',
    },
    {
      staff_id: 'STGVyH4N1yPM',
      staff_name: 'bob the builder',
      staff_role: 'YDA',
    },
    {
      staff_id: 'STmibuMWdKN2',
      staff_name: 'bob the builder',
      staff_role: 'YDA',
    },
    {
      staff_id: 'ST179i8E7Nrg',
      staff_name: 'bob the builder',
      staff_role: 'YDA',
    },
    {
      staff_id: 'STmpl8tmi8SW',
      staff_name: 'bob the builder',
      staff_role: 'YDA',
    },
    {
      staff_id: 'ST4CZxXZrP2L',
      staff_name: 'bob the builder',
      staff_role: 'YDA',
    },
    {
      staff_id: 'STfhI1oatLsR',
      staff_name: 'bob the builder',
      staff_role: 'YDA',
    },
  ],
  columns: [
    {
      title: 'ID',
      dataIndex: 'staff_id',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Name',
      dataIndex: 'staff_name',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Role',
      dataIndex: 'staff_role',
      render: text => <p>{text}</p>,
    },
  ],
};
function ViewPrograms(props) {
  const { rows, columns } = mockData;
  return (
    <ViewSingleton
      headerName="Manage Programs"
      titleName="All Programs"
      rows={rows}
      columns={columns}
      RenderAddButton={ImportPrograms}
      sortedBy="Name"
    />
  );
}
export default ViewPrograms;
