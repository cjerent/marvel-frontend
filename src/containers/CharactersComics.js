import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IsLoading from "../components/IsLoading";

const CharactersComics = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const imgExtensionJpg = "portrait_uncanny.jpg";
  const imgExtensionGif = "portrait_uncanny.gif";
  const imgExtensionPng = "portrait_uncanny.png";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${params.characterId}`,
        {
          params: {
            apiKey: process.env.REACT_APP_API_KEY,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setIsloading(false);
    };
    fetchData();
  }, [params.characterId]);
  return (
    <div className="wrapper">
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <h1>{data.name}</h1>
          <p className="more-info">{data.description}</p>
          <h1>Retrouvez {data.name} dans...</h1>

          <div className="cards-container">
            {data.comics.map((item) => {
              const comicsTitle = item.title;
              const description = item.description;
              let img;
              if (item.thumbnail.extension === "jpg") {
                img = item.thumbnail.path + "/" + imgExtensionJpg;
              } else if (item.thumbnail.extension === "gif") {
                img = item.thumbnail.path + "/" + imgExtensionGif;
              } else if (item.thumbnail.path === "png") {
                img = item.thumbnail.path + "/" + imgExtensionPng;
              }
              return (
                <div key={item._id} className="card">
                  <div className="card-title">
                    <h2>{comicsTitle}</h2>
                  </div>
                  <div className="img-container">
                    <img src={img} alt={comicsTitle} />
                  </div>
                  <div className="text">
                    <p>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CharactersComics;
