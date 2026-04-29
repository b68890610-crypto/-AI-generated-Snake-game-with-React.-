/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Cpu, Zap, Activity, ShieldAlert, Cpu as CpuIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-glitch-cyan)] flex flex-col relative font-mono-retro">
      {/* Glitch Overlay */}
      <div className="scanline"></div>
      
      {/* Top Header Section */}
      <header className="border-b-4 border-double border-[var(--color-glitch-cyan)] bg-black/60 backdrop-blur-md p-4 relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-pixel glitch-text tracking-tighter text-[var(--color-glitch-magenta)]">
              CORE_LINK_v4.0
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-red-600 animate-ping"></span>
              <span className="text-[10px] uppercase font-pixel text-red-500">UNAUTHORIZED_ACCESS_DETECTED</span>
            </div>
          </div>

          <div className="hidden md:flex gap-10 items-center">
            {['BIOS', 'NET_RUN', 'DATA_SCRAPE', 'ENCRYPTION'].map((item) => (
              <div key={item} className="group cursor-pointer">
                <span className="text-xs font-pixel group-hover:text-[var(--color-glitch-magenta)] transition-colors">
                  {'>'} {item}
                </span>
                <div className="h-0.5 bg-[var(--color-glitch-magenta)] w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] opacity-40 font-pixel">ID: 0x8890610</p>
              <p className="text-xs text-[var(--color-glitch-magenta)] font-pixel">LOGGED: ROOT</p>
            </div>
            <div className="w-12 h-12 pixel-border p-1 bg-black overflow-hidden relative group">
              <img 
                src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Glitch" 
                alt="Proxy" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-150 transition-all duration-75"
              />
              <div className="absolute inset-0 bg-cyan-500/20 mix-blend-color group-hover:opacity-0"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-8 p-8 relative z-10">
        
        {/* Left Side: System Status */}
        <aside className="space-y-6">
          <div className="pixel-border p-4 bg-black/40 tear h-fit">
            <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-glitch-cyan)] pb-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <h2 className="text-xs font-pixel uppercase">Sector_State</h2>
            </div>
            <div className="space-y-3 font-mono-retro">
              {[
                { label: 'CPU_LOAD', val: '98%', color: 'text-red-500' },
                { label: 'RAM_SYCK', val: 'CRITICAL', color: 'text-[var(--color-glitch-magenta)]' },
                { label: 'NEURAL_ST', val: 'UNSTABLE', color: 'text-yellow-500' },
                { label: 'GW_BUFFER', val: 'OVERFLOW', color: 'text-white' }
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center text-sm">
                  <span className="opacity-40">{s.label}::</span>
                  <span className={`font-bold ${s.color}`}>{s.val}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex gap-1">
                {[1, 2, 3, 2, 4, 1, 3].map((h, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [h*4, h*8, h*4] }} 
                    transition={{ repeat: Infinity, duration: 0.5, delay: i*0.1 }}
                    className="w-2 bg-[var(--color-glitch-cyan)]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pixel-border p-4 bg-black/80 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-[var(--color-glitch-magenta)]" />
              <span className="text-[10px] font-pixel tracking-tighter uppercase whitespace-nowrap overflow-hidden">
                Log_Stream.sys
              </span>
            </div>
            <div className="text-[11px] leading-tight space-y-1 opacity-60 font-mono-retro">
              <p className="text-green-500">{'>'} HANDSHAKE READY...</p>
              <p>{'>'} BYPASSING FIREWALL :: SECTOR 7</p>
              <p className="text-[var(--color-glitch-magenta)]">{'>'} WARNING: HEURISTIC LAG</p>
              <p>{'>'} INJECTING RHYTHM PACKETS</p>
              <p className="text-cyan-400">{'>'} SYSTEM_UPTIME: 03:22:59</p>
            </div>
          </div>
        </aside>

        {/* Center: The Game */}
        <section className="flex flex-col items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            {/* Corner Decorators */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[var(--color-glitch-magenta)]"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[var(--color-glitch-magenta)]"></div>
            
            <SnakeGame />
          </motion.div>
        </section>

        {/* Right Side: Music Player */}
        <aside className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-glitch-cyan)] to-[var(--color-glitch-magenta)] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <MusicPlayer />
          </div>

          <div className="pixel-border p-4 bg-black/40">
            <h3 className="text-[10px] font-pixel mb-4 uppercase text-center text-[var(--color-glitch-magenta)]">Visualizer_Input</h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                  className="w-full h-4 bg-[var(--color-glitch-cyan)]/20 border border-[var(--color-glitch-cyan)]/40"
                />
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Area */}
      <footer className="border-t-4 border-double border-[var(--color-glitch-cyan)] bg-black p-4 text-[10px] font-pixel tracking-tighter relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[var(--color-glitch-magenta)]">TERMINAL_REF: ais-dev-v2</span>
            <span className="opacity-40">::</span>
            <span>MEM_ADDR: 0x6962000047</span>
          </div>
          <div className="flex gap-8">
            <button className="hover:text-[var(--color-glitch-magenta)] transition-colors">TERMINATE_PROCESS</button>
            <button className="hover:text-[var(--color-glitch-magenta)] transition-colors">OVERRIDE_AUTH</button>
            <button className="hover:text-[var(--color-glitch-magenta)] transition-colors">SELF_DESTRUCT()</button>
          </div>
        </div>
      </footer>
    </div>
  );
}


