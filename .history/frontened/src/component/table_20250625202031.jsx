import React, { useState } from "react";

function Table({ collection }) {
  const data = collection || [];

  const [rowHeight, setRowHeight] = useState("min-h-[100px]");
  const [colWidth, setColWidth] = useState("min-w-[200px] max-w-[400px]");

  const getAllKeys = (data) => {
    const keySet = new Set();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => keySet.add(key));
    });
    return Array.from(keySet);
  };

  const headers = getAllKeys(data);

  return (
    <div className="w-full border-2 overflow-x-auto">
      <div className="flex items-center justify-between p-2 bg-zinc-200">
        <div className="flex gap-4">
          <label className="text-sm">
            Row Height:
            <select
              className="ml-2 p-1 border rounded"
              onChange={(e) => setRowHeight(e.target.value)}
              value={rowHeight}
            >
              <option value="min-h-[50px] max-h-[80px]">Small</option>
              <option value="min-h-[100px] max-h-[200px]">Medium</option>
              <option value="min-h-[200px] max-h-[300px]">Large</option>
            </select>
          </label>

          <label className="text-sm">
            Column Width:
            <select
              className="ml-2 p-1 border rounded"
              onChange={(e) => setColWidth(e.target.value)}
              value={colWidth}
            >
              <option value="min-w-[150px] max-w-[250px]">Narrow</option>
              <option value="min-w-[200px] max-w-[400px]">Medium</option>
              <option value="min-w-[300px] max-w-[600px]">Wide</option>
            </select>
          </label>
        </div>
      </div>

      <div className="h-[80vh] overflow-y-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="sticky top-0 z-50 bg-gray-100">
            <tr>
              {headers.map((key, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-left font-medium"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-50">
                {headers.map((key, colIndex) => {
                  const value = item[key];
                  return (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 px-4 py-2 overflow-auto align-top ${rowHeight} ${colWidth}`}
                    >
                      {typeof value === "object" ? (
                        <pre className="whitespace-pre-wrap break-words text-xs">
                          {JSON.stringify(value, null, 2)}
                        </pre>
                      ) : (
                        <p className={`max-h-[200px] min-h-[100px] max-w-[400px] min-w-[200px] ${rowHeight} ${colWidth} break-all overflow-auto`}> 
                         {String(value ?? "")}
                        </p>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
