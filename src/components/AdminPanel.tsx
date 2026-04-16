import { useState } from "react";
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  AlertCircle, 
  Map as MapIcon, 
  FileText, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Search, 
  MoreHorizontal,
  ChevronRight,
  UserCheck,
  UserX,
  History,
  Power,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type NavItem = "overview" | "roster" | "control" | "zones" | "reports";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<NavItem>("overview");
  const [isEmergency, setIsEmergency] = useState(false);

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "roster", label: "Guest Roster", icon: Users },
    { id: "control", label: "Emergency Control", icon: Power },
    { id: "zones", label: "Safety Zones", icon: Shield },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  return (
    <div className="flex h-[calc(100vh-60px)] bg-navy text-text overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col z-20">
        <div className="p-8 flex flex-col gap-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center text-amber amber-glow border border-amber/20">
              <Shield size={24} fill="currentColor" fillOpacity={0.2} />
            </div>
            <div className="flex flex-col">
              <span className="text-text font-black uppercase tracking-widest text-sm leading-tight">THE WATCH</span>
              <span className="text-amber/70 text-[10px] font-mono uppercase tracking-wider">Vigilant Sentinel</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavItem)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? "bg-amber/10 text-amber border-l-4 border-amber" 
                  : "text-text-dim hover:bg-white/5 hover:text-text"
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? "text-amber" : "text-text-dim group-hover:text-text"} />
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-4 mx-3 mb-4 rounded-xl bg-red/10 border border-red/20 group cursor-pointer hover:bg-red/20 transition-all">
          <button 
            onClick={() => setIsEmergency(true)}
            className="w-full flex items-center justify-center gap-2 py-3 text-red font-black uppercase tracking-widest text-[10px]"
          >
            <AlertCircle size={14} />
            Trigger Master Alert
          </button>
        </div>

        <div className="mt-auto py-6 px-6 border-t border-border flex flex-col gap-4">
          <button className="flex items-center gap-3 text-text-dim hover:text-text transition-colors text-xs font-bold">
            <HelpCircle size={16} /> Support
          </button>
          <button className="flex items-center gap-3 text-text-dim hover:text-text transition-colors text-xs font-bold">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top bar (Search/System) */}
        <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-border flex items-center justify-between px-10 z-10 shrink-0">
          <div className="flex items-center gap-8 flex-1">
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-navy border border-border rounded-full py-2 pl-12 pr-6 text-sm focus:outline-none focus:border-cyan/50 focus:bg-surface/50 transition-all text-text placeholder:text-text-dim/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-green/10 px-4 py-1.5 rounded-full border border-green/20">
              <div className="nx-status-dot"></div>
              <span className="text-[10px] font-bold text-green uppercase tracking-widest">Live Sync</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface border border-border overflow-hidden">
              <img 
                src="https://picsum.photos/seed/admin/200/200" 
                alt="Admin" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_top_right,rgba(0,212,255,0.02),transparent)]">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && <DashboardOverview key="overview" />}
            {activeTab === "roster" && <GuestRoster key="roster" />}
            {activeTab === "control" && <EmergencyControl key="control" onTrigger={() => setIsEmergency(true)} />}
          </AnimatePresence>
        </main>

        {/* Emergency Modal */}
        <AnimatePresence>
          {isEmergency && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 backdrop-blur-xl p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-surface border-4 border-red rounded-[2.5rem] p-12 max-w-xl w-full text-center flex flex-col items-center gap-8 shadow-[0_0_100px_rgba(255,69,69,0.2)]"
              >
                <div className="w-20 h-20 rounded-full bg-red/10 flex items-center justify-center text-red red-glow animate-pulse border border-red/30">
                  <AlertCircle size={40} />
                </div>
                <div>
                  <h2 className="text-3xl font-headline font-black mb-4 uppercase tracking-tight">Authorize Master Alert</h2>
                  <p className="text-text-dim text-sm leading-relaxed">
                    Local sirens will trigger immediately. All guest devices will transition to Emergency Mode with pathfinding overrides enabled.
                  </p>
                </div>
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => setIsEmergency(false)}
                    className="flex-1 py-4 rounded-xl bg-navy hover:bg-white/5 border border-border font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    className="nx-action-btn flex-1"
                  >
                    DEPLOY PROTOCOL
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { label: "Total Guests", value: "1,248", icon: Users, color: "cyan", trend: "+12%" },
    { label: "Checked In", value: "1,102", icon: UserCheck, color: "green", trend: "88%" },
    { label: "Not Cleared", value: "146", icon: UserX, color: "red", trend: "Action" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-10"
    >
      <div className="pl-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="px-2.5 py-1 bg-cyan/10 text-cyan text-[10px] font-black uppercase tracking-wider rounded-md border border-cyan/20">
            Live · Active
          </div>
          <span className="text-text-dim text-sm font-mono uppercase tracking-widest">Resort ID: NEX-4922</span>
        </div>
        <h1 className="text-5xl font-headline font-black tracking-tight text-white">System Overview</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface border border-border p-8 rounded-2xl flex flex-col justify-between min-h-[180px] group hover:border-cyan/30 transition-all duration-500 shadow-xl">
            <div className="flex justify-between items-start">
              <span className="text-text-dim font-mono text-[10px] uppercase tracking-widest font-black leading-none">{stat.label}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color === 'red' ? 'red' : stat.color === 'cyan' ? 'cyan' : 'green'}/10 text-${stat.color === 'red' ? 'red' : stat.color === 'cyan' ? 'cyan' : 'green'}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div>
              <div className="text-5xl font-headline font-black mb-2 text-white">{stat.value}</div>
              <div className={`text-[10px] font-mono tracking-widest uppercase opacity-60 flex items-center gap-2`}>
                <span className={`px-1.5 py-0.5 rounded ${stat.color === 'red' ? 'bg-red/20 text-red' : 'bg-cyan/20 text-cyan'}`}>{stat.trend}</span>
                <span className="text-text-dim">system sync 0.4s</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 bg-surface border border-border rounded-[2rem] p-10 flex flex-col gap-8 min-h-[450px] shadow-2xl">
          <div className="flex justify-between items-center">
             <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Active Safety Zones</h2>
             <button className="text-[10px] font-mono text-cyan uppercase tracking-widest hover:underline flex items-center gap-2">
               Full Grid View <ChevronRight size={14} />
             </button>
          </div>
          
          <div className="flex-1 rounded-2xl bg-navy border border-border overflow-hidden relative group nx-grid-bg">
            <div className="absolute inset-0 bg-map opacity-10 group-hover:opacity-20 transition-opacity"></div>
            {/* Mock Map View */}
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div className="w-full h-full relative">
                <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-cyan/5 border border-cyan/20 rounded-full flex items-center justify-center flex-col gap-1 p-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan">North Wing</span>
                  <span className="text-[12px] font-bold text-white">SECURE</span>
                </div>
                <div className="absolute bottom-[20%] right-[30%] w-40 h-40 bg-green/5 border border-green/20 rounded-full flex items-center justify-center flex-col gap-1 p-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-green">Resort Hub</span>
                  <span className="text-[12px] font-bold text-white">CLEAR</span>
                </div>
                <div className="absolute top-[40%] right-[10%] w-24 h-24 bg-red/5 border border-red/20 rounded-full flex items-center justify-center flex-col gap-1 p-4 text-center animate-pulse">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red">Lobby B</span>
                  <span className="text-[12px] font-bold text-white">CAUTION</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-surface/90 backdrop-blur-md border border-border rounded-xl flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan">
                   <Shield size={20} />
                 </div>
                 <div>
                   <div className="text-[11px] font-black uppercase tracking-widest text-white leading-none mb-1">Patrol Pulse</div>
                   <div className="text-[10px] text-text-dim">Last floor-wide sweep: 12m ago</div>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-surface bg-navy overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="Staff" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                 </div>
                 <span className="text-[9px] text-text-dim uppercase font-mono ml-2">5 Units active</span>
               </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-6">
           <div className="bg-surface border border-border rounded-[2rem] p-8 flex-1 flex flex-col gap-6 shadow-2xl">
              <div className="flex justify-between items-center text-text-dim uppercase font-mono text-[10px] font-black tracking-widest border-b border-border pb-4">
                <span>Recent Activity</span>
                <History size={14} />
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { title: "Floor 4 Evacuation Drill", time: "12m ago", status: "Success", color: "cyan" },
                  { title: "Sensor #412 Alert", time: "42m ago", status: "Warning", color: "red" },
                  { title: "Guest Roster Sync", time: "1h ago", status: "Auto", color: "white/10" },
                  { title: "Vertex AI Path Optim", time: "2h ago", status: "Auto", color: "white/10" },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 h-full min-h-[36px] rounded-full" style={{ backgroundColor: act.color === 'red' ? '#FF4545' : act.color === 'cyan' ? '#00D4FF' : 'rgba(112,129,152,0.2)' }}></div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-text leading-tight mb-1">{act.title}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-text-dim uppercase font-mono">{act.time}</span>
                        <span className={`text-[9px] font-black uppercase tracking-tight`} style={{ color: act.color === 'red' ? '#FF4545' : act.color === 'cyan' ? '#00D4FF' : 'var(--color-text-dim)' }}>{act.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-auto py-3.5 rounded-xl bg-navy hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-text-dim transition-all border border-border">
                Intelligence Ledger
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function GuestRoster() {
  const guests = [
    { name: "Eleanor Shellstrop", room: "304", checkIn: "Oct 24, 14:00", status: "Not Cleared", priority: "High" },
    { name: "Chidi Anagonye", room: "305", checkIn: "Oct 22, 15:30", status: "Safe", priority: "Low" },
    { name: "Tahani Al-Jamil", room: "PH-1", checkIn: "Oct 25, 12:00", status: "Not Cleared", priority: "Medium" },
    { name: "Jason Mendoza", room: "102", checkIn: "Oct 20, 16:45", status: "Safe", priority: "Low" },
    { name: "Janet", room: "HUB", checkIn: "Infinite", status: "Safe", priority: "System" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex flex-col gap-10"
    >
      <div className="flex justify-between items-end pl-2">
        <div>
          <h1 className="text-5xl font-headline font-black tracking-tight mb-2 text-white">Guest Roster</h1>
          <p className="text-text-dim text-sm max-w-lg">Live data processing from Firestore. Filtered by crisis proximity and evacuation status.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-xl bg-surface border border-border hover:bg-white/5 text-xs font-bold uppercase transition-all text-text-dim">Filter</button>
          <button className="px-6 py-3 rounded-xl bg-surface border border-border hover:bg-white/5 text-xs font-bold uppercase transition-all text-text-dim">Export Report</button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-[2rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left font-mono">
          <thead>
            <tr className="bg-navy/50 text-[10px] font-black uppercase tracking-[0.2em] text-text-dim">
              <th className="px-10 py-6">Guest Info</th>
              <th className="px-10 py-6">Room</th>
              <th className="px-10 py-6">Status</th>
              <th className="px-10 py-6">Priority</th>
              <th className="px-10 py-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {guests.map((guest, i) => (
              <tr key={i} className="group hover:bg-white/5 transition-all text-sm">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center font-black text-xs text-cyan border border-border">
                      {guest.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg -tracking-tight text-text leading-none mb-1">{guest.name}</span>
                      <span className="text-[10px] text-text-dim truncate">{guest.checkIn}</span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8 font-black text-cyan">{guest.room}</td>
                <td className="px-10 py-8">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    guest.status === 'Safe' ? 'bg-green/10 text-green border border-green/20' : 'bg-red/10 text-red border border-red/20 animate-pulse'
                  }`}>
                    {guest.status}
                  </span>
                </td>
                <td className="px-10 py-8 italic text-text-dim opacity-70">{guest.priority}</td>
                <td className="px-10 py-8 text-right">
                   <button className="w-10 h-10 rounded-xl bg-navy hover:bg-white/10 flex items-center justify-center text-text-dim hover:text-cyan transition-all ml-auto border border-border">
                     <MoreHorizontal size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-8 border-t border-border flex justify-between items-center bg-navy/20">
           <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest leading-none">Displaying 5 of 1,248 Records</span>
           <div className="flex gap-2">
             <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-dim hover:border-text-dim transition-all"><ChevronRight size={18} className="rotate-180" /></button>
             <button className="w-10 h-10 rounded-xl border border-cyan/40 bg-cyan/10 flex items-center justify-center text-cyan font-black">1</button>
             <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-dim hover:bg-white/5 transition-all">2</button>
             <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-dim hover:bg-white/5 transition-all">3</button>
             <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-dim hover:border-text-dim transition-all"><ChevronRight size={18} /></button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmergencyControl({ onTrigger }: { onTrigger: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto flex flex-col items-center gap-12 py-10"
    >
       <div className="text-center mb-12">
        <h1 className="text-6xl font-headline font-black tracking-tight mb-4 text-white uppercase leading-none">Command Center</h1>
        <p className="text-text-dim max-w-xl mx-auto text-sm leading-relaxed">Authorize building-wide emergency protocols, override smart home sequences, and deploy direct responder missions.</p>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full">
        <div className="bg-surface p-12 rounded-[3.5rem] flex flex-col items-center gap-8 text-center border-t-8 border-red group relative overflow-hidden shadow-2xl transition-transform hover:translate-y-[-8px]">
           <div className="absolute top-0 left-0 w-full h-1 bg-red/10 group-hover:h-full transition-all duration-700 pointer-events-none opacity-10"></div>
           <div className="w-24 h-24 rounded-3xl bg-red/10 border border-red/20 flex items-center justify-center text-red red-glow group-hover:scale-110 transition-all duration-500">
             <Power size={48} />
           </div>
           <div>
             <h3 className="text-2xl font-headline font-black mb-2 uppercase text-text tracking-tight leading-none">MASTER ALERT</h3>
             <p className="text-[11px] text-text-dim leading-relaxed uppercase font-mono tracking-wider">Full building evacuation. Vertex AI Wayfinding override. 1st Responder dispatch.</p>
           </div>
           <button 
            onClick={onTrigger}
            className="w-full py-5 rounded-2xl bg-red text-white font-black uppercase tracking-widest text-[11px] red-glow transition-all active:scale-95"
           >
             AUTHORIZE DEPLOYMENT
           </button>
        </div>

        <div className="bg-surface p-12 rounded-[3.5rem] flex flex-col items-center gap-8 text-center border-t-8 border-cyan group shadow-2xl transition-transform hover:translate-y-[-8px]">
           <div className="w-24 h-24 rounded-3xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan cyan-glow group-hover:scale-110 transition-all duration-500">
             <Shield size={48} />
           </div>
           <div>
             <h3 className="text-2xl font-headline font-black mb-2 uppercase text-text tracking-tight leading-none">DRILL SEQUENCE</h3>
             <p className="text-[11px] text-text-dim leading-relaxed uppercase font-mono tracking-wider">Scheduled safety testing. Voice alerting active (Test Mode). No external dispatch.</p>
           </div>
           <button 
            className="w-full py-5 rounded-2xl bg-cyan text-navy font-black uppercase tracking-widest text-[11px] cyan-glow transition-all active:scale-95"
           >
             ENGAGE DRILL
           </button>
        </div>
      </div>

      <div className="w-full bg-surface border border-dashed border-border rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Info className="text-amber" size={20} />
          <p className="text-[11px] text-text-dim font-mono uppercase tracking-widest">Biometric confirmation required for specific floor locks override.</p>
        </div>
        <button className="text-[10px] font-black uppercase underline tracking-widest text-text-dim hover:text-cyan transition-all">Verification Logs</button>
      </div>
    </motion.div>
  );
}
