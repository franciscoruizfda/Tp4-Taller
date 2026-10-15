import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import faderKnob from './assets/fader-knob.svg';

// A vertical fader drawn like the Figma ones: the track fills from the bottom and the knob sits on
// the fill. Visitors can drag it (mouse or touch) or use the arrow keys; it does not touch audio.
export function Fader({
  left,
  top,
  alto,
  ancho,
  inicial,
  variante,
  etiqueta,
}: {
  left: number;
  top: number;
  alto: number;
  ancho: number;
  inicial: number;
  variante: 'mezcla' | 'voz' | 'bateria' | 'guitarra' | 'otros';
  etiqueta: string;
}) {
  const [valor, setValor] = useState(inicial);
  const zona = useRef<HTMLDivElement>(null);

  const mover = (event: PointerEvent<HTMLDivElement>) => {
    const caja = zona.current?.getBoundingClientRect();
    if (!caja) return;
    // getBoundingClientRect is already in screen pixels, so the artboard zoom cancels out.
    setValor(Math.min(1, Math.max(0, (caja.bottom - event.clientY) / caja.height)));
  };

  const relleno = valor * alto;
  return (
    <div
      ref={zona}
      className={`ig-fader ${variante}`}
      style={{ left: left - 30, top, width: ancho + 60, height: alto, '--ancho': `${ancho}px` } as CSSProperties}
      role="slider"
      tabIndex={0}
      aria-label={etiqueta}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(valor * 100)}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        mover(event);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) mover(event);
      }}
      onKeyDown={(event) => {
        const paso = event.key === 'ArrowUp' || event.key === 'ArrowRight' ? 0.05 : event.key === 'ArrowDown' || event.key === 'ArrowLeft' ? -0.05 : 0;
        if (!paso) return;
        event.preventDefault();
        setValor((v) => Math.min(1, Math.max(0, v + paso)));
      }}
    >
      <i className="ig-fader-pista" />
      <i className="ig-fader-relleno" style={{ height: relleno }} />
      {variante === 'mezcla' ? (
        <img className="ig-fader-perilla svg" src={faderKnob} alt="" style={{ bottom: relleno - 24.5 }} />
      ) : (
        <i className="ig-fader-perilla" style={{ bottom: relleno - 14.5 }} />
      )}
    </div>
  );
}
