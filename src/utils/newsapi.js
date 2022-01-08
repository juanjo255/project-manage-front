import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://newsdata.io/api/1/news',
  params: {
    apikey: 'pub_345506c2b60367ec03bd16e2faad0bc4965e',
    language:"en, es",
    category:"science, health, technology"
  }
};

const newsapi = async (successCallback) => {
  await axios.request(options).then(successCallback).catch(function (error) {
    console.error(error);
  });
}

export {newsapi};