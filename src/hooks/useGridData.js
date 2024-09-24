import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const useGridData = (tabName) => {
  const [gridData, setGridData] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGridData = useCallback(async () => {
    setIsDataLoading(true);
    if (!tabName) {
      setGridData([]);
    } else {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/sheet-data/${tabName}`
        );
        console.log(response.data);
        setGridData(
            response.data.map((row) => row.map((cell) => parseInt(cell) || cell))
        );
        setIsDataLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setIsDataLoading(false);
      }
    }
  }, [tabName]);

  useEffect(() => {
    (async () => {
      setIsTabLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/tabs`);
        setTabs(response.data);
        setIsTabLoading(false);
      } catch (error) {
        setError("Error fetching tabs");
        setIsTabLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    fetchGridData(tabName);
  }, [tabName, fetchGridData]);

  return { tabs, gridData, isTabLoading, isDataLoading, error };
};
