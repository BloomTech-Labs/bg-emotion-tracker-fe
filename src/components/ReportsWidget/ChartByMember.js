import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { barToPie, mfull, msort, mfullr, m, mr } from './helpers';
import { DateRangeSelector } from './DateRangeSelector';
import { Typography } from 'antd';
import { SelectClub } from './SelectClub';
import { SelectMember } from './SelectMember';

const { Title } = Typography;

export const ChartByMember = ({
  mode,
  showAll,
  setShowAll,
  dateRange,
  setDateRange,
}) => {
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
      <Title level={2}>Members</Title>
      <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
      <SelectClub
        setSelectClub={setSelectClub}
        setMember={setMember}
        selectedClub={selectedClub}
        clubSummary={clubSummary}
        label="Select Club"
      />
      <SelectMember setMember={setMember} member={member} plot={plot} />
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
