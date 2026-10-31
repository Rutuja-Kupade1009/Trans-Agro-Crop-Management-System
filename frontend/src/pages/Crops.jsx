import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Sprout, X } from "lucide-react";
import { addCrop, deleteCrop, getCrops, getFarmers, updateCrop } from "../services/api";

const emptyForm = { cropName: "", cropType: "", season: "", areaInAcres: "", farmerId: "" };

export default function Crops() {
  const [crops, setCrops] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      const [cropRes, farmerRes] = await Promise.all([getCrops(), getFarmers()]);
      setCrops(cropRes.data); setFarmers(farmerRes.data); setError("");
    } catch { setError("Unable to load crop records. Check the backend connection."); }
  };
  useEffect(() => { loadData(); }, []);

  const filtered = useMemo(() => crops.filter(c =>
    [c.cropName, c.cropType, c.season, c.farmer?.name].some(v => (v || "").toLowerCase().includes(search.toLowerCase()))
  ), [crops, search]);

  const submit = async e => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const payload = { cropName: form.cropName, cropType: form.cropType, season: form.season, areaInAcres: Number(form.areaInAcres) };
      if (editingId) await updateCrop(editingId, payload);
      else await addCrop(form.farmerId, payload);
      setForm(emptyForm); setEditingId(null); await loadData();
    } catch (err) {
      setError(err.response?.data?.error || Object.values(err.response?.data || {})[0] || "Could not save crop. Check the details and try again.");
    } finally { setSaving(false); }
  };

  const edit = crop => {
    setEditingId(crop.id);
    setForm({ cropName: crop.cropName, cropType: crop.cropType, season: crop.season, areaInAcres: crop.areaInAcres, farmerId: crop.farmer?.id || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async id => {
    if (!window.confirm("Delete this crop record?")) return;
    try { await deleteCrop(id); await loadData(); }
    catch { setError("Unable to delete crop."); }
  };

  return (
    <section className="page">
      <div className="page-heading"><div><div className="eyebrow">CULTIVATION</div><h1>Crop management</h1><p>Register crops and track cultivation details.</p></div><div className="count-chip"><Sprout size={16}/> {crops.length} crop records</div></div>
      {error && <div className="alert error">{error}</div>}
      <div className="content-card form-panel"><div className="card-heading"><div><h2>{editingId ? "Update crop" : "Register a crop"}</h2><p>Add crop details and associate them with a farmer.</p></div>{editingId && <button className="secondary-button" onClick={() => {setEditingId(null);setForm(emptyForm);}}><X size={15}/> Cancel</button>}</div>
        {farmers.length === 0 && <div className="alert info">Register a farmer before adding a crop.</div>}
        <form className="form-grid" onSubmit={submit}>
          <label>Crop name<input required value={form.cropName} onChange={e => setForm({...form,cropName:e.target.value})} placeholder="e.g. Wheat" /></label>
          <label>Crop category<select required value={form.cropType} onChange={e => setForm({...form,cropType:e.target.value})}><option value="">Select category</option><option>Food Crop</option><option>Cash Crop</option><option>Vegetable</option><option>Fruit</option></select></label>
          <label>Growing season<select required value={form.season} onChange={e => setForm({...form,season:e.target.value})}><option value="">Select season</option><option>Kharif</option><option>Rabi</option><option>Zaid</option><option>Annual</option></select></label>
          <label>Area (acres)<input required type="number" min="0.01" step="0.01" value={form.areaInAcres} onChange={e => setForm({...form,areaInAcres:e.target.value})} placeholder="e.g. 5.5" /></label>
          {!editingId && <label>Farmer<select required value={form.farmerId} onChange={e => setForm({...form,farmerId:e.target.value})}><option value="">Select farmer</option>{farmers.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}</select></label>}
          <div className="form-actions"><button className="primary-button" disabled={saving || (!editingId && farmers.length === 0)}>{saving ? "Saving..." : editingId ? "Save changes" : "Register crop"}</button></div>
        </form>
      </div>
      <div className="content-card"><div className="card-heading"><div><h2>Crop records</h2><p>All registered crops across farmers.</p></div><div className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search crops..." /></div></div>
        <div className="table-wrap"><table><thead><tr><th>Crop</th><th>Category</th><th>Season</th><th>Farmer</th><th>Area</th><th>Actions</th></tr></thead><tbody>
          {filtered.map(c => <tr key={c.id}><td><strong>{c.cropName}</strong><small className="sub-cell">Crop ID #{c.id}</small></td><td>{c.cropType}</td><td><span className="season-pill">{c.season}</span></td><td>{c.farmer?.name || "—"}</td><td>{c.areaInAcres} acres</td><td><div className="action-group"><button className="small-action edit" onClick={() => edit(c)}>Edit</button><button className="small-action delete" onClick={() => remove(c.id)} aria-label={`Delete ${c.cropName}`}><Trash2 size={15}/></button></div></td></tr>)}
          {filtered.length === 0 && <tr><td colSpan="6" className="empty">No crop records found.</td></tr>}
        </tbody></table></div>
      </div>
    </section>
  );
}
