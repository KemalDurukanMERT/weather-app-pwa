import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/cards/Card";
import { FaGithub, FaSearch } from "react-icons/fa";

function App() {
  const [cards, setCards] = useState([]);
  const [place, setPlace] = useState("");
  const [error, setError] = useState();

  const getWeather = async (e) => {
    e.preventDefault();

    const tokenKey = "b4af3c12b165ff441f484f26ed738f8f";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${tokenKey}&units=metric&lang=tr`;
    setPlace("");

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const tokenKey = "b4af3c12b165ff441f484f26ed738f8f";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${tokenKey}&units=metric&lang=tr`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            if (data.cod !== "404") {
              setError("");
              setCards([data]);
            } else {
              setError(data.message);
            }
          })
          .catch((err) => console.log(err));
      },
      (error) => {
        console.log(error);
      }
    );

    if ("Notification" in window) {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          if (error) {
        registration.showNotification("Weather App Error", {
          body: error.toUpperCase(),
        });
          }
        });
      }
      Notification.requestPermission().then((permission) => {
        if (permission === "granted" && error) {
          new Notification("Weather App Error", {
            body: error.toUpperCase(),
          });
        }
      });
    }
  }, [error]);

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
      <form className="container d-flex" onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Search for a city"
          className="search-input"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button className="search-button  px-3" type="submit">
          <FaSearch />
        </button>
      </form>
      {error && <div className="error container px-3 text-start fs-6">{error.toUpperCase()}</div>}
      <section className="container mt-5">
        <div className="cards row px-2  justify-content-center">
          {cards.map((card, index) => {
            return <Card card={card} key={index} />;
          })}
        </div>
      </section>
      <footer className="container d-flex justify-content-end align-items-center ">
        <div className="bg-light p-3 rounded d-flex justify-content-center align-items-center">
          <span className="footer-text">Created by</span>
          <a href="https://github.com/KemalDurukanMERT" target="_blank" rel="noreferrer">
            <FaGithub className="footer-icon text-dark ms-2 fs-1" />
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
