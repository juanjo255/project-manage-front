import React, { useEffect } from "react";
import { useState } from "react";
import { newsapi } from "utils/newsapi";
import { nanoid } from "nanoid";

const Index = () => {
  const [noticias, setNoticias] = useState();

  useEffect(() => {
    newsapi((res) => setNoticias(res.data.articles));
  }, []);

  useEffect(() => {
    if (noticias) {
      noticias.map((res) => console.log(res));
    }
  }, [noticias]);
  return (
    <div className="h-full text-center ">
      <div className=" indexTitle text-2xl md:text-7xl my-10 uppercase ">
        News
      </div>
      <hr />
      <div className="organizarBloques justify-around">
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
    <div className="flex flex-col py-5 border-t-2 my-3 bg-gray-200 rounded-3xl items-center shadow-lg hover:bg-gray-800">
      <span className="flex text-gray-400  justify-start">
        Published at {newinfo.publishedAt.slice(0, 10)}
      </span>
      <a href={newinfo.url}>
        <img
          src={newinfo.urlToImage}
          alt={newinfo.title}
          className=" rounded-lg shadow-lg  "
        />
      </a>
      <span className=" newsfont text-base lg:text-2xl w-full my-3 ">
        {newinfo.title}
      </span>
      <p className="text-gray-500  ">{newinfo.description}</p>
    </div>
  );
};

export default Index;
