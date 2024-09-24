import React, { useState, useMemo } from "react";
import GridCells from "../components/GridCells";
import { solveWaterFlow } from "../utils/utils";
import { useGridData } from "../hooks/useGridData";
import Scenarios from "../components/Scenarios";

const IslandWaterFlow = () => {
  const [tabName, setTabName] = useState("");
  const { gridData, tabs, isTabLoading, isDataLoading, error } =
    useGridData(tabName);
  const flowingCells = useMemo(() => {
    if (gridData.length === 0) return [];
    const result = solveWaterFlow(gridData);
    return result.map((row) => row.map((cell) => (cell ? 1 : 0)));
  }, [gridData]);

  const flowingCellsSum = useMemo(() => {
    return flowingCells.reduce((sum, row) => {
      return sum + row.reduce((rowSum, cell) => rowSum + cell, 0);
    }, 0);
  }, [flowingCells]);

  return (
    <div className="container mx-auto px-4 py-8">
      {isTabLoading ? (
        <div className="text-center">
          <p className="text-lg">Loading scenarios...</p>
        </div>
      ) : error ? (
        <p>Fetch error</p>
      ) : (
        <div className="space-y-8">
          <Scenarios tabs={tabs} tabName={tabName} setTabName={setTabName} isTabLoading= {isTabLoading}/>
          {isDataLoading ? (
            <div className="text-center">
              <p className="text-lg">Loading data...</p>
            </div>
          ) :(
            <div className="flex flex-wrap justify-center gap-8">
              <GridCells
                data={gridData}
                highlightCells={solveWaterFlow(gridData)}
                title="Initial Cells"
              />
              <GridCells
                data={flowingCells}
                highlightCells={solveWaterFlow(gridData)}
                title="Flowing Cells"
              />
              <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Output</h2>
                <p className="text-4xl font-bold">{flowingCellsSum}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IslandWaterFlow;
