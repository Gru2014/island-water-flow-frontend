import React, { useEffect } from "react";

const Scenarios = ({ tabs, tabName, setTabName, isTabLoading }) => {
  useEffect(() => {
    if (!isTabLoading) {
      setTabName(tabs[0]);
    }
  }, [tabs, setTabName, isTabLoading]);

  return (
    <div className="flex justify-center">
      <label className="flex items-center space-x-4">
        <span className="text-xl font-semibold">Select Scenario:</span>
        <select
          className="form-select border-2 border-gray-300 rounded-md p-2"
          value={tabName}
          onChange={(e) => setTabName(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Scenarios;
