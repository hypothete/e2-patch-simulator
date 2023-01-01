import React, { useState } from "react";
import "./App.css";
import Graph from "./Graph";

function App() {
  const [patches, setPatches] = useState(1);
  const [spread, setSpread] = useState(168);
  const period = 672;
  return (
    <div className="App">
      <Graph patches={patches} spread={spread} period={period} />
      <div className="AppControl">
        <label>
          <span>New patches per application: {patches}</span>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={patches}
            onInput={(e) => setPatches(e.currentTarget.valueAsNumber)}
          />
        </label>
      </div>
      <div className="AppControl">
        <label>
          <span>Time between new patches: {spread} hours</span>
          <input
            type="range"
            min="24"
            max="168"
            step="6"
            value={spread}
            onInput={(e) => setSpread(e.currentTarget.valueAsNumber)}
          />
        </label>
      </div>
      <p>Patches used per month: {patches * Math.ceil(period / spread)}</p>
      <p>
        0.1mg patches are each left on for a week.
      </p>
    </div>
  );
}

export default App;
