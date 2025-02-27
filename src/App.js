import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import { useState } from "react";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Favoris from "./containers/Favoris";
import Home from "./containers/Home.js";
import CharactersComics from "./containers/CharactersComics";
import stan from "./assets/stan-lee.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Header from "./components/Header";

library.add(faSearch);

const cookie = "Q9Cn04smyOeKPwtKjmQ19XEpInVFF";
Cookies.set("Token", cookie, { expires: 14 });

function App() {
  const [menuClose, setMenuClose] = useState(false);
  return (
    <>
      <div>
        <Router>
          <Header />
          <Menu isOpen={menuClose}>
            <Link onClick={setMenuClose} to="/">
              <img className="logo-menu" src={stan} alt="stan" />
            </Link>

            <Link onClick={setMenuClose} to="/characters">
              Personnages
            </Link>
            <Link onClick={setMenuClose} to="/comics">
              Comics
            </Link>
            <Link onClick={setMenuClose} to="/favoris">
              Favoris
            </Link>
          </Menu>

          <Switch>
            <Route exact path="/characters">
              <Characters />
            </Route>
            <Route exact path="/comics">
              <Comics />
            </Route>
            <Route exact path="/favoris">
              <Favoris />
            </Route>
            <Route exact path="/comics/:characterId">
              <CharactersComics />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
