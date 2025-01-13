import { useState } from "react";
import logo from "../src/images/logo.png";
import "./App.css";
import Card from "./components/cards/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [place, setPlace] = useState("");
  const [error, setError] = useState();

  const getWeather = async (e) => {
    e.preventDefault();

    const tokenKey = "b4af3c12b165ff441f484f26ed738f8f";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${tokenKey}&units=metric&lang=tr`;
    setPlace("")

    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod !== "404") {
            setError("");
            const existingCardIndex = cards.findIndex(
              (card) => card.name === data.name
            );
            if (existingCardIndex !== -1) {
              cards[existingCardIndex] = data;
              setError("You already know the weather of this place");
            } else {
              setCards([...cards, data]);
            }
          } else {
            setError(data.message);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="d-flex flex-column justify-content-center align-items-center pt-5 main">
      <header className="text-center my-3">
        <h1
          style={{
            color: "#D8F3DC",
          }}
          className="display-1 fw-bold"
        >
          Weather App
        </h1>
      </header>
      <form className="container" onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Search for a city"
          className="search-input"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button className="search-button mx-3 px-4" type="submit">
          SEARCH
        </button>
        {
          error && 
          <div className="error">{error}</div>
        }
      </form>
      <section className="container mt-5">
        <div className="cards row px-2">
          {cards.map((card, index) => {
            return <Card card={card} key={index} />;
          })}
        </div>
      </section>
      <footer className="container d-flex justify-content-end align-items-center w-75 gap-3">
        <div className="bg-light p-3 rounded">
          <span className="footer-text">Created by</span>
          <img src={logo} alt="logo" width={"100px"} />
        </div>
      </footer>
    </main>
  );
}

export default App;
