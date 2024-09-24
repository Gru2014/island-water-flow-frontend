import React from "react";

const GridCells = ({ data, highlightCells, title }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`
                      border border-gray-300 p-2 text-center
                      ${
                        highlightCells[rowIndex][cellIndex]
                          ? "bg-blue-300"
                          : "bg-white"
                      }
                      transition-colors duration-300 ease-in-out
                    `}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GridCells;
