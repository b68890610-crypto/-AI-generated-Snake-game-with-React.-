import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, Music, Radio } from 'lucide-react';
import { TRACKS } from '../constants';
import { Track } from '../types';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handleSkipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setProgress(value);
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pixel-border p-6 bg-black flex flex-col gap-6 relative overflow-hidden font-mono-retro group">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSkipForward}
      />

      {/* Decorative Glitch Bits */}
      <div className="absolute top-2 right-2 text-[8px] font-pixel text-[var(--color-glitch-magenta)] animate-pulse">
        LOCKED_TRACK
      </div>
      
      <div className="flex items-center justify-between z-10 border-b border-[var(--color-glitch-cyan)] pb-2">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[var(--color-glitch-cyan)] animate-pulse" />
          <h3 className="text-[10px] font-pixel uppercase tracking-tighter">
            Audio_Node::v4
          </h3>
        </div>
        <button 
          onClick={() => setShowPlaylist(!showPlaylist)}
          className={`p-1.5 pixel-border scale-75 hover:bg-[var(--color-glitch-cyan)] hover:text-black transition-all ${showPlaylist ? 'bg-[var(--color-glitch-cyan)] text-black' : 'text-[var(--color-glitch-cyan)]'}`}
        >
          <ListMusic className="w-4 h-4" />
        </button>
      </div>

      <div className="relative aspect-square pixel-border p-1 bg-black group/cover">
        <motion.div
           animate={isPlaying ? {
             opacity: [0.1, 0.4, 0.1],
             scale: [1, 1.05, 1],
             filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
           } : {}}
           transition={{ duration: 0.5, repeat: Infinity }}
           className="absolute inset-0 bg-[var(--color-glitch-magenta)]/20 z-10 mix-blend-screen pointer-events-none"
        />
        <img 
          src={currentTrack.cover} 
          alt={currentTrack.title} 
          className="w-full h-full object-cover grayscale brightness-75 group-hover/cover:grayscale-0 transition-all duration-75"
        />
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end z-20">
           <div className="bg-black/80 px-2 py-1 transform -skew-x-12 border-l-2 border-[var(--color-glitch-magenta)]">
              <p className="text-[10px] font-pixel text-[var(--color-glitch-magenta)]">AI_GEN_REC</p>
           </div>
        </div>
      </div>

      <div className="text-left border-l-4 border-[var(--color-glitch-magenta)] pl-4">
        <h2 className="text-xl font-bold uppercase tracking-tight truncate leading-none mb-2 text-[var(--color-glitch-cyan)] drop-shadow-[2px_2px_0_var(--color-glitch-magenta)]">
          {currentTrack.title}
        </h2>
        <p className="text-sm font-pixel opacity-70 uppercase tracking-tighter truncate text-[var(--color-glitch-magenta)]">
          {'>'} {currentTrack.artist}
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative h-2 bg-[var(--color-dark-gray)] pixel-border overflow-hidden p-0.5">
           <motion.div 
              style={{ width: `${progress}%` }} 
              className="h-full bg-gradient-to-r from-[var(--color-glitch-cyan)] to-[var(--color-glitch-magenta)]"
           />
           <input
             type="range"
             min="0"
             max="100"
             value={progress}
             onChange={handleProgressChange}
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
           />
        </div>
        <div className="flex justify-between text-xs font-pixel opacity-40">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <span>{formatTime(audioRef.current?.duration || 0)}</span>
        </div>
      </div>

      <div className="flex items-center justify-around">
        <button onClick={handleSkipBack} className="p-3 pixel-border bg-black hover:bg-[var(--color-glitch-magenta)] hover:text-black transition-all">
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          onClick={handlePlayPause}
          className="w-14 h-14 pixel-border bg-[var(--color-glitch-cyan)] flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-[4px_4px_0_var(--color-glitch-magenta)]"
        >
          {isPlaying ? <Pause className="fill-black" /> : <Play className="fill-black translate-x-0.5" />}
        </button>
        <button onClick={handleSkipForward} className="p-3 pixel-border bg-black hover:bg-[var(--color-glitch-magenta)] hover:text-black transition-all">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-3 px-2 border-t border-white/5 pt-4">
        <Volume2 className="w-4 h-4 opacity-50" />
        <div className="flex-1 relative h-1 bg-[var(--color-dark-gray)]">
           <div style={{ width: `${volume * 100}%` }} className="h-full bg-[var(--color-glitch-cyan)]" />
           <input
             type="range"
             min="0"
             max="1"
             step="0.01"
             value={volume}
             onChange={(e) => setVolume(parseFloat(e.target.value))}
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
           />
        </div>
      </div>

      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute inset-0 bg-black z-50 p-6 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center border-b border-[var(--color-glitch-magenta)] pb-2 mb-2">
              <h4 className="text-[10px] font-pixel text-[var(--color-glitch-magenta)]">PLAYLIST_ST</h4>
              <button 
                onClick={() => setShowPlaylist(false)} 
                className="text-[10px] font-pixel hover:text-[var(--color-glitch-magenta)]"
              >
                ESCAPE_X
              </button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto">
              {TRACKS.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    setIsPlaying(true);
                  }}
                  className={`flex items-center gap-3 p-3 pixel-border text-left transition-all relative group/item ${
                    index === currentTrackIndex ? 'bg-[var(--color-glitch-magenta)] text-black' : 'bg-black hover:bg-[var(--color-dark-gray)]'
                  }`}
                >
                  <img src={track.cover} className={`w-8 h-8 object-cover ${index === currentTrackIndex ? 'grayscale-0' : 'grayscale'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate tracking-tighter uppercase">{track.title}</p>
                    <p className={`text-[10px] uppercase font-pixel tracking-tighter truncate ${index === currentTrackIndex ? 'text-black opacity-60' : 'text-[var(--color-glitch-magenta)] opacity-80'}`}>
                      {track.artist}
                    </p>
                  </div>
                  {index === currentTrackIndex && isPlaying && (
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-2 h-2 bg-black rounded-full" 
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

