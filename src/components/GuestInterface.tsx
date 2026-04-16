import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  MapPin, 
  Navigation, 
  CheckCircle, 
  AlertTriangle, 
  DoorOpen, 
  User, 
  Lock,
  ArrowRight,
  ChevronRight,
  Info,
  Smartphone,
  MessageSquare
} from "lucide-react";

type GuestState = "login" | "dashboard" | "emergency";

export default function GuestInterface() {
  const [state, setState] = useState<GuestState>("login");
  const [room, setRoom] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (room && lastName) {
      setState("dashboard");
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-navy flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.03),transparent_70%)] pointer-events-none -z-10"></div>
      
      <AnimatePresence mode="wait">
        {state === "login" && (
          <LoginView 
            key="login" 
            room={room} 
            lastName={lastName}
            setRoom={setRoom}
            setLastName={setLastName}
            onLogin={handleLogin} 
          />
        )}
        {state === "dashboard" && (
          <DashboardView 
            key="dashboard" 
            room={room}
            onPanic={() => setState("emergency")} 
          />
        )}
        {state === "emergency" && (
          <EmergencyView 
            key="emergency" 
            onSafe={() => setState("dashboard")} 
          />
        )}
      </AnimatePresence>

      {/* Manual Emergency Trigger for Demo purposes */}
      {state === "dashboard" && (
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setState("emergency")}
          className="fixed top-24 right-6 p-3 rounded-xl bg-red/10 border border-red/20 text-red text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red/20 transition-all z-[100]"
        >
          <AlertTriangle size={14} /> Simulate Alert
        </motion.button>
      )}
    </div>
  );
}

