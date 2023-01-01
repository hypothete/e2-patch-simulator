import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import rawValues from "./values-week.json";

interface GraphProps {
  patches: number;
  spread: number;
  period: number;
}

interface SeriesData {
  time: number;
  value: number;
  patches: number;
}

function Graph({ patches, spread, period }: GraphProps) {
  const newSeries = generateSeries(patches, spread, period);
  return (
    <div style={{ width: 600, height: 300, margin: '0 auto' }}>
      <ResponsiveContainer>
        <LineChart
          data={newSeries}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <YAxis
            dataKey="value"
            label={{
              value: "E2 concentration (pg/mL)",
              angle: -90,
              position: "inside",
            }}
          />
          <XAxis
            dataKey="time"
            label={{ value: "Time (hours)", position: "insideBottom" }}
          />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dot={false} dataKey="value" stroke="#ff7300" isAnimationActive={true} />
          <Line type="monotone" dot={false} dataKey="patches" stroke="#0073ff" isAnimationActive={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;

function generateSeries(patches: number, spread: number, period: number): SeriesData[] {
  let newValues: SeriesData[] = new Array(period);
  newValues.fill({ time: 0, value: 0, patches: 0 });
  const spreadsPerPeriod = Math.ceil(period / spread);
  for (let i = 0; i < spreadsPerPeriod; i++) {
    const spreadOffset = i * spread;
    newValues = newValues.map((item, index) => {
      return {
        time: index,
        value: item.value + patches * (rawValues[((index - spreadOffset))] || 0),
        patches: item.patches
      };
    });
  }
  return newValues;
}
