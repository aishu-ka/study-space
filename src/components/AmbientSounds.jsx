import { useState, useRef, useEffect } from 'react';

const AMBIENT_SOUNDS = [
  { id: 'none', name: 'None', icon: '🔇' },
  { id: 'rain', name: 'Rain', icon: '🌧️', url: 'https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3' },
  { id: 'cafe', name: 'Cafe', icon: '☕', url: '/sounds/cafe.mp3' },
  { id: 'forest', name: 'Forest', icon: '🌲', url: '/sounds/forest.mp3' },
  { id: 'ocean', name: 'Ocean', icon: '🌊', url: '/sounds/ocean.mp3' },
  { id: 'thunder', name: 'Thunder', icon: '⛈️', url: '/sounds/thunder.mp3' },
  { id: 'typing', name: 'Typing', icon: '⌨️', url: '/sounds/typing.mp3' },
  { id: 'lofi', name: 'Lo-fi', icon: '🎵', url: '/sounds/lofi.mp3' },
  { id: 'brown', name: 'Brown Noise', icon: '🟤', url: '/sounds/brown-noise.mp3' },
];

const AmbientSounds = () => {
  const [selectedSound, setSelectedSound] = useState('none');
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (selectedSound === 'none') {
      stopSound();
    } else {
      playSound();
    }
  }, [selectedSound]);

  const playSound = () => {
    if (audioRef.current && selectedSound !== 'none') {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      setIsPlaying(true);
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleSoundSelect = (soundId) => {
    setSelectedSound(soundId);
  };

  const currentSound = AMBIENT_SOUNDS.find(s => s.id === selectedSound);

  return (
    <div className="backdrop-blur-md rounded-2xl p-6 shadow-lg border w-full max-w-md" style={{
      backgroundColor: 'var(--color-cardBg)',
      borderColor: 'var(--color-border)'
    }}>
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-textPrimary)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-textPrimary)' }}>
          Ambient Sounds
        </h3>
      </div>

      {/* Sound Selection */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {AMBIENT_SOUNDS.map((sound) => (
          <button
            key={sound.id}
            onClick={() => handleSoundSelect(sound.id)}
            className="p-3 rounded-xl transition-all"
            style={{
              background: selectedSound === sound.id
                ? `linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))`
                : 'var(--color-surface)',
              color: selectedSound === sound.id ? '#ffffff' : 'var(--color-textPrimary)',
              transform: selectedSound === sound.id ? 'scale(1.05)' : 'scale(1)',
              boxShadow: selectedSound === sound.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            <div className="text-2xl mb-1">{sound.icon}</div>
            <div className="text-xs font-medium">{sound.name}</div>
          </button>
        ))}
      </div>

      {/* Volume Control */}
      {selectedSound !== 'none' && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--color-textPrimary)' }}>
              Volume
            </label>
            <span className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: 'var(--color-surface)',
              accentColor: 'var(--color-primary)'
            }}
          />
        </div>
      )}

      {/* Audio Element */}
      {currentSound && currentSound.url && (
        <audio
          ref={audioRef}
          src={currentSound.url}
          loop
          preload="auto"
        />
      )}

      {/* Status */}
      {selectedSound !== 'none' && (
        <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: 'var(--color-textSecondary)' }}>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: isPlaying ? 'var(--color-success)' : 'var(--color-textTertiary)',
              animation: isPlaying ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
            }}
          />
          <span>{isPlaying ? 'Playing' : 'Loading...'}</span>
        </div>
      )}
    </div>
  );
};

export default AmbientSounds;
