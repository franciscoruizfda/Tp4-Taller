import { useEffect, useState } from 'react';

// Trial switch between the Figma look and one closer to the BeatMind app (estilo-app.css).
// Like a dark/light toggle: it only changes the skin, and this browser remembers the choice.
export type Estilo = 'figma' | 'app';

const KEY = 'beatmind-infografia-estilo';

export function useEstilo() {
  const [estilo, setEstilo] = useState<Estilo>(() => {
    try {
      return localStorage.getItem(KEY) === 'app' ? 'app' : 'figma';
    } catch {
      return 'figma';
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(KEY, estilo);
    } catch {
      /* Private mode: the switch still works for this visit. */
    }
  }, [estilo]);
  return [estilo, setEstilo] as const;
}

const OPCIONES: { id: Estilo; texto: string }[] = [
  { id: 'figma', texto: 'Figma' },
  { id: 'app', texto: 'App' },
];

export function SelectorEstilo({ estilo, onCambiar }: { estilo: Estilo; onCambiar: (e: Estilo) => void }) {
  return (
    <div className="ig-selector" role="group" aria-label="Estilo de la infografía">
      <span className="ig-selector-titulo">Estilo</span>
      {OPCIONES.map((o) => (
        <button key={o.id} aria-pressed={estilo === o.id} onClick={() => onCambiar(o.id)}>
          {o.texto}
        </button>
      ))}
    </div>
  );
}
