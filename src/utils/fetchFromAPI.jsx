import axios from 'axios';

// export const BASE_URL = '94.156.35.132:8080';
// export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';


const BASE_URL = 'https://polit.duckdns.org/backend';

const options = {
  params: {
    maxResults: 50,
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};


export const fetchFromAPIGeneral = async (url, method = 'GET', bodyData = null) => {
  try {
    if (method === 'POST' && bodyData) {
      const response = await axios.post(`${BASE_URL}/${url}`, bodyData);
      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        json: async () => response.data,
      };
    }

    return fetchFromAPI(url);
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