function LoginView({ 
  room, 
  lastName, 
  setRoom, 
  setLastName, 
  onLogin,
}: { 
  room: string, 
  lastName: string, 
  setRoom: (v: string) => void, 
  setLastName: (v: string) => void,
  onLogin: (e: React.FormEvent) => void,
  key?: string
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="w-full max-w-sm"
    >
      <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-6 pl-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan shadow-lg border border-cyan/20">
              <Shield size={22} fill="currentColor" fillOpacity={0.2} />
            </div>
            <h1 className="font-headline font-black text-2xl tracking-tight text-white uppercase">SafeStay</h1>
          </div>
          <div>
            <h2 className="font-headline text-4xl font-black tracking-tighter leading-tight text-white uppercase">Guest <br/><span className="text-cyan">Portal</span></h2>
            <p className="text-text-dim text-sm mt-3 max-w-[280px] leading-relaxed">
              Secure authentication required. Enter your room credentials to access your safety dashboard.
            </p>
          </div>
        </header>

        <form onSubmit={onLogin} className="bg-surface/80 backdrop-blur-xl p-8 rounded-[2rem] border border-border shadow-2xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-dim ml-1">Room Reference</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim/40 group-focus-within:text-cyan transition-colors">
                <Shield size={18} />
              </div>
              <input 
                type="text" 
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. 402" 
                className="w-full bg-navy border border-border rounded-xl py-3.5 pl-12 pr-6 text-text text-lg focus:outline-none focus:border-cyan/50 focus:bg-surface/50 transition-all font-bold placeholder:text-text-dim/20"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-dim ml-1">Guest Surname</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim/40 group-focus-within:text-cyan transition-colors">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name" 
                className="w-full bg-navy border border-border rounded-xl py-3.5 pl-12 pr-6 text-text text-lg focus:outline-none focus:border-cyan/50 focus:bg-surface/50 transition-all font-bold placeholder:text-text-dim/20"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="nx-action-btn w-full mt-2"
          >
            Authenticate
            <ArrowRight size={18} />
          </button>

          <div className="text-center mt-2 flex items-center justify-center gap-2 text-text-dim/30">
            <Lock size={12} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Encrypted Handshake</span>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

function DashboardView({ room, onPanic }: { room: string, onPanic: () => void, key?: string }) {
  const cards = [
    { title: "Status", value: "Clear", icon: CheckCircle, color: "text-green" },
    { title: "Your Room", value: room, icon: DoorOpen, color: "text-cyan" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-sm flex flex-col gap-8"
    >
      <header className="flex justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">GUEST TERMINAL</span>
          <h2 className="text-3xl font-headline font-black tracking-tight text-white uppercase leading-none">Stay <span className="text-cyan">Secure.</span></h2>
        </div>
        <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-cyan border border-border">
          <Shield size={20} />
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-surface border border-border p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
            <div className={`w-8 h-8 rounded-lg bg-navy flex items-center justify-center ${c.color} border border-border`}>
              <c.icon size={16} />
            </div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-text-dim leading-none mb-1.5">{c.title}</div>
              <div className="text-xl font-black tracking-tight text-white leading-none">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border p-8 rounded-[2rem] flex flex-col gap-6 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <MapPin size={120} />
        </div>
        <div className="flex items-center justify-between relative">
          <h3 className="font-headline font-black text-lg text-white uppercase tracking-tight">Safety Ledger</h3>
          <div className="nx-status-dot"></div>
        </div>
        
        <div className="flex flex-col gap-2 relative">
          {[
            { label: "Concierge Assistance", icon: MessageSquare },
            { label: "Request Safe Hub Access", icon: Lock },
            { label: "Floor Wayfinding Map", icon: MapPin },
          ].map((item, i) => (
            <button key={i} className="flex items-center gap-4 p-4 rounded-xl bg-navy/50 hover:bg-white/5 transition-all text-left border border-border">
              <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-dim">
                <item.icon size={16} />
              </div>
              <span className="text-[12px] font-bold flex-1 text-text">{item.label}</span>
              <ChevronRight size={14} className="text-text-dim" />
            </button>
          ))}
        </div>
      </div>

      <div className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-text-dim/40 px-6 leading-relaxed">
        Real-time sensor network active. evacuation pathing will deploy automatically in high-risk events.
      </div>
    </motion.div>
  );
}

function EmergencyView({ onSafe }: { onSafe: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-red z-[50] flex flex-col text-white font-sans"
    >
      {/* HUD Scanner lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
      
      <header className="flex justify-between items-center px-8 py-10 z-10 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <AlertTriangle size={36} className="text-white animate-pulse" />
          <span className="font-headline font-black text-3xl tracking-tighter uppercase leading-none">EVACUATION <br/>REQUIRED</span>
        </div>
        <div className="bg-white px-5 py-2 rounded-full flex items-center gap-2 shadow-2xl">
          <div className="w-2.5 h-2.5 rounded-full bg-red animate-pulse"></div>
          <span className="font-black text-xs uppercase tracking-widest text-red">Lvl 4 Active</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-32 relative z-10 text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [12, 10, 12] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <Navigation size={220} fill="currentColor" className="drop-shadow-2xl text-white transform rotate-12" />
        </motion.div>

        <h1 className="text-9xl font-headline font-black tracking-tighter mb-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-none">12 ft</h1>
        <h2 className="text-4xl font-headline font-black uppercase tracking-tight opacity-90 mb-10">Turn LEFT</h2>

        <div className="bg-navy/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/30 shadow-2xl w-full max-w-md">
          <p className="text-lg font-bold uppercase tracking-widest mb-2 opacity-70">Follow path to</p>
          <div className="text-4xl font-headline font-black uppercase tracking-tighter text-white">SAFETY HUB 02</div>
          <div className="w-full h-2 bg-white/20 rounded-full mt-6 overflow-hidden">
             <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-white shadow-[0_0_15px_white]"
             />
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-10 bg-gradient-to-t from-red via-red to-transparent z-20">
        <button 
          onClick={onSafe}
          className="w-full bg-navy text-white font-headline font-black text-2xl py-7 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center gap-4 active:scale-95 transition-all border border-white/20 group"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-green group-hover:scale-110 transition-transform">
            <CheckCircle size={24} fill="currentColor" fillOpacity={0.2} />
          </div>
          REACHED SAFETY
        </button>
      </div>

      {/* Side HUD Elements */}
      <div className="absolute top-[40%] right-6 flex flex-col gap-6 opacity-30">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-1 h-8 bg-white rounded-full"></div>
        ))}
      </div>
    </motion.div>
  );
}
