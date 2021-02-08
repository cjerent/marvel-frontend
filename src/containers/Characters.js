import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import IsLoading from "../components/IsLoading";

const Characters = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const imgExtensionJpg = "portrait_uncanny.jpg";
  const imgExtensionGif = "portrait_uncanny.gif";
  const imgExtensionPng = "portrait_uncanny.png";

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
        "https://lereacteur-marvel-api.herokuapp.com/characters",
        {
          params: {
            skip: page,
            apiKey: process.env.REACT_APP_API_KEY,
            name: search,
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
        <div>
          <h1>Personnages</h1>
          <div className="searchbar-container">
            <FontAwesomeIcon className="search-icon" icon="search" />
            <DebounceInput
              minLength={1}
              debounceTimeout={100}
              className="search-bar"
              type="text"
              placeholder="Recherche ton personnage"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="cards-container">
            {data.map((item) => {
              const name = item.name;

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
                <>
                  <div key={item._id} className="card">
                    <div className="card-title">
                      <h2>{name}</h2>
                    </div>
                    <div className="img-container">
                      <img src={img} alt={name} />
                    </div>
                    <div className="text">
                      <p>
                        {description}
                        <br />{" "}
                        <button
                          onClick={() => history.push(`comics/${item._id}`)}
                        >
                          Découvrez ses Comics
                        </button>
                      </p>
                    </div>
                  </div>
                </>
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
        </div>
      )}
    </div>
  );
};

export default Characters;
