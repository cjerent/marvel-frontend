import React, { useState, useEffect } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import IsLoading from "../components/IsLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [page, setPage] = useState(100);
  const [search, setSearch] = useState("");
  const imgExtensionJpg = "portrait_uncanny.jpg";
  const imgExtensionGif = "portrait_uncanny.gif";

  const end = page === 0;
  const endNext = page === 1400;

  const handleNext = (e) => {
    e.preventDefault();
    setPage(page + 100);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setPage(page - 100);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-marvel-api.herokuapp.com/comics",
        {
          params: {
            skip: page,
            apiKey: process.env.REACT_APP_API_KEY,
            title: search,
          },
        }
      );
      console.log(response.data);
      setData(response.data.results);
      setIsloading(false);
    };
    fetchData();
  }, [page, search]);
  return (
    <div className="wrapper">
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <h1>Comics</h1>
          <div className="searchbar-container">
            <FontAwesomeIcon className="search-icon" icon="search" />
            <DebounceInput
              minLength={3}
              debounceTimeout={100}
              className="search-bar"
              type="text"
              placeholder="Recherche tes comics"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="cards-container">
            {data.map((item) => {
              const name = item.title;
              const description = item.description;
              let img;
              if (item.thumbnail.extension === "jpg") {
                img = item.thumbnail.path + "/" + imgExtensionJpg;
              } else if (item.thumbnail.extension === "gif") {
                img = item.thumbnail.path + "/" + imgExtensionGif;
              }

              return (
                <div key={item._id} className="card">
                  <div className="card-title">
                    <h2>{name}</h2>
                  </div>
                  <div className="img-container">
                    <img src={img} alt={name} />
                  </div>
                  <div className="text">
                    <p>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="paginate">
            {end ? (
              <div></div>
            ) : (
              <div onClick={handlePrev}>⍃ PREVIOUS PAGE</div>
            )}
            {endNext ? (
              <div></div>
            ) : (
              <div onClick={handleNext}> NEXT PAGE ⍄ </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Comics;
