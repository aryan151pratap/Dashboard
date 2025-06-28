import React, { useState, useEffect, useRef } from "react";

function Table({ collection }) {
  const data = collection || [];
  const [rowHeight, setRowHeight] = useState("min-h-[50px] max-h-[100px]");
  const [colWidth, setColWidth] = useState("min-w-[200px] max-w-[400px]");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState("");
  const [jumpRow, setJumpRow] = useState("");
  const [jumpCol, setJumpCol] = useState("");
  const [highlightedCell, setHighlightedCell] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableRef = useRef(null);

  const getAllKeys = (data) => {
    const keySet = new Set();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => keySet.add(key));
    });
    return Array.from(keySet);
  };

  const headers = getAllKeys(data);

  // Sort data
  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle different data types
        if (typeof aValue === 'object') aValue = JSON.stringify(aValue);
        if (typeof bValue === 'object') bValue = JSON.stringify(bValue);
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Filter data
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return sortedData;
    
    return sortedData.filter(item => {
      return Object.values(item).some(value => {
        if (value === null || value === undefined) return false;
        const stringValue = typeof value === 'object' 
          ? JSON.stringify(value).toLowerCase() 
          : String(value).toLowerCase();
        return stringValue.includes(searchTerm.toLowerCase());
      });
    });
  }, [sortedData, searchTerm]);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  // Jump to cell
  const handleJumpToCell = () => {
    const rowIndex = parseInt(jumpRow);
    const colKey = jumpCol;
    
    if (isNaN(rowIndex)) return;
    if (rowIndex < 0 || rowIndex >= filteredData.length) return;
    if (!headers.includes(colKey)) return;
    
    const cellId = `cell-${rowIndex}-${colKey}`;
    const cellElement = document.getElementById(cellId);
    
    if (cellElement) {
      cellElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Highlight cell temporarily
      setHighlightedCell({ rowIndex, colKey });
      setTimeout(() => setHighlightedCell(null), 3000);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Controls Bar */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Search across all data..."
              className="w-full p-3 pl-11 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button 
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Display Settings */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Display Settings</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs text-gray-500 mb-1">Row Height</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setRowHeight(e.target.value)}
                    value={rowHeight}
                  >
                    <option value="min-h-[10px] max-h-[50px]">Small</option>
                    <option value="min-h-[50px] max-h-[100px]">Medium</option>
                    <option value="min-h-[200px] max-h-[300px]">Large</option>
                  </select>
                </div>
                
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs text-gray-500 mb-1">Column Width</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setColWidth(e.target.value)}
                    value={colWidth}
                  >
                    <option value="min-w-[100px] max-w-[200px]">Narrow</option>
                    <option value="min-w-[200px] max-w-[400px]">Medium</option>
                    <option value="min-w-[300px] max-w-[600px]">Wide</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Navigate to Cell</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[100px]">
                  <label className="block text-xs text-gray-500 mb-1">Row #</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max={filteredData.length - 1}
                    value={jumpRow}
                    onChange={(e) => setJumpRow(e.target.value)}
                  />
                </div>
                
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs text-gray-500 mb-1">Column</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    value={jumpCol}
                    onChange={(e) => setJumpCol(e.target.value)}
                  >
                    <option value="">Select</option>
                    {headers.map((header, index) => (
                      <option key={index} value={header}>{header}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium"
                    onClick={handleJumpToCell}
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Rows per page:</label>
                  <select
                    className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages || 1}</span>
                  </span>
                  <button
                    className="px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1">
              <span className="font-medium">Total Rows:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                {filteredData.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Columns:</span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                {headers.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Sorted by:</span>
              {sortConfig.key ? (
                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  {sortConfig.key} ({sortConfig.direction === 'ascending' ? '↑' : '↓'})
                </span>
              ) : (
                <span className="text-gray-500 text-xs">None</span>
              )}
            </div>
            {searchTerm && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Filtered:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  {filteredData.length} matches
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="h-[70vh] overflow-y-auto bg-white" ref={tableRef}>
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-50">
            <tr>
              <th className="p-3 border-b border-t border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 z-50">
                <span>#</span>
              </th>
              {headers.map((key, index) => (
                <th
                  key={index}
                  className="p-3 border-b border-t border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-gray-100 cursor-pointer group"
                  onClick={() => requestSort(key)}
                >
                  <div className="flex items-center justify-between">
                    <span>{key}</span>
                    {sortConfig.key === key && (
                      <span className="ml-2 text-gray-700">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                    <span className="invisible group-hover:visible text-gray-400 ml-2">
                      {!sortConfig.key || sortConfig.key !== key ? '↕' : ''}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan={headers.length + 1} className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    No matching records found
                  </div>
                </td>
              </tr>
            ) : (
              currentRows.map((item, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="hover:bg-gray-100 even:bg-gray-50 transition-colors duration-150"
                >
                  <td className="whitespace-nowrap py-3 px-3 text-sm font-medium text-gray-900 border-b border-gray-200 bg-white sticky left-0">
                    {indexOfFirstRow + rowIndex}
                  </td>
                  {headers.map((key, colIndex) => {
                    const value = item[key];
                    const globalRowIndex = indexOfFirstRow + rowIndex;
                    const isHighlighted = highlightedCell?.rowIndex === globalRowIndex && 
                                         highlightedCell?.colKey === key;
                    
                    return (
                      <td
                        key={colIndex}
                        id={`cell-${globalRowIndex}-${key}`}
                        className={`py-3 px-4 text-sm border border-gray-200 align-top ${rowHeight} ${colWidth} ${
                          isHighlighted ? 'bg-yellow-100 ring-2 ring-yellow-400' : ''
                        }`}
                      >
                        <div className="overflow-auto h-full">
                          {typeof value === "object" ? (
                            <pre className={`whitespace-pre-wrap break-words text-xs bg-gray-50 p-2 rounded overflow-auto ${rowHeight} ${colWidth}`}>
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : (
                            <div className={`whitespace-pre-wrap break-words ${rowHeight} ${colWidth}`}>
                              {value === null ? (
                                <span className="text-gray-400 italic">null</span>
                              ) : value === "" ? (
                                <span className="text-gray-400 italic">empty</span>
                              ) : (
                                String(value)
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;