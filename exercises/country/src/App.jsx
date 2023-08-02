import { useState, useEffect } from "react";
import axios from "axios";
import CountryName from "./components/CountryName";

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

  const handleHideButton = () => {
    setSelectedCountry(null);
  };

  const handleShowButton = (country) => {
    console.log(country, "open");
    setSelectedCountry(country);
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
        <div>
          <CountryName
            filterCountry={filterCountry}
            selectedCountry={selectedCountry}
            handleShowButton={handleShowButton}
            handleHideButton={handleHideButton}
          />
        </div>
      )}
    </div>
  );
};

export default App;
