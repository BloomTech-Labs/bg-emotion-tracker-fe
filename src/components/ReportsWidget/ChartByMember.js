import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { barToPie, mfull, msort, mfullr, m, mr } from './helpers';
import { DateRangeSelector } from './DateRangeSelector';
import { Typography } from 'antd';
import { SelectClub } from './SelectClub';
import { SelectMember } from './SelectMember';
import { ChartType } from './ChartType';
import { ChartTemplate } from './ChartTemplate';

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
    <ChartTemplate
      title="Members"
      mode={mode}
      showAll={showAll}
      setShowAll={setShowAll}
      dateRange={dateRange}
      setDateRange={setDateRange}
      plot={plot}
      member={member}
      setSelectClub={setSelectClub}
      setMember={setMember}
      clubSummary={clubSummary}
      plotRef={plotRef}
    />
  );
};
