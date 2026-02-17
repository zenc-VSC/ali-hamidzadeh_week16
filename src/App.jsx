import { useState } from "react";
import Input from "./index.jsx";
import cities from "./cities.json";
import styles from "./App.module.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [hint, setHint] = useState("Search for a city...");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions([]);
      setHint("Search for a city...");
    }
  };

  return (
    <div className={styles.container}>
      <h1>City Search</h1>
      <div className={styles.searchWrapper}>
        <Input handleChange={handleChange} hint={hint} value={searchTerm} />
      </div>
      {searchTerm && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((city) => (
            <li key={city}>{city}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
