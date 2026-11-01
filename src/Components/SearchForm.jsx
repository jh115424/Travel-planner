import { useState } from "react";
import "./searchForm.css";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const [day, setDays] = useState(5);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const button = [3, 7, 10, 4];

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
            return <button key={btn} onClick={() => setDays(btn)}>{btn}</button>;
          })}
          
        </div>
      </div>
    </div>
  );
}

// Step 2 — SearchForm component
// Create SearchForm.jsx. Think about what data this form needs from App to work, and what it needs to be able to change.
// It needs a city text input, the 4 day pill options, and a Generate button.
// Figure out what props it needs and what the active pill needs to look different from the others.

// Step 3 — DayCard component
// Create DayCard.jsx. It displays one single day’s information.
// Think about what a day object would contain and how you’d display each piece of it.

// Step 4 — ItineraryResults component
// Create ItineraryResults.jsx. It receives the full list of days and
//  is responsible for rendering them. Think about how you’d loop through that list.

// Step 5 — ScrollIndicator component
// Create ScrollIndicator.jsx. Static. One line of text at the bottom.

// Step 6 — App.jsx structure
// This is where all state lives. Think about what data the app needs to track
//  across all components. Wire everything together and pass down what each component needs.
// handleGenerate is a placeholder for now.

// Step 7 — OpenAI API call
// Fill in handleGenerate for real. Think about what needs to happen before, during,
// and after the API call, and what format you need to tell the AI to respond in.

// Step 8 — Loading and error states
// Handle what the user sees while waiting and if something goes wrong.

// Step 9 — CSS dark theme
// Style everything to match the mockup on the side panel.
