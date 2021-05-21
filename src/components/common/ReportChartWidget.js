import React from 'react';
import Plot from 'react-plotly.js';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const strToEmoji = str => {
  return String.fromCodePoint(parseInt(str, 16));
};

const allemojis = [
  '1F605',
  '1F61B',
  '1F61C',
  '1F61D',
  '1F92A',
  '1F636',
  '1F611',
  '1F644',
  '1F971',
  '1F624',
  '1F620',
  '1F628',
  '1F62D',
  '1F622',
  '1F634',
  '1F601',
  '1F642',
  '1F610',
  '1F641',
  '1F61E',
];

const m = {
  '1F601': '😁',
  '1F642': '🙂',
  '1F610': '😐',
  '1F641': '🙁',
  '1F61E': '😞',
};

const mfull = {};
for (let i of allemojis) {
  mfull[i] = strToEmoji(i);
}

const mfullr = {};
for (let i of allemojis) {
  mfullr[strToEmoji(i)] = i;
}

const mr = {
  '😁': '1F601',
  '🙂': '1F642',
  '😐': '1F610',
  '🙁': '1F641',
  '😞': '1F61E',
};

const msort = {
  '😁': 0,
  '🙂': 1,
  '😐': 2,
  '🙁': 3,
  '😞': 4,
};

const barToPie = bar => {
  const dt = {
    values: bar?.y,
    labels: bar?.x,
    type: 'pie',
  };
  return dt;
};

function ChartByClub({ mode, showAll, setShowAll, dateRange }) {
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
}

function ChartByMember({ mode, showAll, setShowAll, dateRange }) {
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
}

export default function ReportChartWidget() {
  const [mode, setMode] = useState('none');
  const [showAll, setShowAll] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const fromref = useRef();
  const toref = useRef();

  return (
    <div style={{ margin: '1vh' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', marginTop: '1vh' }}>
          <label style={{ marginLeft: '1vh' }}>
            Report Type
            <select
              style={{ marginLeft: '1vh', padding: '0.2rem', fontSize: '1rem' }}
              onChange={e => setMode(e.target.value)}
            >
              <option value="none"> </option>
              <option value="0"> Member Positivity </option>
              <option value="1"> Activity Feedback </option>
            </select>
          </label>
          <label
            style={{
              marginLeft: '1vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Show All Emotions
            <input
              type="checkbox"
              style={{ width: '1.5vh', height: '1.5vh' }}
              checked={showAll}
              onChange={e => {
                setShowAll(e.target.checked);
              }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', marginTop: '1vh' }}>
          <label
            style={{
              marginLeft: '1vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            From ‎
            <input type="date" id="fromdate" name="fromdate" ref={fromref} />
          </label>
          <label
            style={{
              marginLeft: '1vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            To ‎
            <input type="date" id="todate" name="todate" ref={toref} />
          </label>
          <button
            style={{ marginLeft: '1vh' }}
            onClick={e => {
              setDateRange({
                from: fromref.current.value,
                to: toref.current.value,
              });
            }}
          >
            {' '}
            Set Date{' '}
          </button>
        </div>
      </div>

      {(mode => {
        switch (mode) {
          case 'none':
            return <div></div>;
          case '0':
            return (
              <ChartByMember
                mode={mode}
                showAll={showAll}
                setShowAll={setShowAll}
                dateRange={dateRange}
              />
            );
          case '1':
            return (
              <ChartByClub
                mode={mode}
                showAll={showAll}
                setShowAll={setShowAll}
                dateRange={dateRange}
              />
            );
          default:
            break;
        }
      })(mode)}
    </div>
  );
}
