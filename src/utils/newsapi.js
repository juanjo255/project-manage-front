import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://newsdata.io/api/1/news',
  params: {apikey: 'pub_345599f9e2862b7b5793d5e8eeae0e677c79'}
};

const newsapi = async (successCallback) => {
  await axios.request(options).then(successCallback).catch(function (error) {
    console.error(error);
  });
}

export {newsapi};