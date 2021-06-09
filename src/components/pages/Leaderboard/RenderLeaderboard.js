import React, { useState } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import './Leaderboard.css';
import { Tabs } from 'antd';

const dummyData = [
  { clubname: 'Anderson', rating: 4.87 },
  { clubname: 'Caitlin', rating: 4.88 },
  { clubname: 'Grossman', rating: 4.89 },
  { clubname: 'Johnston', rating: 4.86 },
  { clubname: 'Marley', rating: 4.85 },
  { clubname: 'Morton', rating: 4.84 },
  { clubname: 'Notter', rating: 4.83 },
  { clubname: 'Stelle', rating: 4.82 },
  { clubname: 'Jefferson', rating: 4.81 },
];

function merge(left, right) {
  let arr = [];
  // Break out of loop if any one of the array gets empty
  while (left.length && right.length) {
    // Pick the smaller among the smallest element of left and right sub arrays
    if (left[0].rating < right[0].rating) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...arr, ...left, ...right];
}

function mergeSort(array) {
  const half = array.length / 2;

  // Base case or terminating case
  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

const sortedDummyData = mergeSort(dummyData).reverse();

for (var i = 0; i < sortedDummyData.length; i++) {
  sortedDummyData[i].id = i + 1;
}

const TabPane = Tabs;
function callback(key) {
  console.log(key);
}

function RenderLeaderboard(props) {
  const [toggle, setToggle] = useState(false);

  return (
    <LayoutContainer>
      <NavBar titleName={'Leaderboard'} backgroundColor="#293845" />
      <ul>
        <div className={`li-container gold`}>
          <li>
            <h2 className="place">{sortedDummyData[0].id}</h2>
            <h2 className="place">{sortedDummyData[0].clubname}</h2>
            <h2 className="rating">{sortedDummyData[0].rating}</h2>
          </li>
        </div>
        <div className={`li-container silver`}>
          <li>
            <h2 className="place">{sortedDummyData[1].id}</h2>
            <h2 className="place">{sortedDummyData[1].clubname}</h2>
            <h2 className="rating">{sortedDummyData[1].rating}</h2>
          </li>
        </div>
        <div className={`li-container bronze`}>
          <li>
            <h2 className="place">{sortedDummyData[2].id}</h2>
            <h2 className="place">{sortedDummyData[2].clubname}</h2>
            <h2 className="rating">{sortedDummyData[2].rating}</h2>
          </li>
        </div>
        <div className={`li-container`}>
          <li>
            <h2 className="place">{sortedDummyData[3].id}</h2>
            <h2 className="place">{sortedDummyData[3].clubname}</h2>
            <h2 className="rating">{sortedDummyData[3].rating}</h2>
          </li>
        </div>
        <div className={`li-container`}>
          <li>
            <h2 className="place">{sortedDummyData[4].id}</h2>
            <h2 className="place">{sortedDummyData[4].clubname}</h2>
            <h2 className="rating">{sortedDummyData[4].rating}</h2>
          </li>
        </div>
        <div className={`li-container`}>
          <li>
            <h2 className="place">{sortedDummyData[5].id}</h2>
            <h2 className="place">{sortedDummyData[5].clubname}</h2>
            <h2 className="rating">{sortedDummyData[5].rating}</h2>
          </li>
        </div>
        <div className={`li-container`}>
          <li>
            <h2 className="place">{sortedDummyData[6].id}</h2>
            <h2 className="place">{sortedDummyData[6].clubname}</h2>
            <h2 className="rating">{sortedDummyData[6].rating}</h2>
          </li>
        </div>
        <div className={`li-container`}>
          <li>
            <h2 className="place">{sortedDummyData[7].id}</h2>
            <h2 className="place">{sortedDummyData[7].clubname}</h2>
            <h2 className="rating">{sortedDummyData[7].rating}</h2>
          </li>
        </div>
        <div className={`li-container`}>
          <li>
            <h2 className="place">{sortedDummyData[8].id}</h2>
            <h2 className="place">{sortedDummyData[8].clubname}</h2>
            <h2 className="rating">{sortedDummyData[8].rating}</h2>
          </li>
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Highest Sentiment Last Week" key="1"></TabPane>
          <TabPane tab="Most Improved Since Last Mon" key="2"></TabPane>
        </Tabs>
      </ul>
    </LayoutContainer>
  );
}
export default RenderLeaderboard;
