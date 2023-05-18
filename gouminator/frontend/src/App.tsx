import { useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { getBaseUrl } from "./utils/base-url";

function App() {
  const {
    gouminAmount,
    handleSubmit,
    error,
    handleRadiusChange,
    radius,
    loading,
  } = useGoumin();

  return (
    <main>
      <h1>The Gouminator</h1>
      <h2>Generateur de Goumin @ AKIL TECHNOLOGIES</h2>
      <p>Input a number and get the value of your goumin.</p>
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="radius">Goumin</label>
        <input
          name="goumin"
          value={radius}
          onChange={handleRadiusChange}
          id="radius"
          type="text"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="error">{error}</p>}
        <p>Your goumin amount is {gouminAmount || "-"} cm3</p>
      </form>
    </main>
  );
}

export default App;

function useGoumin() {
  const [gouminAmount, setGouminAmount] = useState(0);
  const [radius, setRadius] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const sanitizedValue = value.replace(/\D/g, "");

    setRadius(sanitizedValue);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (radius === "") {
      setError("Please enter a radius.");
      return;
    }

    const numericRadius = Number(radius);

    if (isNaN(numericRadius)) {
      setError("Please enter a valid number for the radius.");
      return;
    }

    if (numericRadius >= 100) {
      setError("Please enter a radius less than 100.");
      return;
    }

    setLoading(true);
    try {
      if (cache.current[radius]) {
        setGouminAmount(cache.current[radius]);
        setLoading(false);
        return;
      }

      const response = await createVolume(+radius);
      cache.current[radius] = response?.volume;
      setGouminAmount(response.volume);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  function createVolume(radius: number) {
    return axios
      .post(`${getBaseUrl()}/volume`, { radius })
      .then((response) => response.data);
  }

  return {
    gouminAmount,
    handleSubmit,
    handleRadiusChange,
    error,
    radius,
    loading,
  };
}
