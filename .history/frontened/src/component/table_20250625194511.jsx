import React from "react";

function Table({ 
  collection,
  headerHeight = "40px",
  cellMinHeight = "100px",
  cellMaxHeight = "300px",
  cellMinWidth = "200px",
  cellMaxWidth = "400px"
}) {

  const data = collection || [];

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
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((key, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left font-medium"
                style={{
                  height: headerHeight,
                  minWidth: cellMinWidth,
                  maxWidth: cellMaxWidth
                }}
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
                    className="border border-gray-300 px-4 py-2"
                    style={{
                      minHeight: cellMinHeight,
                      maxHeight: cellMaxHeight,
                      minWidth: cellMinWidth,
                      maxWidth: cellMaxWidth,
                      overflow: "auto"
                    }}
                  >
                    {typeof value === "object" ? 
                      <pre className="h-full w-full overflow-auto">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                      : 
                      <div className="h-full w-full overflow-auto">
                        {String(value ?? "")}
                      </div>
                    }
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;