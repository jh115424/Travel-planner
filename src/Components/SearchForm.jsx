import { useState } from "react";
import "./searchForm.css";
import { askAI } from "../api";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const [day, setDays] = useState(5);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
              <p>
                Day {item.day}: {item.title}
              </p>
              {item.activities.map((act, i) => (
                <p key={i}>{act}</p>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
