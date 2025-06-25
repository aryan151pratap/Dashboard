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
    <div className="w-full max-w-full border overflow-x-auto">
      <div className="h-12 w-full bg-zinc-200 flex items-center px-4 font-semibold text-gray-700">
        {/* Header Label (optional) */}
        Collection Table
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="min-w-[800px] w-full border border-gray-300 text-sm">
          <thead className="sticky top-0 bg-gray-100 z-10">
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
                      className="border border-gray-300 px-4 py-2 align-top max-w-[400px] min-w-[150px] overflow-auto"
                    >
                      {typeof value === "object" ? (
                        <pre className="whitespace-pre-wrap break-words text-xs">
                          {JSON.stringify(value, null, 2)}
                        </pre>
                      ) : (
                        <p className="break-words whitespace-pre-wrap text-sm">
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
