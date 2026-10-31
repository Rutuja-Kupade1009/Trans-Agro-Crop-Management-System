import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Sprout, FileText, Leaf } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand"><span className="brand-icon"><Leaf size={23} /></span><span>Trans-Agro</span></div>
      <div className="nav-label">WORKSPACE</div>
      <nav className="side-nav">
        <NavLink to="/" end><LayoutDashboard size={19} /> Dashboard</NavLink>
        <NavLink to="/farmers"><Users size={19} /> Farmers</NavLink>
        <NavLink to="/crops"><Sprout size={19} /> Crops</NavLink>
        <NavLink to="/reports"><FileText size={19} /> Reports</NavLink>
      </nav>
      <div className="sidebar-bottom"><div className="help-dot">?</div><div><strong>Need help?</strong><small>Manage your farm records</small></div></div>
    </aside>
  );
}
