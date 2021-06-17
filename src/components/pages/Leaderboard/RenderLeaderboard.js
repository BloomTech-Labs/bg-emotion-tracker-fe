import React, { useState, useEffect } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import './Leaderboard.css';
import axios from 'axios';
import Tabs from '../../common/Tabs';

const prevDummyData = [
  { clubname: 'Anderson', rating: 4.84 },
  { clubname: 'Caitlin', rating: 4.85 },
  { clubname: 'Grossman', rating: 4.86 },
  { clubname: 'Johnston', rating: 4.89 },
  { clubname: 'Marley', rating: 4.87 },
  { clubname: 'Morton', rating: 4.83 },
  { clubname: 'Notter', rating: 4.82 },
  { clubname: 'Stelle', rating: 4.81 },
  { clubname: 'Jefferson', rating: 4.88 },
];

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

const dummyImprovedData = [
  { clubname: 'Anderson', rating: 0.7 },
  { clubname: 'Caitlin', rating: 0.6 },
  { clubname: 'Grossman', rating: 0.5 },
  { clubname: 'Johnston', rating: 0.4 },
  { clubname: 'Marley', rating: 0.3 },
  { clubname: 'Morton', rating: 0.2 },
  { clubname: 'Notter', rating: 0.1 },
  { clubname: 'Stelle', rating: 0.0 },
  { clubname: 'Jefferson', rating: -0.1 },
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

const sortedDummyImprovedData = mergeSort(dummyImprovedData).reverse();

for (var k = 0; k < sortedDummyImprovedData.length; k++) {
  sortedDummyImprovedData[k].id = k + 1;
}

function RenderLeaderboard(props) {
  const [authtoken, setAuthtoken] = useState('');

  useEffect(() => {
    let tokenObj = {};
    if (typeof window !== 'undefined') {
      tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
      setAuthtoken(tokenObj.accessToken.accessToken);
    }
  }, []);

  useEffect(() => {
    getLeaderboard();
  }, []);

  const getLeaderboard = () => {
    axios
      .get(
        `https://bg-emotion-tracker-be-b.herokuapp.com/leaderboard/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      )
      .then(e => {
        console.log(e);
      });
  };

  return (
    <LayoutContainer>
      <NavBar titleName={'Leaderboard'} backgroundColor="#293845" />
      <Tabs>
        <div label="HIGHEST SENTIMENT LAST WEEK">
          <ul>
            {sortedDummyData.map(elem => (
              <div className={`li-container`}>
                <li>
                  <h2 className="place">{elem.id}</h2>
                  <h2 className="place">{elem.clubname}</h2>
                  <h2 className="rating">{elem.rating}</h2>
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div label="MOST IMPROVED LAST MONTH">
          <ul>
            {sortedDummyImprovedData.map(elem => (
              <div className={`li-container`}>
                <li>
                  <h2 className="place">{elem.id}</h2>
                  <h2 className="place">{elem.clubname}</h2>
                  <h2 className="rating">{elem.rating}</h2>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </Tabs>
    </LayoutContainer>
  );
}
export default RenderLeaderboard;
