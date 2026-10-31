import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Users, X } from "lucide-react";
import { addFarmer, deleteFarmer, getFarmers, updateFarmer } from "../services/api";

const emptyForm = { name: "", email: "", phone: "", address: "" };

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadFarmers = async () => {
    try { const response = await getFarmers(); setFarmers(response.data); setError(""); }
    catch { setError("Unable to load farmers. Make sure the backend is running."); }
  };
  useEffect(() => { loadFarmers(); }, []);

  const filtered = useMemo(() => farmers.filter(f =>
    [f.name, f.email, f.phone, f.address].some(v => (v || "").toLowerCase().includes(search.toLowerCase()))
  ), [farmers, search]);

  const handleSubmit = async e => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (editingId) await updateFarmer(editingId, form);
      else await addFarmer(form);
      setForm(emptyForm); setEditingId(null); await loadFarmers();
    } catch (err) {
      setError(err.response?.data?.error || Object.values(err.response?.data || {})[0] || "Could not save farmer. Check the details and try again.");
    } finally { setSaving(false); }
  };

  const startEdit = farmer => {
    setEditingId(farmer.id);
    setForm({ name: farmer.name, email: farmer.email, phone: farmer.phone, address: farmer.address });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async id => {
    if (!window.confirm("Delete this farmer? Farmers with registered crops cannot be deleted.")) return;
    try { await deleteFarmer(id); await loadFarmers(); }
    catch (err) { setError(err.response?.data?.error || "Could not delete farmer. Delete linked crop records first."); }
  };

  return (
    <section className="page">
      <div className="page-heading"><div><div className="eyebrow">DIRECTORY</div><h1>Farmer management</h1><p>Register and maintain farmer profiles.</p></div><div className="count-chip"><Users size={16} /> {farmers.length} farmers</div></div>
      {error && <div className="alert error">{error}</div>}
      <div className="content-card form-panel"><div className="card-heading"><div><h2>{editingId ? "Update farmer" : "Register a farmer"}</h2><p>Enter the farmer's contact and location details.</p></div>{editingId && <button className="secondary-button" onClick={() => { setEditingId(null); setForm(emptyForm); }}><X size={15}/> Cancel</button>}</div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>Full name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="e.g. Rahul Patil" /></label>
          <label>Email address<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="name@example.com" /></label>
          <label>Phone number<input required value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="10-digit phone number" /></label>
          <label>Address<input required value={form.address} onChange={e => setForm({...form, address:e.target.value})} placeholder="Village, District, State" /></label>
          <div className="form-actions"><button className="primary-button" disabled={saving}>{saving ? "Saving..." : editingId ? "Save changes" : "Register farmer"}</button></div>
        </form>
      </div>
      <div className="content-card"><div className="card-heading"><div><h2>Registered farmers</h2><p>Search and manage farmer records.</p></div><div className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search farmers..." /></div></div>
        <div className="table-wrap"><table><thead><tr><th>Farmer</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th></tr></thead><tbody>
          {filtered.map(f => <tr key={f.id}><td><strong>{f.name}</strong><small className="sub-cell">Farmer ID #{f.id}</small></td><td>{f.email}</td><td>{f.phone}</td><td>{f.address}</td><td><div className="action-group"><button className="small-action edit" onClick={() => startEdit(f)}>Edit</button><button className="small-action delete" onClick={() => remove(f.id)} aria-label={`Delete ${f.name}`}><Trash2 size={15}/></button></div></td></tr>)}
          {filtered.length === 0 && <tr><td colSpan="5" className="empty">No farmers found.</td></tr>}
        </tbody></table></div>
      </div>
    </section>
  );
}
