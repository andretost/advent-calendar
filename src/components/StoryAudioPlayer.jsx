import React, { useEffect, useRef, useState } from 'react';
import './StoryAudioPlayer.css';

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const StoryAudioPlayer = ({ src, playLabel, pauseLabel }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className="story-audio">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
        }}
        onTimeUpdate={(e) => {
          setCurrent(e.currentTarget.currentTime || 0);
        }}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <button
        type="button"
        className="story-audio-play"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
      >
        {playing ? '❚❚' : '▶'}
      </button>
      <div className="story-audio-track">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={current}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (audioRef.current) {
              audioRef.current.currentTime = value;
            }
            setCurrent(value);
          }}
          aria-label="Seek"
        />
        <div className="story-audio-times">
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryAudioPlayer;
