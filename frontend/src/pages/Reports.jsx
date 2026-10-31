import { useEffect, useState } from "react";
import { Download, FileBarChart } from "lucide-react";
import { getCrops, getFarmers } from "../services/api";

export default function Reports() {
  const [farmers, setFarmers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getFarmers(), getCrops()])
      .then(([f, c]) => { setFarmers(f.data); setCrops(c.data); })
      .catch(() => setError("Unable to load report data. Check the backend connection."));
  }, []);

  const rows = farmers.map(farmer => {
    const records = crops.filter(c => c.farmer?.id === farmer.id);
    return { ...farmer, count: records.length, area: records.reduce((sum, c) => sum + (Number(c.areaInAcres) || 0), 0) };
  });

  const exportCsv = () => {
    const header = ["Farmer", "Email", "Crop Count", "Total Area (Acres)"];
    const data = rows.map(r => [r.name, r.email, r.count, r.area]);
    const csv = [header, ...data].map(row => row.map(value => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url; link.download = "trans-agro-farmer-report.csv"; link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="page">
      <div className="page-heading"><div><div className="eyebrow">INSIGHTS</div><h1>Agricultural reports</h1><p>Farmer-wise summary of registered crop activity.</p></div><button className="primary-link button-link" onClick={exportCsv}><Download size={16}/> Export CSV</button></div>
      {error && <div className="alert error">{error}</div>}
      <div className="report-summary"><div className="report-icon"><FileBarChart size={24}/></div><div><span>Farmers included</span><strong>{farmers.length}</strong></div><div><span>Total crop records</span><strong>{crops.length}</strong></div><div><span>Total cultivated area</span><strong>{crops.reduce((s,c) => s + (Number(c.areaInAcres)||0),0)} ac</strong></div></div>
      <div className="content-card"><div className="card-heading"><div><h2>Farmer-wise crop report</h2><p>Crop count and cultivated area by farmer.</p></div></div>
        <div className="table-wrap"><table><thead><tr><th>Farmer</th><th>Email</th><th>Total crops</th><th>Total area</th></tr></thead><tbody>
          {rows.map(r => <tr key={r.id}><td><strong>{r.name}</strong></td><td>{r.email}</td><td>{r.count}</td><td>{r.area} acres</td></tr>)}
          {rows.length === 0 && <tr><td colSpan="4" className="empty">No report data available yet.</td></tr>}
        </tbody></table></div>
      </div>
    </section>
  );
}
