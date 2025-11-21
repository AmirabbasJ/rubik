import shuffle from 'lodash.shuffle';
import { useEffect } from 'react';
import useSound from 'use-sound';
import { useLocalStorage } from './useLocalStorage';

const soundEffectTimestamps = {
  a: [0, 400] as [number, number],
  b: [2200, 400] as [number, number],
  c: [9100, 400] as [number, number],
  d: [11500, 400] as [number, number],
};

export function useRubikAudio() {
  const [isMuted, setIsMute] = useLocalStorage('isMuted', false);

  const [play90] = useSound('/audio/sound-effects.mp3', {
    soundEnabled: !isMuted,
    playbackRate: 1.6,
    sprite: soundEffectTimestamps,
  });

  const [play180] = useSound('/audio/sound-effects.mp3', {
    soundEnabled: !isMuted,
    playbackRate: 1.5,
    sprite: soundEffectTimestamps,
  });

  const [playTheme, { pause, sound }] = useSound('/audio/theme.mp3', {
    loop: true,
    soundEnabled: !isMuted,
    volume: 0.2,
  });

  function toggle() {
    if (isMuted && !sound?.playing?.()) playTheme();
    else pause();
    setIsMute((m) => !m);
  }

  useEffect(() => {
    if (!isMuted && !sound?.playing?.()) {
      playTheme();
    }
  }, [isMuted, playTheme, sound]);

  function playRotationAudio(multiplier: number) {
    const id = shuffle(Object.keys(soundEffectTimestamps))[0];
    const play = multiplier === 1 ? play90 : play180;
    play({ id: id });
  }

  return {
    toggleMute: toggle,
    isMuted,
    playRotationAudio,
  };
}
