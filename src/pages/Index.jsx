import React, { useEffect } from "react";
import { useState } from "react";
import { newsapi } from "utils/newsapi";
import { nanoid } from "nanoid";

const Index = () => {
  const [noticias, setNoticias] = useState();

  useEffect(() => {
    newsapi((res) => setNoticias(res.data.results));
  }, []);

  useEffect(() => {
    if (noticias) {
      noticias.map((res) => console.log(res));
      //console.log(noticias);
    }
  }, [noticias]);
  return (
    <div className="h-full text-center ">
      <div className=" indexTitle text-2xl md:text-7xl my-10 uppercase ">
        News
      </div>
      <hr />
      <div className="organizarBloques justify-around ">
        {noticias ? (
          noticias.map((news) => {
            return <Newcard newinfo={news} key={nanoid()} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Newcard = ({ newinfo }) => {
  return (
    <div className="flex flex-col py-5 border-t-2 my-3 bg-gray-900 rounded-3xl items-center shadow-lg hover:bg-gray-600 zoom">
      <a href={newinfo.link} target="_blank" rel="noopener noreferrer">
        <span className="flex text-gray-400  justify-start">
          Published at {newinfo.pubDate.slice(0, 10)}
        </span>
          <img
            src={newinfo.image_url ? (newinfo.image_url):('https://gqspcolombia.org/wp-content/themes/consultix/images/no-image-found-360x260.png')}
            alt={newinfo.title}
            className=" rounded-lg shadow-lg "
          />
        <span className=" newsfont text-base lg:text-2xl w-full my-3 text-white">
          {newinfo.title}
        </span>
      </a>
    </div>
  );
};

export default Index;
