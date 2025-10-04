import React, { useEffect, useState } from "react";
import TrafficLight from "./TrafficLight";
import { fetchTrafficData, TrafficData } from "../api/api";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TrafficData[]>([]);
  const [latest, setLatest] = useState<TrafficData | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const allData = await fetchTrafficData();
      setData(allData);
      setLatest(allData[0]); // latest entry
    }, 2000); // fetch every 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Smart Traffic Dashboard</h1>

      {latest && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Current Traffic</h2>
          <TrafficLight road={latest.road} />
          <p className="mt-2">
            Road: {latest.road} | IR1: {latest.ir1} | IR2: {latest.ir2} | IR3:{" "}
            {latest.ir3}
          </p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Traffic History</h2>
      <table className="w-full text-left border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Road</th>
            <th className="px-4 py-2">IR1</th>
            <th className="px-4 py-2">IR2</th>
            <th className="px-4 py-2">IR3</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t border-gray-300">
              <td className="px-4 py-2">{row.id}</td>
              <td className="px-4 py-2">{row.road}</td>
              <td className="px-4 py-2">{row.ir1}</td>
              <td className="px-4 py-2">{row.ir2}</td>
              <td className="px-4 py-2">{row.ir3}</td>
              <td className="px-4 py-2">{row.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
