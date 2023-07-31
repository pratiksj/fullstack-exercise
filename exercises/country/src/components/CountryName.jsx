import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CountryDetails from "./CountryDetails";

const CountryName = ({
  filterCountry,
  selectedCountry,
  handleShowButton,
  handleHideButton,
}) => {
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    wind: "",
    weatherIcon: "",
  });

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

  const buttonStyle = {
    marginLeft: "10px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  };

  return (
    <>
      {filterCountry.map((country) => (
        <div key={country.cca2}>
          <h1>{country.name.common}</h1>{" "}
          {selectedCountry === country ? (
            <>
              <CountryDetails
                country={country}
                weatherData={weatherData}
                handleHideButton={handleHideButton}
              />
              <button onClick={handleHideButton} style={buttonStyle}>
                Hide
              </button>
            </>
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
      ))}
    </>
  );
};

export default CountryName;
//style={{ display: "inline-block" }
