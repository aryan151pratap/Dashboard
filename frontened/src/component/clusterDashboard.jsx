import React, { useState } from 'react';

const ClusterDashboard = ({ clusterData }) => {
  const [view, setView] = useState('actual');
  const [selectedDbs, setSelectedDbs] = useState([]);

  const mainDatabases = clusterData.databases;
  const dbMeta = clusterData.dbs;
  const { totalSizeMb, ok, $clusterTime, operationTime } = dbMeta;

  const handleCheckboxChange = (dbName) => {
    setSelectedDbs((prev) =>
      prev.includes(dbName) ? prev.filter((name) => name !== dbName) : [...prev, dbName]
    );
  };

  const getFilteredDatabases = () => {
    if (view === 'actual') return mainDatabases.filter((db) => db.name !== 'local' && db.name !== 'admin');
    if (view === 'local') return mainDatabases;
    return mainDatabases.filter((db) => selectedDbs.includes(db.name));
  };

  const filteredDatabases = getFilteredDatabases();

  const totalBytes = filteredDatabases.reduce((acc, db) => acc + db.disk_size, 0);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

  const formatTimestamp = (ts) => {
    if (!ts?.$timestamp) return 'N/A';
    try {
      const bigIntTimestamp = BigInt(ts.$timestamp);
      const seconds = Number(bigIntTimestamp >> 32n);
      return new Date(seconds * 1000).toLocaleString();
    } catch (err) {
      console.error('Invalid timestamp:', err);
      return 'Invalid Timestamp';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">MongoDB Cluster Overview</h1>
            <p className="text-gray-600 mt-1">{clusterData.name}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <p className="font-medium text-gray-700">Cluster Status</p>
            <div className="flex items-center mt-1">
              <div className={`w-3 h-3 rounded-full mr-2 ${ok === 1 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-semibold ${ok === 1 ? 'text-green-600' : 'text-red-500'}`}>
                {ok === 1 ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Cluster Info Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Connection Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Cluster URI</p>
              <p className="mt-1 text-blue-600 font-mono break-all">{clusterData.uri}</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Cluster Time</p>
                <p className="mt-1 text-gray-800">{formatTimestamp($clusterTime?.clusterTime)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Operation Time</p>
                <p className="mt-1 text-gray-800">{formatTimestamp(operationTime)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Database View</h3>
          <div className="flex flex-wrap gap-3">
            <button
              className={`px-4 py-2 rounded-lg transition-all ${
                view === 'actual'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setView('actual')}
            >
              User Storage
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all ${
                view === 'local'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setView('local')}
            >
              Full Cluster Storage
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all ${
                view === 'custom'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setView('custom')}
            >
              Custom Selection
            </button>
          </div>

          {/* Custom Selection Checkboxes */}
          {view === 'custom' && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-gray-700 font-medium mb-3">Select Databases</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {mainDatabases.map((db) => (
                  <label
                    key={db.name}
                    className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDbs.includes(db.name)}
                      onChange={() => handleCheckboxChange(db.name)}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{db.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-lg p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Size</p>
                <p className="text-2xl font-bold text-gray-800">{totalMB} MB</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-lg p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Databases</p>
                <p className="text-2xl font-bold text-gray-800">{filteredDatabases.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-500 rounded-lg p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-2xl font-bold text-gray-800">{ok === 1 ? 'Online' : 'Offline'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Database Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Databases</h3>
            <p className="text-gray-600 text-sm mt-1">
              Showing {filteredDatabases.length} database{filteredDatabases.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Database
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size (MB)
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collections
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDatabases.map((db, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{db.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {(db.disk_size / (1024 * 1024)).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {db.collections?.length || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDatabases.length === 0 && (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <p className="mt-3 text-gray-500">No databases match the current view selection</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClusterDashboard;