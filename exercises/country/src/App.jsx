import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountry] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const handleShowButton = (country) => {
    setSelectedCountry(country);
  };
  const handleHideButton = () => {
    setSelectedCountry(null);
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
                  <p>Languages:</p>
                  <ul>
                    {Object.values(country.languages).map((each, index) => (
                      <li key={index}>{each}</li>
                    ))}
                  </ul>
                  <div style={{ fontSize: "150px" }}>{country.flag}</div>
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
