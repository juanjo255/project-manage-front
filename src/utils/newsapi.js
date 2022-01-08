import axios from "axios";

const options = {
  method: 'GET',
  url: 'http://api.mediastack.com/v1/news',
  params: {
    access_key: '294c6270c630557c63b313753e118859',
    categories:'science, health',
    languages:'en, es'
}
};

const newsapi = async (successCallback) => {
  await axios.request(options).then(successCallback).catch(function (error) {
    console.error(error);
  });
}

export {newsapi};