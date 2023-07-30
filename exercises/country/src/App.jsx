import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountry] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    wind: "",
    weatherIcon: "",
  });

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountry(response.data);
      });
  }, []);

  const filterCountry = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  const handleOnFilter = (event) => {
    setSearch(event.target.value);
  };

  const handleHideButton = () => {
    setSelectedCountry(null);
  };

  useEffect(() => {
    if (selectedCountry) {
      console.log("now second");
      getData();
    }
  }, [selectedCountry]);

  const getData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          selectedCountry.capital[0]
        }&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API}`
      )

      .then((response) => {
        console.log(response, "i am third");
        setWeatherData({
          temperature: response.data.main.temp,
          wind: response.data.wind.speed,
          weatherIcon: response.data.weather[0].icon,
        });
      });
  };

  const handleShowButton = (country) => {
    console.log(country, "open");
    setSelectedCountry(country);
  };
  console.log(weatherData, "newdata");

  const buttonStyle = {
    marginLeft: "10px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  };

  return (
    <div>
      find countries:
      <input value={search} onChange={handleOnFilter} />
      {search === "" ? (
        <div>no seach result yet</div>
      ) : filterCountry.length > 10 ? (
        <div>To many matches</div>
      ) : (
        filterCountry.map((country) => (
          <div key={country.cca2}>
            <div style={{ display: "inline-block" }}>
              <h1>{country.name.common}</h1>
              {selectedCountry === country ? (
                <div>
                  <p>
                    {country.capital === undefined ? (
                      <div>not found</div>
                    ) : (
                      country.capital.map((data) => data)
                    )}
                  </p>
                  <p>Area: {country.area}</p>
                  <h2>Languages:</h2>
                  <ul>
                    {Object.values(country.languages).map((each, index) => (
                      <li key={index}>{each}</li>
                    ))}
                  </ul>
                  <div style={{ fontSize: "150px" }}>{country.flag}</div>
                  <h2>Weather in {country.capital[0]}</h2>
                  <div> Temperature -{weatherData.temperature}Celcius</div>
                  <img
                    style={{ height: "150px", width: "150px" }}
                    src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
                    alt="icon-weather"
                  />

                  <div>wind{weatherData.wind}m/s</div>
                  <button onClick={handleHideButton} style={buttonStyle}>
                    Hide
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleShowButton(country)}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  show
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
