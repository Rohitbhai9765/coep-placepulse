import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  Building2,
  BarChart3,
} from "lucide-react";

import { login as loginApi } from "@/services/authApi";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // INTERACTIVE BACKGROUND MATRIX CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const linesCount = 10;
    const structures = Array.from({ length: linesCount }, (_, i) => ({
      y: height * 0.35 + i * 38,
      phase: i * 0.8,
      speed: 0.002 + i * 0.0008,
      amplitude: 30 + i * 12,
      color: i % 2 === 0 ? "rgba(147, 51, 234, 0.2)" : "rgba(6, 182, 212, 0.2)",
    }));

    const sparks: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number }[] = [];

    const animate = () => {
      ctx.fillStyle = "rgba(6, 6, 9, 0.15)";
      ctx.fillRect(0, 0, width, height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      if (Math.abs(mouseRef.current.targetX - mouseRef.current.x) > 1 && sparks.length < 100) {
        sparks.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          alpha: 1,
          life: 1,
        });
      }

      structures.forEach((str) => {
        str.phase += str.speed;
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = str.color;

        for (let x = 0; x < width; x += 15) {
          const sine = Math.sin(x * 0.003 + str.phase);
          let y = str.y + sine * str.amplitude;

          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            const force = (180 - distance) / 180;
            y += (dy / distance) * force * 35;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.015;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${s.life})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginApi(form.email, form.password);
      login(data.token, data.user);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#060609] text-zinc-50 font-sans selection:bg-cyan-500/30">
      
      {/* BACKGROUND MATRIX */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute left-[-5%] top-[-5%] h-[700px] w-[700px] rounded-full bg-purple-600/10 blur-[200px] pointer-events-none animate-pulse" />
      <div className="absolute right-[-5%] bottom-[-5%] h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[200px] pointer-events-none animate-pulse" />

      <div className="relative z-10 flex min-h-[100dvh] w-full">
        
        {/* EXPANDED LEFT BRANDING PANEL */}
        <div className="hidden w-[60%] flex-col justify-between pl-28 pr-16 py-20 xl:flex bg-gradient-to-r from-[#060609]/90 via-[#060609]/60 to-transparent backdrop-blur-xs">
          <div className="my-auto w-full max-w-5xl">
            
            {/* Cyber Logo */}
            <div className="mb-10 flex h-30 w-30 items-center justify-center rounded-2xl bg-neutral-950 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 opacity-20 blur-xs group-hover:opacity-40 transition-opacity" />
              <GraduationCap size={40} className="text-cyan-400 relative z-10" />
            </div>

            {/* Massively Expanded Typography Area */}
            <h1 className="tracking-tighter font-black leading-none select-none">
              <span className="block text-[160px] font-black tracking-tight text-white bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                COEP
              </span>
              <span className="text-8xl font-black mt-2 tracking-wide bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                PlacePulse
              </span>
            </h1>

            <p className="mt-8 text-xl text-zinc-400 max-w-3xl leading-relaxed tracking-wide font-medium">
              System Interface v4.0 // High-speed placement matrix and network orchestration framework pipelines, bridging engineering expertise directly into Tier-1 data operations and global enterprise environments.
            </p>

            {/* Expanded Tech Feature Grid Layout */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="p-6 rounded-xl border border-white/[0.03] bg-neutral-950/40 backdrop-blur-md border-l-2 border-l-cyan-400/80 transition-all hover:bg-neutral-950/60">
                <div className="flex items-center gap-3 text-cyan-400">
                  <ShieldCheck size={20} />
                  <h4 className="font-bold text-white text-xs tracking-wider uppercase">Gatekeeper Protocols</h4>
                </div>
                <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">Encrypted token architecture with verified institutional and role gateways.</p>
              </div>

              <div className="p-6 rounded-xl border border-white/[0.03] bg-neutral-950/40 backdrop-blur-md border-l-2 border-l-indigo-400/80 transition-all hover:bg-neutral-950/60">
                <div className="flex items-center gap-3 text-indigo-400">
                  <Building2 size={20} />
                  <h4 className="font-bold text-white text-xs tracking-wider uppercase">Corporate Logistics</h4>
                </div>
                <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">Automated matching pipelines and synchronous real-time scheduling frames.</p>
              </div>

              <div className="p-6 rounded-xl border border-white/[0.03] bg-neutral-950/40 backdrop-blur-md border-l-2 border-l-purple-400/80 transition-all hover:bg-neutral-950/60">
                <div className="flex items-center gap-3 text-purple-400">
                  <BarChart3 size={20} />
                  <h4 className="font-bold text-white text-xs tracking-wider uppercase">Metric Synthesis</h4>
                </div>
                <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">Live algorithmic analytics telemetry detailing institutional success parameters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: EXPANDED SIZE AUTHENTICATION INTERFACE */}
        <div className="flex min-w-0 flex-1 items-center justify-center px-4 py-5 sm:px-6 sm:py-10 lg:px-16">
          <form
            onSubmit={handleSubmit}
            className="relative w-full min-w-0 max-w-[500px] rounded-[24px] border border-white/[0.07] bg-neutral-950/50 p-5 shadow-[0_0_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl transition-all sm:rounded-[32px] sm:p-8 md:p-12"
          >
            {/* Structural corner marks */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-500/40 rounded-br-xl" />

            <div className="mb-7 text-center sm:mb-10 xl:text-left">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
                System Access
              </h2>
              <p className="mt-1.5 text-[10px] font-mono tracking-[0.18em] text-cyan-400/70 uppercase sm:text-xs sm:tracking-widest">
                // Input Verification Keys
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              
              {/* CYBERPUNK EMAIL CONTAINER */}
              <div 
                className={`relative flex items-center rounded-xl border bg-neutral-950/70 transition-all duration-300 ${
                  focusedField === "email" 
                    ? "border-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-black" 
                    : "border-white/10"
                }`}
              >
                <Mail
                  size={20}
                  className={`absolute left-4 transition-colors duration-300 sm:left-5 ${
                    focusedField === "email" ? "text-cyan-400" : "text-zinc-600"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="IDENTITY EMAIL"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full min-w-0 bg-transparent py-4 pl-12 pr-4 text-xs font-mono tracking-normal text-zinc-200 outline-none placeholder:tracking-normal placeholder:text-zinc-700 sm:py-5 sm:pl-14 sm:pr-5 sm:text-sm sm:tracking-wide sm:placeholder:tracking-wider"
                />
              </div>

              {/* CYBERPUNK PASSWORD CONTAINER */}
              <div 
                className={`relative flex items-center rounded-xl border bg-neutral-950/70 transition-all duration-300 ${
                  focusedField === "password" 
                    ? "border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-black" 
                    : "border-white/10"
                }`}
              >
                <Lock
                  size={20}
                  className={`absolute left-4 transition-colors duration-300 sm:left-5 ${
                    focusedField === "password" ? "text-purple-400" : "text-zinc-600"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="ACCESS ACCESS KEY"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full min-w-0 bg-transparent py-4 pl-12 pr-14 text-xs font-mono tracking-normal text-zinc-200 outline-none placeholder:tracking-normal placeholder:text-zinc-700 sm:py-5 sm:pl-14 sm:pr-16 sm:text-sm sm:tracking-wide sm:placeholder:tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-zinc-600 transition-colors hover:text-zinc-400 sm:right-5"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* SUB-BAR OPTIONS */}
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 pt-1 text-[11px] font-mono sm:text-[12px]">
                <label className="group flex min-w-0 items-center gap-2 text-zinc-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-sm border-white/10 bg-neutral-900 text-cyan-500 focus:ring-0 accent-cyan-500 cursor-pointer"
                  />
                  <span className="group-hover:text-zinc-400 transition-colors">STAY CONNECTED</span>
                </label>
                <button
                  type="button"
                  className="shrink-0 text-zinc-500 tracking-wide transition hover:text-cyan-400"
                >
                  RECOVER KEY?
                </button>
              </div>

              {/* ACTION INITIALIZATION BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="relative mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 py-4 text-xs font-bold font-mono tracking-[0.15em] text-white uppercase shadow-xl shadow-cyan-500/10 transition-all duration-300 hover:opacity-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 sm:mt-6 sm:py-5 sm:text-sm sm:tracking-widest"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>DECRYPTING KEYS...</span>
                  </div>
                ) : (
                  <span>INITIALIZE SESSION</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
