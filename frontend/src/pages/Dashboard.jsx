import { useEffect, useState } from "react";
import { Users, Sprout, LandPlot, Layers3, ArrowUpRight } from "lucide-react";
import StatCard from "../components/StatCard";
import { getFarmers, getCrops } from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [farmers, setFarmers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [farmerResponse, cropResponse] = await Promise.all([getFarmers(), getCrops()]);
      setFarmers(farmerResponse.data);
      setCrops(cropResponse.data);
      setError("");
    } catch {
      setError("Could not connect to the backend. Start Spring Boot and check your MySQL configuration.");
    }
  };

  useEffect(() => { loadData(); }, []);

  const area = crops.reduce((sum, crop) => sum + (Number(crop.areaInAcres) || 0), 0);
  const cropTypes = new Set(crops.map(crop => crop.cropType)).size;
  const recentCrops = [...crops].reverse().slice(0, 5);

  return (
    <section className="page">
      <div className="page-heading"><div><div className="eyebrow">OVERVIEW</div><h1>Dashboard</h1><p>Here's what's happening across your agricultural operations.</p></div><Link className="primary-link" to="/crops">+ Add new crop</Link></div>
      {error && <div className="alert error">{error}</div>}
      <div className="stats-grid">
        <StatCard title="Total farmers" value={farmers.length} note="Registered farmers" icon={Users} tone="green" />
        <StatCard title="Registered crops" value={crops.length} note="Crop records in system" icon={Sprout} tone="blue" />
        <StatCard title="Cultivated area" value={`${area.toLocaleString()} ac`} note="Total registered land" icon={LandPlot} tone="amber" />
        <StatCard title="Crop categories" value={cropTypes} note="Different crop types" icon={Layers3} tone="violet" />
      </div>
      <div className="content-card">
        <div className="card-heading"><div><h2>Recent crop registrations</h2><p>Latest crop records added to the system</p></div><Link to="/crops" className="text-link">View all <ArrowUpRight size={15} /></Link></div>
        <div className="table-wrap"><table><thead><tr><th>Crop</th><th>Category</th><th>Season</th><th>Farmer</th><th>Area</th></tr></thead>
          <tbody>{recentCrops.map(crop => <tr key={crop.id}><td><span className="crop-name"><span className="crop-dot">✳</span>{crop.cropName}</span></td><td>{crop.cropType}</td><td><span className="season-pill">{crop.season}</span></td><td>{crop.farmer?.name || "—"}</td><td>{crop.areaInAcres} acres</td></tr>)}
          {recentCrops.length === 0 && <tr><td colSpan="5" className="empty">No crop records yet. Add your first crop to get started.</td></tr>}</tbody>
        </table></div>
      </div>
    </section>
  );
}
