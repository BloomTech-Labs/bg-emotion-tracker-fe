import Plot from 'react-plotly.js';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { barToPie, mfull, msort, mfullr, m, mr } from './helpers';
import { Typography } from 'antd';
import { SelectClub } from './SelectClub';
import { SelectActivity } from './SelectActivity';
import { ChartType } from './ChartType';
import { ChartTemplate } from './ChartTemplate';
import { Section } from '../common';

const strToEmoji = str => {
  return String.fromCodePoint(parseInt(str, 16));
};

export const ChartByActivity = ({
  mode,
  showAll,
  setShowAll,
  dateRange,
  setDateRange,
  member,
  setMember,
}) => {
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
    <ChartTemplate
      title="Activities"
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
    >
      <Section>
        <SelectClub
          setSelectClub={setSelectClub}
          setMember={setMember}
          selectedClub={selectedClub}
          clubSummary={clubSummary}
          label="Select Club"
        />
        <SelectActivity
          clubActivity={clubActivity}
          setClubActivity={setClubActivity}
          plot={plot}
          setChartType={setChartType}
          plotRef={plotRef}
          barToPie={barToPie}
          chartType={chartType}
          Plot={Plot}
        />
      </Section>
      <Section>
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
      </Section>
      {/* <ChartType setChartType={setChartType} /> */}
    </ChartTemplate>
  );
};
