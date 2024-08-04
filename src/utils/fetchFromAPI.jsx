import axios from 'axios';

// export const BASE_URL = '94.156.35.132:8080';
// export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = 'http://94.156.35.132:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': '607db3bf85msh14284e7d38e2ccap1602f8jsnfb0f79935771',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    'Origin': 'https://your-frontend-url.com'
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${CORS_PROXY}${BASE_URL}/${url}`, options);

  return data;
};
