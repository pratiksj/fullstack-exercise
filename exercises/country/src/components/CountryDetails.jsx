import React from "react";

const CountryDetails = ({ country, weatherData }) => {
  return (
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
    </div>
  );
};

export default CountryDetails;
