import React, { useContext, useEffect, useState } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import './Alerts.css';
import { Layout, Card, Table, Pagination, Button } from 'antd';
import NavMenu from '../../common/NavMenu';
import { AdminContext } from '../../../state/contexts';
import { getMembersReaction } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import '../../../styles/styles.css';
import { useHistory } from 'react-router';

const { Content, Sider } = Layout;

// Columns for Ant Design Table code below
// const columns = [
//   {
//     key: 1,
//     title: 'Club Name',
//     className: 'tddata',
//     dataIndex: 'clubname',
//   },
//   {
//     key: 2,
//     title: 'Emoji',
//     className: 'emoji',
//     dataIndex: 'reactionvalue',
//     render: text => <>{String.fromCodePoint(parseInt(text, 16))}</>,
//   },
//   {
//     key: 3,
//     title: 'MemberID',
//     className: 'tddata',
//     dataIndex: 'member',
//   },
//   {
//     key: 4,
//     title: 'Activity',
//     className: 'tddata',
//     dataIndex: 'activities',
//   },
//   {
//     key: 5,
//     title: 'Created',
//     className: 'tddata',
//     dataIndex: 'createddate',
//     render: text => <>{text.slice(11, 16)}</>,
//   },
//   {
//     key: 6,
//     title: 'Elapsed',
//     className: 'tddata',
//     dataIndex: 'createddate',
//   },
// ];

function ElapsedTime(createddate) {
  const dateNow = new Date();
  const startDate = new Date(createddate);
  let diffInMilliSeconds = Math.abs(startDate - dateNow) / 60000;

  return Math.floor(diffInMilliSeconds);
}

function RenderAlerts() {
  const context = useContext(AdminContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Start Coding for pagination
  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(context.memberReactions.length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const handleClick = e => {
    setCurrentPage(Number(e.target.id));
  };

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handlePrevButton}> &hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageDecrementBtn = <li onClick={handleNextButton}> &hellip;</li>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = context.memberReactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const renderPageNumbers = pages.map(number => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? 'active' : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  // End Coding for pagination

  const history = useHistory();

  useEffect(() => {
    if (context.memberReactions.length === 0) {
      getMembersReaction('authState', context);
    }
  }, []);

  return (
    <LayoutContainer>
      <NavBar titleName={'Alerts'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          {/* start Ant design table code left in because the design looks better, but couldn't get the rows to change color based on elapsed time, as in the regular table below */}
          {/* <div className='alerts-table-div'>
            <Table
              loading={LoadingComponent}
              dataSource={context.memberReactions}
              columns={columns}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    history.push(`/allReactions/${record.clubname}`);
                  }, // click row
                  // onDoubleClick: event => {}, // double click row
                  // onContextMenu: event => {}, // right button click row
                  // onMouseEnter: event => {}, // mouse enter row
                  // onMouseLeave: event => {}, // mouse leave row
                };
              }}
            >
            </Table>
          </div> */}
          {/* end ant-design code for a table */}
          <Card>
            {context.memberReactions.length === 0 ? (
              <div className="centered-content flex">
                <LoadingComponent message="loading" />
              </div>
            ) : (
              <table>
                <thead>
                  <tr className="trclass">
                    <th>Club Name</th>
                    <th>Emoji</th>
                    <th>MemberID</th>
                    <th>Activity</th>
                    <th>Created</th>
                    <th>Elapsed</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(alert => (
                    <tr
                      className={
                        ElapsedTime(alert.createddate) > 0 &&
                        ElapsedTime(alert.createddate) < 30
                          ? 'tddata'
                          : ElapsedTime(alert.createddate) >= 30 &&
                            ElapsedTime(alert.createddate) < 60
                          ? 'tddataorangealert'
                          : 'tddataredalert'
                      }
                    >
                      <td className="tddata">{alert.clubname}</td>
                      <td className="emoji">
                        {String.fromCodePoint(
                          parseInt(alert.reactionvalue, 16)
                        )}
                      </td>
                      <td className="tddata">{alert.member}</td>
                      <td className="tddata">{alert.activities}</td>
                      <td className="tddata">
                        {alert.createddate.slice(11, 16)}
                      </td>
                      <td className="tddata">
                        {ElapsedTime(alert.createddate)} Minutes
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <br />

            <ul className="pageNumbers">
              <li>
                <Button
                  onClick={handlePrevButton}
                  disabled={currentPage == pages[0] ? true : false}
                >
                  &lt; Prev
                </Button>
              </li>
              {pageIncrementBtn}
              {renderPageNumbers}
              {pageDecrementBtn}
              <li>
                <Button
                  onClick={handleNextButton}
                  disabled={
                    currentPage == pages[pages.length - 1] ? true : false
                  }
                >
                  Next &gt;
                </Button>
              </li>
            </ul>
          </Card>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderAlerts;
