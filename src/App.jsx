import { useState } from "react";
import Input from "./index.jsx";
import cities from "./cities.json";
import styles from "./App.module.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [hint, setHint] = useState("Search for a city...");

  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentCities");
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSelected(false);

    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(filtered.slice(0, 10));
      if (filtered.length > 0) {
        const firstMatch = filtered[0];
        const remainingText = firstMatch.slice(value.length);
        setHint(remainingText);
      } else {
        setHint("");
      }
    } else {
      setSuggestions([]);
      setHint("Search for a city...");
    }
  };

  const handleCityClick = (city) => {
    setSearchTerm(city);
    setHint("");
    setIsSelected(true);

    const updated = [city, ...recentSearches.filter((c) => c !== city)].slice(
      0,
      5,
    );
    setRecentSearches(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));

    setSuggestions([]);
  };

  return (
    <div className={styles.container}>
      <h1>City Search</h1>

      <div className={styles.searchWrapper}>
        <Input handleChange={handleChange} hint={hint} value={searchTerm} />

        {searchTerm === "" && recentSearches.length > 0 && (
          <div className={styles.recent}>
            <p>Recent Searches:</p>
            <ul>
              {recentSearches.map((city) => (
                <li key={city} onClick={() => handleCityClick(city)}>
                  🕒 {city}
                </li>
              ))}
            </ul>
          </div>
        )}

        {searchTerm && suggestions.length > 0 && (
          <ul className={styles.suggestionsList}>
            {suggestions.map((city) => (
              <li key={city} onClick={() => handleCityClick(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}

        {searchTerm && suggestions.length === 0 && !isSelected && (
          <div className={styles.noResults}>
            <p>{`No cities found matching "${searchTerm}"`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
