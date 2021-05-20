import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const m = {
  '1F601': '😁',
  '1F642': '🙂',
  '1F610': '😐',
  '1F641': '🙁',
  '1F61E': '😞',
};

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
    values: bar.y,
    labels: bar.x,
    type: 'pie',
  };
  return dt;
};

function ChartByClub({ mode }) {
  const [plot, setPlot] = useState([
    {
      x: [],
      y: [],
      type: '',
    },
  ]);

  const [clubSummary, setClubSummary] = useState([]); // switch this out to the context and remove fetching in useEffect(), when integrating.
  const [selectedClub, setSelectClub] = useState(0); // clubid
  const [clubActivity, setClubActivity] = useState('');
  const [authtoken, setAuthtoken] = useState('');
  const [chartType, setChartType] = useState(0);

  const getActivitiesData = () => {
    axios
      .get(
        `https://bg-emotion-tracker-be-b.herokuapp.com/report/club/${selectedClub}/activities/counts?from=2021-05-01&to=2022-04-01`,
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
          const keys = Object.keys(e.data[0].reactionCounts)
            .map(e => m[e])
            .sort((a, b) => msort[a] - msort[b]);
          let vals = keys.map(i => val.reactionCounts[mr[i]]);
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

  return (
    <div style={{ margin: '1vh' }}>
      <label>
        Select Club
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setSelectClub(e.target.value);
            setClubActivity('');
          }}
        >
          <option> </option>
          {clubSummary.map((i, ind) => (
            <option value={i.clubid}>
              {i.clubname.replace(/^\w/, c => c.toUpperCase())}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select Activity
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setClubActivity(e.target.value);
          }}
        >
          <option> </option>
          {plot.map((i, ind) => (
            <option value={ind}> {i?.label} </option>
          ))}
        </select>
      </label>
      <label>
        Select Chart Type
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
          <div style={{ width: '50vh', alignSelf: 'center' }}>
            {console.log(plot)}
            {chartType == 1 ? (
              <Plot
                data={[barToPie(plot[clubActivity * 1])]}
                layout={{
                  width: '50vh',
                  height: '40vh',
                  font: {
                    size: '20',
                  },
                  title: plot[clubActivity * 1]?.label,
                }}
              />
            ) : (
              // <></>
              <Plot
                data={[plot[clubActivity * 1]]}
                layout={{
                  width: '50vh',
                  height: '40vh',
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

function ChartByMember({ mode }) {
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
  const [chartType, setChartType] = useState(0);

  useEffect(() => {
    if (selectedClub != 0) {
      getMembersData();
    }
  }, [selectedClub]);

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
        `https://bg-emotion-tracker-be-b.herokuapp.com/report/club/${selectedClub}/members/counts`,
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
          const keys = Object.keys(e.data[0].reactionCounts)
            .map(e => m[e])
            .sort((a, b) => msort[a] - msort[b]);
          let vals = keys.map(i => val.reactionCounts[mr[i]]);
          dt.x = keys;
          dt.y = vals;
          dt.label = val.memberid;
          dts = dts.concat(dt);
        });
        setPlot(dts);
      });
  };
  return (
    <div style={{ margin: '1vh' }}>
      <label>
        Select Club
        <select
          style={{ margin: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => {
            setSelectClub(e.target.value);
            setMember('');
          }}
        >
          <option> </option>
          {clubSummary.map((i, ind) => (
            <option value={i.clubid}>
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
        >
          <option> </option>
          {plot.map((i, ind) => (
            <option value={ind}> {i?.label} </option>
          ))}
        </select>
      </label>
      <label style={{ padding: '1vh' }}>
        Select Chart Type
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
          <div style={{ width: '50vh', alignSelf: 'center' }}>
            {console.log(plot)}
            {chartType == 1 ? (
              <Plot
                data={[barToPie(plot[member * 1])]}
                layout={{
                  width: '50vh',
                  height: '40vh',
                  font: {
                    size: '20',
                  },
                  title: plot[member * 1]?.label,
                }}
              />
            ) : (
              // <></>
              <Plot
                data={[plot[member * 1]]}
                layout={{
                  width: '50vh',
                  height: '40vh',
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

  return (
    <div style={{ margin: '1vh' }}>
      <label style={{ marginLeft: '1vh' }}>
        Select Report Type
        <select
          style={{ marginLeft: '1vh', padding: '0.2rem', fontSize: '1rem' }}
          onChange={e => setMode(e.target.value)}
        >
          <option value="none"> </option>
          <option value="0"> Member Positivity </option>
          <option value="1"> Activity Feedback </option>
        </select>
      </label>

      {(mode => {
        switch (mode) {
          case 'none':
            return <div></div>;
          case '0':
            return <ChartByMember mode={mode} />;
          case '1':
            return <ChartByClub mode={mode} />;
          default:
            break;
        }
      })(mode)}
    </div>
  );
}
