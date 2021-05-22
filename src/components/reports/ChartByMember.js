import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { barToPie, mfull, msort, mfullr, m, mr } from './helpers';

export const ChartByMember = ({ mode, showAll, setShowAll, dateRange }) => {
  const [clubSummary, setClubSummary] = useState([]);
  const [selectedClub, setSelectClub] = useState(0);
  const [member, setMember] = useState('');
  const [authtoken, setAuthtoken] = useState('');
  const [plot, setPlot] = useState([
    {
      x: [],
      y: [],
      type: '',
    },
  ]);
  const plotRef = useRef();
  const [chartType, setChartType] = useState(0);

  useEffect(() => {
    if (selectedClub != 0) {
      getMembersData();
    }
  }, [selectedClub]);

  useEffect(() => {
    if (selectedClub != 0) {
      getMembersData();
    }
  }, [showAll]);

  useEffect(() => {
    if (selectedClub != 0) {
      getMembersData();
    }
  }, [dateRange]);

  useEffect(() => {
    if (member === '') {
      plotRef.current.style.visibility = 'hidden';
    } else {
      plotRef.current.style.visibility = 'visible';
    }
  }, [member]);

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

  const getMembersData = () => {
    axios
      .get(
        `https://bg-emotion-tracker-be-b.herokuapp.com/report/club/${selectedClub}/members/counts?from=${
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
          dt.label = val.memberid;
          dts = dts.concat(dt);
        });
        setPlot(dts);
      });
  };
  return (
    <div style={{ margin: '0 1vh' }}>
      <label>
        Select Club
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setSelectClub(e.target.value);
            setMember('');
          }}
          value={selectedClub}
        >
          <option> </option>
          {clubSummary.map((i, ind) => (
            <option value={i.clubid} key={i + ind}>
              {i.clubname.replace(/^\w/, c => c.toUpperCase())}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select Member
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setMember(e.target.value);
          }}
          value={member}
        >
          <option> </option>
          {plot.map((i, ind) => (
            <option value={ind} key={i + ind}>
              {i?.label}
            </option>
          ))}
        </select>
      </label>
      <label style={{ padding: '1vh' }}>
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
                data={[barToPie(plot[member * 1])]}
                layout={{
                  autosize: true,
                  font: {
                    size: '20',
                  },
                  title: plot[member * 1]?.label,
                }}
              />
            ) : (
              <Plot
                data={[plot[member * 1]]}
                layout={{
                  autosize: true,
                  font: {
                    size: '20',
                  },
                  title: plot[member * 1]?.label,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
