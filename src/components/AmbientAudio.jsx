import React, { useEffect, useRef } from 'react';

/**
 * Soft synthetic winter ambience (filtered noise). Controlled by parent; starts off.
 */
const AmbientAudio = ({ enabled, onToggle, labelOn, labelOff }) => {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
        gainRef.current = null;
      }
    };
  }, []);

  const ensureGraph = async () => {
    if (ctxRef.current) return ctxRef.current;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;
    filter.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);

    ctxRef.current = ctx;
    gainRef.current = gain;
    return ctx;
  };

  useEffect(() => {
    let cancelled = false;

    const sync = async () => {
      if (!enabled) {
        if (gainRef.current && ctxRef.current) {
          const now = ctxRef.current.currentTime;
          gainRef.current.gain.cancelScheduledValues(now);
          gainRef.current.gain.linearRampToValueAtTime(0, now + 0.4);
        }
        return;
      }

      const ctx = await ensureGraph();
      if (!ctx || cancelled || !gainRef.current) return;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      const now = ctx.currentTime;
      gainRef.current.gain.cancelScheduledValues(now);
      gainRef.current.gain.linearRampToValueAtTime(0.035, now + 0.8);
    };

    sync();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const handleClick = async () => {
    await ensureGraph();
    onToggle(!enabled);
  };

  return (
    <button
      type="button"
      className={`calendar-tool-btn${enabled ? ' is-active' : ''}`}
      onClick={handleClick}
      aria-pressed={enabled}
      title={enabled ? labelOff : labelOn}
    >
      <span className="calendar-tool-icon" aria-hidden="true">{enabled ? '♪' : '♩'}</span>
      <span className="calendar-tool-label">{enabled ? labelOff : labelOn}</span>
    </button>
  );
};

export default AmbientAudio;
