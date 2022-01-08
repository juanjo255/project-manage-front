import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://newsapi.org/v2/everything',
  params: {q: 'cells', apiKey: '9ef7b9b1697041dfba0eb0b202edca0c'}
};

const newsapi = async (successCallback) => {
  await axios.request(options).then(successCallback).catch(function (error) {
    console.error(error);
  });
}

export {newsapi};