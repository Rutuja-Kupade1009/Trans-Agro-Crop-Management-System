import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-search"><Search size={17} /><span>Farm management workspace</span></div>
      <div className="topbar-right"><button className="icon-button" aria-label="Notifications"><Bell size={19} /></button><div className="avatar">A</div><div className="user-meta"><strong>Admin</strong><small>Administrator</small></div></div>
    </header>
  );
}
