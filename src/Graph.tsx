import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import rawValues from "./values-week.json";
import "./Graph.css";

interface GraphProps {
  patches: number;
  spread: number;
  period: number;
  worn: number;
  showPatches: boolean;
}

interface SeriesData {
  time: number;
  value: number;
}

interface PatchSeriesData {
  name: string;
  time: number;
  value: [number, number];
}

function Graph({ patches, spread, period, worn, showPatches }: GraphProps) {
  const newSeries = generateSeries(patches, spread, period, worn);
  const newPatchSeries = generatePatches(patches, spread, period, worn);
  const ticks = getTicks(period, 24 * 7);

  const PatchChart = useMemo(() => {
    return (
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={newPatchSeries}
          maxBarSize={period}
          margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
        >
          <CartesianGrid stroke="#666666" strokeWidth={1} />
          <Bar
            dataKey="value"
            barSize={5}
            background={false}
            fill="#F5A9B8"
            isAnimationActive={false}
            yAxisId="valueAxis"
            xAxisId="timeAxis"
          />
          <XAxis
            type="number"
            dataKey="time"
            xAxisId="timeAxis"
            ticks={ticks}
            interval="preserveStartEnd"
            domain={[0, period]}
            allowDataOverflow={true}
            height={40}
            label={{ value: "Time (hours)", position: "insideBottom" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            yAxisId="valueAxis"
            interval="preserveStartEnd"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }, [newPatchSeries, period, ticks]);

  const E2LineChart = useMemo(() => {
    return (
      <ResponsiveContainer>
        <LineChart
          data={newSeries}
          margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
        >
          <YAxis
            dataKey="value"
            yAxisId="valueAxis"
            width={80}
            label={{
              value: "E2 concentration (pg/mL)",
              angle: -90,
              position: "inside",
            }}
          />
          <XAxis
            dataKey="time"
            height={40}
            ticks={ticks}
            interval="preserveStartEnd"
            label={{ value: "Time (hours)", position: "insideBottom" }}
          />
          <Tooltip />
          <CartesianGrid stroke="#666666" strokeWidth={1} />
          <Line
            yAxisId="valueAxis"
            type="monotone"
            dot={false}
            dataKey="value"
            stroke="#F5A9B8"
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }, [newSeries, ticks]);

  return (
    <div className="Graph">
      {!showPatches && E2LineChart}
      {showPatches && PatchChart}
    </div>
  );
}

export default Graph;

function generateSeries(
  patches: number,
  spread: number,
  period: number,
  worn: number
): SeriesData[] {
  let newValues: SeriesData[] = new Array(period);
  newValues.fill({ time: 0, value: 0 });
  const spreadsPerPeriod = Math.ceil(period / spread);
  for (let i = 0; i < spreadsPerPeriod; i++) {
    const spreadOffset = i * spread;

    newValues = newValues.map((item, index) => {
      let rawValueIndex = index - spreadOffset;
      let rawValueAtTime = 0;
      if (rawValueIndex > worn) {
        const dropoffDist = rawValueIndex - worn;
        rawValueAtTime = rawValues[rawValues.length - 1] / dropoffDist;
      } else {
        rawValueAtTime = rawValues[rawValueIndex];
      }
      return {
        time: index,
        value: item.value + patches * (rawValueAtTime || 0),
      };
    });
  }
  return newValues;
}

function generatePatches(
  patches: number,
  spread: number,
  period: number,
  worn: number
): PatchSeriesData[] {
  const patchData: PatchSeriesData[] = [];
  const spreadsPerPeriod = Math.ceil(period / spread);
  let patchTally = 0;
  for (let i = 0; i < spreadsPerPeriod; i++) {
    const spreadOffset = i * spread;
    for (let j = 0; j < patches; j++) {
      patchData.push({
        name: `Patch ${patchTally + 1}`,
        time: spreadOffset,
        value: [spreadOffset, spreadOffset + worn],
      });
      patchTally++;
    }
  }
  return patchData.reverse();
}

function getTicks(period: number, divider: number): number[] {
  const tickCount = period / divider;
  const tickArray = new Array(tickCount + 1);
  tickArray.fill(0);
  return tickArray.map((tick, tickIndex) => tickIndex * divider);
}
