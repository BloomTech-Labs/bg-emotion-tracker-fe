import axios from 'axios';

let URI = 'http://localhost:2019/';
if (process.env.NODE_ENV === 'production') {
  URI = process.env.REACT_APP_API_URI;
}

// we will define a bunch of API calls here.
const apiUrl = `${URI}profiles`;
const profileUrl = `${URI}users/getuserinfo`;
const profilesUrl = `${URI}profiles`;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.accessToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const profileAuthGet = authHeader => {
  return axios.get(profileUrl, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return profileAuthGet(getAuthHeader(authState)).then(
      response => response.data
    );
  } catch (error) {
    return new Promise(() => {
      throw error;
    });
  }
};

export { sleep, getExampleData, getProfileData, getDSData };
