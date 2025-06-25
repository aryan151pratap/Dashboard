import React from "react";

function Table({ collection }) {

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
    <div className="w-full">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
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
                    className="border border-gray-300 px-4 py-2 h-20 max-w-[300px] overflow-auto"
                  >
                    {typeof value === "object" ? 
                      <pre className="w-[300px] h-[50px]">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                      : 
                      <span className="h-20 break-all overflow-y-auto">
                        {String(value ?? "")}
                      </span>
                      
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
