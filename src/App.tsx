import React, { useState } from "react";
import "./App.css";
import Graph from "./Graph";
import Slider from "./Slider";

function App() {
  const [patches, setPatches] = useState(1);
  const [spread, setSpread] = useState(168);
  const [worn, setWorn] = useState(168);
  const period = 672; // month in hours
  return (
    <div className="App">
      <h1>0.1mg Estradiol Patch Simulator</h1>
      <div className="AppSideBySide">
        <Graph patches={patches} spread={spread} period={period} worn={worn} />
        <div className="AppControls">
          <h2>Controls</h2>
          <Slider
            min={1}
            max={4}
            step={1}
            label="New patches per application"
            value={patches}
            setValue={setPatches}
          />
          <Slider
            min={6}
            max={168}
            step={6}
            label="Hours between applications"
            value={spread}
            setValue={setSpread}
          />
          <Slider
            min={6}
            max={168}
            step={6}
            label="Hours each patch is worn"
            value={worn}
            setValue={setWorn}
          />
          <p>Patches used per month: {patches * Math.ceil(period / spread)}</p>
        </div>
      </div>
      <p>
        Data for concentration curve is a weighted average made from these
        sources:{" "}
        <a
          href="https://fda.report/DailyMed/e7e6da3b-8485-1382-61c9-e9b369018b98"
          target="_blank"
          rel="noreferrer"
        >
          FDA
        </a>{" "}
        <a
          href="https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4efb0bf-b96f-4e20-a0f2-0806ab92b2d4#ID_a032b960-d797-4536-83f0-841075cabfff"
          target="_blank"
          rel="noreferrer"
        >
          NLH
        </a>
      </p>
    </div>
  );
}

export default App;
