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
    <div className="w-full border-2 overflow-auto">
      <div className="h-10 w-full bg-zinc-200">
        
      </div>
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
                    className="max-h-[300px] min-h-[100px] border border-gray-300 px-4 py-2 overflow-auto"
                  >
                    {typeof value === "object" ? 
                      <pre className="">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                      : 
                      <p className="max-h-[200px] min-h-[100px] max-w-[400px] min-w-[200px] break-all overflow-auto">
                        {String(value ?? "")}
                      </p>
                      
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
