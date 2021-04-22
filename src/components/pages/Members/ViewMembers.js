import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportMembers } from './ImportMember';
// Mock data for member pull for backend
const mockData = {
  rows: [
    { member_id: 'URdYPfyMXs' },
    { member_id: '5o0YOuLRPT' },
    { member_id: 'GVyH4N1yPM' },
    { member_id: 'mibuMWdKN2' },
    { member_id: '179i8E7Nrg' },
    { member_id: 'mpl8tmi8SW' },
    { member_id: '4CZxXZrP2L' },
    { member_id: 'fhI1oatLsR' },
    { member_id: 'URdYPfyMXs' },
    { member_id: '5o0YOuLRPT' },
    { member_id: 'GVyH4N1yPM' },
    { member_id: 'mibuMWdKN2' },
    { member_id: '179i8E7Nrg' },
    { member_id: 'mpl8tmi8SW' },
    { member_id: '4CZxXZrP2L' },
    { member_id: 'fhI1oatLsR' },
    { member_id: 'URdYPfyMXs' },
    { member_id: '5o0YOuLRPT' },
    { member_id: 'GVyH4N1yPM' },
    { member_id: 'mibuMWdKN2' },
    { member_id: '179i8E7Nrg' },
    { member_id: 'mpl8tmi8SW' },
    { member_id: '4CZxXZrP2L' },
    { member_id: 'fhI1oatLsR' },
    { member_id: 'URdYPfyMXs' },
    { member_id: '5o0YOuLRPT' },
    { member_id: 'GVyH4N1yPM' },
    { member_id: 'mibuMWdKN2' },
    { member_id: '179i8E7Nrg' },
    { member_id: 'mpl8tmi8SW' },
    { member_id: '4CZxXZrP2L' },
    { member_id: 'fhI1oatLsR' },
    { member_id: 'URdYPfyMXs' },
    { member_id: '5o0YOuLRPT' },
    { member_id: 'GVyH4N1yPM' },
    { member_id: 'mibuMWdKN2' },
    { member_id: '179i8E7Nrg' },
    { member_id: 'mpl8tmi8SW' },
    { member_id: '4CZxXZrP2L' },
    { member_id: 'fhI1oatLsR' },
  ],
  columns: [
    {
      title: 'Member ID',
      dataIndex: 'member_id',
      render: text => <p>{text}</p>,
    },
  ],
};
function ViewMembers(props) {
  return (
    <ViewSingleton
      headerName="Manage Members"
      titleName="All Members"
      RenderAddButton={ImportMembers}
      rows={mockData.rows}
      columns={mockData.columns}
    />
  );
}
export default ViewMembers;
