import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1"];

const BreachPieChart = ({ data, title }) => (
  <div className="w-full md:w-1/2 p-4">
    <h3 className="text-md font-semibold mb-2 text-center">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const BreachTimelineCard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/alerts/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAlerts(data.alerts || []);
      } catch (err) {
        setError("Failed to fetch alerts");
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  // Prepare data for Pie Chart by Source
  const sourceCounts = {};
  alerts.forEach(alert => {
    sourceCounts[alert.source] = (sourceCounts[alert.source] || 0) + 1;
  });
  const pieDataSource = Object.entries(sourceCounts).map(([name, value]) => ({ name, value }));

  // Prepare data for Pie Chart by Identity Type
  const typeCounts = {};
  alerts.forEach(alert => {
    typeCounts[alert.identityType] = (typeCounts[alert.identityType] || 0) + 1;
  });
  const pieDataType = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-[#1c104e] p-6 rounded-lg shadow text-white">
      <h2 className="text-lg font-semibold mb-4">Breach Timeline (Pie Charts)</h2>
      {loading ? (
        <div className="text-center text-gray-300">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : alerts.length === 0 ? (
        <div className="text-center text-gray-400">No alerts found.</div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center">
          <BreachPieChart data={pieDataSource} title="Breaches by Source" />
          <BreachPieChart data={pieDataType} title="Breaches by Identity Type" />
        </div>
      )}
    </div>
  );
};

export default BreachTimelineCard;
