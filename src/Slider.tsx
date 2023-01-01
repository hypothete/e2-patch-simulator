import React from "react";
import "./Slider.css";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  label: string;
  value: number;
  setValue: (n: number) => void;
}

function Slider({ min, max, step, label, value, setValue }: SliderProps) {
  return (
    <div className="Slider">
      <label>
        <span className="SliderLabel">
          {label}:{" "}
        </span>
        <span className="SliderValue">
        {value}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={(e) => setValue(e.currentTarget.valueAsNumber)}
        />
      </label>
    </div>
  );
}

export default Slider;