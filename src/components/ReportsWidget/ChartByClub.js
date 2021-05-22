import Plot from 'react-plotly.js';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { mfull, msort, mfullr, m, mr } from './helpers';

const strToEmoji = str => {
  return String.fromCodePoint(parseInt(str, 16));
};

const barToPie = bar => {
  const dt = {
    values: bar?.y,
    labels: bar?.x,
    type: 'pie',
  };
  return dt;
};

export const ChartByClub = ({ mode, showAll, setShowAll, dateRange }) => {
  const [plot, setPlot] = useState([
    {
      x: [],
      y: [],
      type: '',
    },
  ]);

  const [clubSummary, setClubSummary] = useState([]);
  const [selectedClub, setSelectClub] = useState(0);
  const [clubActivity, setClubActivity] = useState('');
  const [authtoken, setAuthtoken] = useState('');
  const [chartType, setChartType] = useState(0);
  const plotRef = useRef();

  const getActivitiesData = () => {
    axios
      .get(
        `https://bg-emotion-tracker-be-b.herokuapp.com/report/club/${selectedClub}/activities/counts?from=${
          dateRange.from ? dateRange.from : '1000-01-01'
        }&to=${dateRange.to ? dateRange.to : '3000-01-01'}`,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      )
      .then(e => {
        console.log(e);
        let dts = [];
        e.data.forEach((val, i) => {
          const dt = {
            x: [],
            y: [],
            type: 'bar',
            label: '',
          };
          let keys;
          let vals;
          if (showAll) {
            keys = Object.keys(e.data[0].reactionCounts)
              .map(e => mfull[e])
              .sort((a, b) => msort[a] - msort[b]);
            vals = keys.map(i => val.reactionCounts[mfullr[i]]);
          } else {
            keys = Object.keys(e.data[0].reactionCounts)
              .map(e => m[e])
              .sort((a, b) => msort[a] - msort[b]);
            vals = keys.map(i => val.reactionCounts[mr[i]]);
          }

          dt.x = keys;
          dt.y = vals;
          dt.label = val.activityname;
          dts = dts.concat(dt);
        });
        setPlot(dts);
      });
  };

  useEffect(() => {
    let tokenObj = {};
    if (typeof window !== 'undefined') {
      tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
      setAuthtoken(tokenObj.accessToken.accessToken);
      console.log(mode);
      axios
        .get('https://bg-emotion-tracker-be-b.herokuapp.com/clubs/summary', {
          headers: {
            Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
          },
        })
        .then(e => setClubSummary(e.data));
    }
  }, []);

  useEffect(() => {
    if (selectedClub != 0) {
      getActivitiesData();
    }
  }, [selectedClub]);

  useEffect(() => {
    if (selectedClub != 0) {
      getActivitiesData();
    }
  }, [showAll]);

  useEffect(() => {
    if (selectedClub != 0) {
      getActivitiesData();
    }
  }, [dateRange]);

  useEffect(() => {
    if (clubActivity === '') {
      plotRef.current.style.visibility = 'hidden';
    } else {
      plotRef.current.style.visibility = 'visible';
    }

    if (
      plot[clubActivity * 1]?.label == 'Club Attendance' ||
      plot[clubActivity * 1]?.label == 'Club Checkout'
    ) {
      if (!showAll) {
        setShowAll(true);
      }
      getActivitiesData();
    } else {
      if (showAll) {
        setShowAll(false);
      }
    }
  }, [clubActivity]);

  return (
    <div style={{ margin: '0 1vh' }}>
      <label>
        Select Club
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          value={selectedClub}
          onChange={e => {
            setSelectClub(e.target.value);
            setClubActivity('');
          }}
        >
          <option> </option>
          {clubSummary.map((i, ind) => (
            <option value={i.clubid} key={i.clubid}>
              {i.clubname.replace(/^\w/, c => c.toUpperCase())}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select Activity
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          value={clubActivity}
          onChange={e => {
            setClubActivity(e.target.value);
          }}
        >
          <option> </option>

          {plot.map((i, ind) => (
            <option value={ind} key={i + ind}>
              {i?.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Chart Type
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setChartType(e.target.value);
          }}
        >
          <option value={0}> Bar </option>
          <option value={1}> Pie </option>
        </select>
      </label>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ alignSelf: 'center' }}></h2>
          <div style={{ width: '50vh', alignSelf: 'center' }} ref={plotRef}>
            {console.log(plot)}
            {chartType == 1 ? (
              <Plot
                data={[barToPie(plot[clubActivity * 1])]}
                layout={{
                  autosize: true,
                  font: {
                    size: '20',
                  },
                  title: plot[clubActivity * 1]?.label,
                }}
              />
            ) : (
              <Plot
                data={[plot[clubActivity * 1]]}
                layout={{
                  autosize: true,
                  font: {
                    size: '20',
                  },
                  title: plot[clubActivity * 1]?.label,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
