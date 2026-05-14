import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState({
    routeId: '', origin: '', destination: '', distance: '', estimatedDuration: ''
  });

  const fetchRoutes = async () => {
    try {
      const res = await API.get('/routes');
      setRoutes(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRoutes(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/routes', formData);
      setFormData({ routeId: '', origin: '', destination: '', distance: '', estimatedDuration: '' });
      fetchRoutes();
    } catch (err) { alert('Error adding route: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Route</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Route ID" className="border p-2 rounded" required
            value={formData.routeId} onChange={(e) => setFormData({...formData, routeId: e.target.value})} />
          <input type="text" placeholder="Origin" className="border p-2 rounded" required
            value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} />
          <input type="text" placeholder="Destination" className="border p-2 rounded" required
            value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} />
          <input type="text" placeholder="Distance (e.g. 135 km)" className="border p-2 rounded" required
            value={formData.distance} onChange={(e) => setFormData({...formData, distance: e.target.value})} />
          <input type="text" placeholder="Duration (e.g. 2h 30m)" className="border p-2 rounded md:col-span-2" required
            value={formData.estimatedDuration} onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})} />
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Add Route</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Route List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Origin</th>
                <th className="p-2 border">Destination</th>
                <th className="p-2 border">Distance</th>
                <th className="p-2 border">Duration</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r._id} className="table-row-striped">
                  <td className="p-2 border">{r.routeId}</td>
                  <td className="p-2 border">{r.origin}</td>
                  <td className="p-2 border">{r.destination}</td>
                  <td className="p-2 border">{r.distance}</td>
                  <td className="p-2 border">{r.estimatedDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Routes;
