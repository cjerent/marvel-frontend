import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Header from "./components/Header";
import MenuBurger from "./components/MenuBurger";
library.add(faSearch);

const cookie = "gThuzopEgTT0i";
Cookies.set("Favorites", cookie, { expires: 14 });

function App() {
  return (
    <>
      <Header />
      <MenuBurger />
    </>
  );
}

export default App;
