import { useEffect, useState } from 'react';

// Every screen of the infographic has its own hash, so the browser's back button, reloads and
// shared links land on the same slide. BeatMind itself lives at #/beatmind.
export type Ruta =
  | { vista: 'inicio' }
  | { vista: 'carga' }
  | { vista: 'nucleo1'; paso: number }
  | { vista: 'nucleo2'; paso: number }
  | { vista: 'nucleo3' }
  | { vista: 'beatmind' };

export const RUTA = {
  inicio: '#/',
  carga: '#/carga',
  nucleo1: (paso = 1) => `#/nucleo-1/${paso}`,
  nucleo2: (paso = 1) => `#/nucleo-2/${paso}`,
  nucleo3: '#/nucleo-3',
  beatmind: '#/beatmind',
};

export function leerRuta(hash: string): Ruta {
  const partes = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const paso = (max: number) => Math.min(max, Math.max(1, Number(partes[1]) || 1));
  switch (partes[0]) {
    case 'carga':
      return { vista: 'carga' };
    case 'nucleo-1':
      return { vista: 'nucleo1', paso: paso(4) };
    case 'nucleo-2':
      return { vista: 'nucleo2', paso: paso(4) };
    case 'nucleo-3':
      return { vista: 'nucleo3' };
    case 'beatmind':
      return { vista: 'beatmind' };
    default:
      return { vista: 'inicio' };
  }
}

export function ir(hash: string) {
  if (window.location.hash === hash) return;
  window.location.hash = hash;
}

export function useRuta() {
  const [ruta, setRuta] = useState(() => leerRuta(window.location.hash));
  useEffect(() => {
    const cambiar = () => setRuta(leerRuta(window.location.hash));
    window.addEventListener('hashchange', cambiar);
    return () => window.removeEventListener('hashchange', cambiar);
  }, []);
  return ruta;
}
