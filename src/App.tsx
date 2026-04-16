/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import InteractiveDemo from "./components/InteractiveDemo";
import AdminPanel from "./components/AdminPanel";
import GuestInterface from "./components/GuestInterface";
import { Shield, LayoutDashboard, UserCircle, Play } from "lucide-react";

type View = "demo" | "admin" | "guest";

export default function App() {
  const [view, setView] = useState<View>("demo");

  const renderView = () => {
    switch (view) {
      case "demo":
        return <InteractiveDemo />;
      case "admin":
        return <AdminPanel />;
      case "guest":
        return <GuestInterface />;
      default:
        return <InteractiveDemo />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy text-text overflow-x-hidden">
      {/* Elegant Dark Header */}
      <header className="nx-header">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-cyan rounded shadow-[0_0_10px_var(--color-cyan)]"></div>
          <h1 className="text-lg font-black uppercase tracking-widest text-cyan">NexusResponse</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] text-text-dim uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="nx-status-dot"></span> Vertex AI: Active
          </div>
          <div className="flex items-center gap-2">
            <span className="nx-status-dot"></span> Pub/Sub Bus: Sync
          </div>
          <div className="text-cyan font-bold">{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC</div>
        </div>
      </header>

      {/* View Switcher Overlay (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-2 p-1.5 rounded-2xl bg-surface/80 backdrop-blur-md border border-border shadow-2xl">
        <button
          onClick={() => setView("demo")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            view === "demo" ? "bg-cyan text-navy shadow-lg" : "hover:bg-white/5 text-white/70"
          }`}
        >
          <Play size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Demo</span>
        </button>
        <button
          onClick={() => setView("admin")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            view === "admin" ? "bg-amber text-navy shadow-lg" : "hover:bg-white/5 text-white/70"
          }`}
        >
          <LayoutDashboard size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Admin</span>
        </button>
        <button
          onClick={() => setView("guest")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            view === "guest" ? "bg-green text-navy shadow-lg" : "hover:bg-white/5 text-white/70"
          }`}
        >
          <UserCircle size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Guest</span>
        </button>
      </div>

      <main className="flex-1 relative">
        {renderView()}
      </main>
    </div>
  );
}
