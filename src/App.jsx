import { useState } from "react";
import Input from "./index.jsx";
import styles from "./App.module.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hint, setHint] = useState("Search for a city...");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className={styles.container}>
      <h1>City Search</h1>
      <div className={styles.searchWrapper}>
        <Input handleChange={handleChange} hint={hint} value={searchTerm} />
      </div>
    </div>
  );
}

export default App;
