import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  Activity, 
  Target, 
  Map as MapIcon, 
  Users, 
  Smartphone, 
  Radio, 
  ChevronRight,
  Shield,
  Cloud,
  Zap,
  Info
} from "lucide-react";

type Scene = "problem" | "active" | "pillars" | "outcome" | "gcp";

export default function InteractiveDemo() {
  const [scene, setScene] = useState<Scene>("problem");
  const [isCrisisActive, setIsCrisisActive] = useState(false);

  const startSimulation = useCallback(() => {
    setIsCrisisActive(true);
    setScene("active");
  }, []);

  // Scene timing logic
  useEffect(() => {
    if (!isCrisisActive && scene === "problem") return;

    let timer: NodeJS.Timeout;

    if (scene === "active") {
      timer = setTimeout(() => setScene("pillars"), 8000);
    } else if (scene === "pillars") {
      timer = setTimeout(() => setScene("outcome"), 12000);
    } else if (scene === "outcome") {
      timer = setTimeout(() => setScene("gcp"), 6000);
    }

    return () => clearTimeout(timer);
  }, [scene, isCrisisActive]);

  return (
    <div className="nx-main-grid">
      {/* Viewport Panel (Left) */}
      <section className="nx-panel min-h-[500px] lg:min-h-0">
        <div className="nx-panel-label flex justify-between items-center">
          <span>Level 04 — Floor Schematic / Live Deployment</span>
          <div className="flex gap-4">
             <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-cyan"></div> <span className="text-[9px]">Sensors</span></div>
             <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green"></div> <span className="text-[9px]">Clear</span></div>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {scene === "problem" && <ProblemScene key="problem" onStart={startSimulation} />}
            {scene === "active" && <ActiveScene key="active" />}
            {scene === "pillars" && <PillarsScene key="pillars" />}
            {scene === "outcome" && <OutcomeScene key="outcome" />}
            {scene === "gcp" && <GCPScene key="gcp" onRestart={() => setScene("problem")} />}
          </AnimatePresence>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-6 right-6 bg-surface/90 backdrop-blur-md border border-border p-4 rounded-md shadow-xl flex gap-10">
          <div className="flex flex-col">
            <span className="text-xl font-mono text-cyan font-bold tracking-tighter">{scene === 'problem' ? '0%' : '52%'}</span>
            <span className="text-[9px] text-text-dim uppercase tracking-widest leading-none mt-1">Evac Progress</span>
          </div>
          <div className="flex flex-col border-l border-border pl-6">
            <span className="text-xl font-mono text-cyan font-bold tracking-tighter">12.4s</span>
            <span className="text-[9px] text-text-dim uppercase tracking-widest leading-none mt-1">Avg Response</span>
          </div>
          <div className="flex flex-col border-l border-border pl-6">
            <span className="text-xl font-mono text-red font-bold tracking-tighter">{scene === 'problem' ? '01' : '02'}</span>
            <span className="text-[9px] text-text-dim uppercase tracking-widest leading-none mt-1">Active Risks</span>
          </div>
        </div>
      </section>

      {/* Sidebar (Right) */}
      <aside className="flex flex-col gap-4">
        <button 
          onClick={startSimulation}
          className="nx-action-btn w-full flex items-center justify-center gap-3 active:scale-95"
        >
          <Zap size={18} fill="currentColor" />
          {isCrisisActive ? 'Crisis Phase 2 Active' : 'Simulate Crisis'}
        </button>

        <div className="nx-pillar-card group">
          <h3>Contextual Alerting</h3>
          <p>FCM payloads dispatched to 14 active TV nodes. Exit Stairwell B designated primary route.</p>
        </div>

        <div className="nx-pillar-card amber">
          <h3>Rescue Intelligence</h3>
          <p>Vertex AI hazard analysis: {scene === 'problem' ? 'Scanning...' : '4 adjacent rooms flagged for pre-emptive verification.'}</p>
        </div>

        <div className="nx-pillar-card">
          <h3>Adaptive Wayfinding</h3>
          <p>LED path controllers updated. Rerouting traffic from Corridor C to bypass heat spike.</p>
        </div>

        {/* Infrastucture Pipeline Stack */}
        <div className="mt-auto bg-cyan/5 border border-dashed border-cyan/40 p-4 rounded-md">
          <h4 className="text-[10px] font-bold text-cyan uppercase tracking-[0.2em] mb-3">Infrastructure Pipeline</h4>
          <div className="flex flex-wrap gap-2">
            {["Vertex AI", "Cloud Pub/Sub", "Firestore", "Firebase Messaging", "Cloud Functions", "Maps Platform"].map(tech => (
              <span key={tech} className="nx-tech-badge whitespace-nowrap">{tech}</span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function ProblemScene({ onStart }: { onStart: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl w-full flex flex-col items-center gap-12"
    >
      <div className="relative w-full aspect-video bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl nx-grid-bg">
        {/* Floor Schematic */}
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <div className="grid grid-cols-6 grid-rows-3 gap-2 w-full h-full opacity-20">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className={`bg-navy border border-border rounded flex items-center justify-center text-[10px] font-mono text-text-dim ${i === 11 ? 'relative' : ''}`}>
                {400 + i}
              </div>
            ))}
          </div>

          {/* Crisis Point */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-[45%] left-[70%] w-12 h-12 bg-red/30 rounded-full blur-xl"
          ></motion.div>
          <div className="absolute top-[48%] left-[73%] text-red animate-pulse">
            <AlertTriangle size={24} />
          </div>

          {/* Confused Guests */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                x: [0, (Math.random() - 0.5) * 100], 
                y: [0, (Math.random() - 0.5) * 100],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
              className="absolute text-text-dim"
              style={{ 
                top: `${20 + Math.random() * 60}%`, 
                left: `${20 + Math.random() * 60}%` 
              }}
            >
              <Users size={12} />
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent flex flex-col justify-end p-12 text-center items-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-headline font-black mb-4 uppercase tracking-tight text-white"
          >
            Reality: <span className="text-red">Panic.</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-dim max-w-lg mb-8 text-sm"
          >
            Disorganized evacuations cost lives. NexusResponse centralizes building intelligence to provide immediate, calm direction.
          </motion.p>
          
          <button
            onClick={onStart}
            className="nx-action-btn px-12"
          >
            Activate NexusResponse
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ActiveScene() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl w-full flex flex-col items-center gap-12"
    >
      <div className="relative w-full aspect-video bg-surface border border-cyan/20 rounded-3xl overflow-hidden shadow-2xl nx-grid-bg">
        
        {/* Floor Schematic Optimized */}
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <div className="grid grid-cols-6 grid-rows-3 gap-2 w-full h-full">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-cyan/5 border border-cyan/20 rounded-lg flex items-center justify-center text-[10px] font-mono text-cyan/40 ${i === 11 ? 'bg-red/10 border-red/40' : ''}`}
              >
                {400 + i}
              </motion.div>
            ))}
          </div>

          {/* Neural Network Nodes */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: Math.random() * 2, duration: 0.5 }}
              className="absolute w-2 h-2 bg-cyan rounded-full cyan-glow"
              style={{ 
                top: `${15 + Math.random() * 70}%`, 
                left: `${15 + Math.random() * 70}%` 
              }}
            />
          ))}

          {/* Pub/Sub Pulse */}
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 10, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className="absolute top-[48%] left-[73%] w-24 h-24 border-2 border-cyan rounded-full pointer-events-none"
          ></motion.div>
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 10, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeOut" }}
            className="absolute top-[48%] left-[73%] w-24 h-24 border-2 border-cyan rounded-full pointer-events-none"
          ></motion.div>

          <div className="absolute top-[48%] left-[73%] text-red cyan-glow animate-pulse">
            <Radio size={32} />
          </div>

          {/* Google Cloud backbone */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-12 right-12 flex items-center gap-3 bg-navy/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10"
          >
            <Cloud className="text-cyan" />
            <span className="text-xs font-black tracking-widest uppercase">GCP Backbone</span>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent flex flex-col justify-end p-12 text-center items-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-headline font-black mb-4"
          >
            NexusResponse <span className="text-cyan">Activates</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-lg mb-4 font-mono text-sm"
          >
            Google Cloud Pub/Sub events pulsing in real-time. IoT sensor data streaming to Firestore.
          </motion.p>
          <div className="flex gap-4 items-center overflow-hidden">
             {["Smoke Detected", "Temp Spike: 145F", "Room 412 Alert", "Evac Protocol A-1"].map((log, i) => (
               <motion.div 
                key={i}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.5 + 2 }}
                className="text-[10px] font-mono text-cyan/60 bg-cyan/5 px-2 py-1 rounded"
               >
                 {log}
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PillarsScene() {
  const pillars = [
    { 
      title: "Smart Detection", 
      icon: Activity, 
      desc: "Real-time IoT spike analytics",
      color: "cyan"
    },
    { 
      title: "Contextual Alerts", 
      icon: Smartphone, 
      desc: "Personalized room instructions",
      color: "amber"
    },
    { 
      title: "Wayfinding", 
      icon: MapIcon, 
      desc: "Dynamic exit routing",
      color: "cyan"
    },
    { 
      title: "Rescue Intel", 
      icon: Target, 
      desc: "Responder live occupancy",
      color: "amber"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl w-full flex flex-col items-center gap-12"
    >
      <div className="text-center">
        <h2 className="text-4xl font-headline font-black mb-12 uppercase tracking-tighter text-white">System <span className="text-cyan">Core Pillars</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-surface border border-border p-8 rounded-2xl flex flex-col items-center text-center gap-6 group hover:translate-y-[-8px] transition-all duration-500 shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-navy border border-border text-${p.color}`}>
                <p.icon size={26} />
              </div>
              <div>
                <h3 className="font-headline font-bold text-base mb-2 uppercase text-white tracking-widest">{p.title}</h3>
                <p className="text-text-dim text-[11px] leading-relaxed uppercase font-mono">{p.desc}</p>
              </div>
              <div className={`w-full h-0.5 bg-border rounded-full mt-4 overflow-hidden`}>
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`w-1/2 h-full bg-${p.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function OutcomeScene() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl w-full flex flex-col items-center gap-8"
    >
      <h2 className="text-4xl font-headline font-black mb-4 uppercase tracking-tighter text-white">Precision Over <span className="text-red">Panic</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {/* Traditional */}
        <div className="flex flex-col gap-6">
          <div className="text-center font-mono text-[9px] uppercase tracking-[0.3em] text-text-dim/40">Legacy Response</div>
          <div className="aspect-video bg-surface border border-border rounded-2xl p-8 relative flex items-center justify-center overflow-hidden nx-grid-bg">
            <Users size={48} className="absolute text-red/20 blur-sm" />
            <Users size={32} className="absolute text-red/40 animate-bounce" />
            <AlertTriangle className="absolute top-4 right-4 text-red/50" />
          </div>
          <div className="text-center text-red/50 text-[10px] uppercase font-mono tracking-widest">Congested exits / Blind rescue</div>
        </div>

        {/* NexusResponse */}
        <div className="flex flex-col gap-6">
          <div className="text-center font-mono text-[9px] uppercase tracking-[0.3em] text-cyan">NexusResponse</div>
          <div className="aspect-video bg-navy border border-cyan/20 rounded-2xl p-8 relative flex items-center justify-center shadow-2xl overflow-hidden nx-grid-bg">
            <motion.div 
               animate={{ y: [40, -40], opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute bottom-10 left-10 text-cyan/60"
            >
              <Users size={24} />
            </motion.div>
            <motion.div 
               animate={{ y: [20, -60], opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
               className="absolute bottom-10 right-10 text-cyan/60"
            >
              <Users size={24} />
            </motion.div>
            <Shield className="absolute top-4 right-4 text-cyan/50" />
          </div>
          <div className="text-center text-cyan text-[10px] uppercase font-mono tracking-widest">Staggered flow / direct rescue</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full mt-10">
        {[
          { stat: "~50%", label: "Faster Evac" },
          { stat: "REAL-TIME", label: "Occupancy Map" },
          { stat: "ADAPTIVE", label: "Pathfinding" }
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-headline font-black text-white leading-none mb-1">{s.stat}</div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-text-dim">{s.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function GCPScene({ onRestart }: { onRestart: () => void, key?: string }) {
  const nodes = [
    { name: "Pub/Sub", icon: Radio },
    { name: "Vertex AI", icon: Zap },
    { name: "Firestore", icon: Info },
    { name: "Maps API", icon: Smartphone }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl w-full flex flex-col items-center gap-12"
    >
      <div className="text-center">
        <h2 className="text-4xl font-headline font-black mb-4 uppercase tracking-tighter text-white">Cloud <span className="text-cyan">Architecture</span></h2>
        <p className="text-text-dim text-sm max-w-lg mb-16 mx-auto uppercase font-mono tracking-widest font-bold">Unified pipeline for global resort safety</p>

        <div className="relative h-64 w-full flex items-center justify-around">
          {/* Animated data flow lines */}
          <div className="absolute top-[50%] left-0 w-full h-[1px] bg-border"></div>
          
          {nodes.map((n, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center gap-4 relative z-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-cyan shadow-xl group hover:border-cyan/50 transition-colors">
                <n.icon size={28} />
              </div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-text-dim group-hover:text-white transition-colors">{n.name}</div>
              
              {i < nodes.length - 1 && (
                <motion.div 
                  animate={{ x: [0, 120], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                  className="absolute top-8 left-full w-4 h-[1px] bg-cyan"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-12">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 text-text-dim hover:text-cyan transition-colors uppercase font-mono text-[10px] font-black tracking-[0.2em]"
        >
          Replay Sequence <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
