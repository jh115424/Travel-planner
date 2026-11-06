import { useState, useEffect } from "react";
import "./searchForm.css";
import { askAI } from "../api";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const [day, setDays] = useState(5);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itinerary, setItinerary] = useState(
    JSON.parse(localStorage.getItem("itinerary")) || [],
  );
  const button = [3, 7, 10, 5];

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const prompt = `Create a ${day} day travel itinerary for ${city}. 
Return JSON only, no extra text, in this format:
[{"day": 1, "title": "Day title", "activities": ["activity 1", "activity 2", "activity 3"]}, ...]`;

    try {
      const data = await askAI(prompt);
      if (data.choices[0].message.content) {
        setItinerary(
          JSON.parse(
            data.choices[0].message.content.replace(/```json|```/g, "").trim(),
          ),
        );
      } else {
        setError("No response from A.I. Try again");
      }
    } catch {
      setError("Something went wrong. Try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
  }, [itinerary]);

  const handleClear = () => {
    setItinerary([]);
    localStorage.removeItem("itinerary");
  };

  return (
    <div className="searchFormContainer">
      <div className="locationQuestion">
        <p className="questionOneLocation">Where do you want to go?</p>
        <div className="searchInputBox">
          <input
            type="text"
            className="options"
            id="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <p className="questionTwoAmount">How many days?</p>
        <div className="daysSelection">
          {button.map((btn) => {
            return (
              <button
                className={day === btn ? "activeDay" : "inactiveDay"}
                key={btn}
                onClick={() => setDays(btn)}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
      <div className="generateContainer">
        <button
          className="generateButton"
          onClick={handleGenerate}
          disabled={loading || !city}
        >
          {loading ? "Generating..." : "Generate my itinerary"}
        </button>
        {error && <p>{error}</p>}
        {itinerary.length > 0 &&
          itinerary.map((item) => (
            <div key={item.day} className="dayCard">
              <div className="dayCardHeader">
                <span className="dayBadge">Day {item.day}</span>
                <span className="dayTitle">{item.title}</span>
              </div>
              {item.activities.map((act, i) => (
                <p key={i}>□ {act}</p>
              ))}
            </div>
          ))}
      </div>
      {itinerary.length > 0 && (
        <button className="clearButton" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
}
