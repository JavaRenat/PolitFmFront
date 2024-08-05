import axios from 'axios';

// export const BASE_URL = '94.156.35.132:8080';
// export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';


const BASE_URL = 'https://polit.duckdns.org';

const options = {
  params: {
    maxResults: 50,
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
