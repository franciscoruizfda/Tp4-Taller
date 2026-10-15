import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { RUTA, ir } from './rutas';
import barRecord from './assets/bar-record.svg';
import barPlay from './assets/bar-play.svg';

// The slides are drawn on a 1920 px wide artboard, like the Figma frames: positions below are the
// frame's own coordinates, and the whole artboard is scaled to the window (see Infografia.tsx).
export function at(left: number, top: number, width?: number, height?: number): CSSProperties {
  return { left, top, width, height };
}

// Font size as a variable, so a theme can scale every text at once (wider fonts, see estilo-app.css).
export function tam(px: number): CSSProperties {
  return { '--tam': `${px}px` } as CSSProperties;
}

type Seccion = 'inicio' | 'nucleo1' | 'nucleo2' | 'nucleo3';

export function Diapositiva({
  alto,
  seccion,
  children,
  className = '',
}: {
  alto: number;
  seccion?: Seccion;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`ig-slide ${className}`} style={{ height: alto }}>
      {seccion && <BarraSuperior activa={seccion} />}
      {children}
    </section>
  );
}

const SECCIONES: { id: Seccion; texto: string; href: string; left: number }[] = [
  { id: 'inicio', texto: 'INICIO', href: RUTA.inicio, left: 425 },
  { id: 'nucleo1', texto: 'NÚCLEO 1', href: RUTA.nucleo1(), left: 547 },
  { id: 'nucleo2', texto: 'NÚCLEO 2', href: RUTA.nucleo2(), left: 709 },
  { id: 'nucleo3', texto: 'NÚCLEO 3', href: RUTA.nucleo3, left: 871 },
];

// The transport bar of a DAW: record, play, pause and stop are decoration; the sections navigate.
function BarraSuperior({ activa }: { activa: Seccion }) {
  return (
    <nav className="ig-barra" aria-label="Secciones de la infografía">
      <i className="ig-barra-fondo" />
      <img className="ig-barra-rec" src={barRecord} alt="" style={at(162, 53, 36, 36)} />
      <img className="ig-barra-play" src={barPlay} alt="" style={at(223, 55, 36, 36)} />
      <i className="ig-barra-pausa" style={at(283, 53, 12, 36)} />
      <i className="ig-barra-pausa" style={at(304, 53, 12, 36)} />
      <i className="ig-barra-pausa" style={at(335, 53, 33, 36)} />
      {SECCIONES.map((s) => (
        <a
          key={s.id}
          className={`ig-barra-link ${s.id === activa ? 'activa' : ''}`}
          href={s.href}
          aria-current={s.id === activa ? 'page' : undefined}
          style={at(s.left, 48)}
        >
          {s.texto}
        </a>
      ))}
      {[
        [1665, 85, 16, true],
        [1682, 74, 27, true],
        [1699, 62, 39, true],
        [1716, 50, 51, false],
        [1733, 40, 61, false],
      ].map(([left, top, alto, on]) => (
        <i
          key={left as number}
          className={`ig-senal ${on ? 'on' : ''}`}
          style={at(left as number, top as number, 10, alto as number)}
        />
      ))}
    </nav>
  );
}

// «NÚCLEO 1 • (1.1)—(1.2)—(1.3)—(1.4)»: where the visitor is inside the section.
const PASOS_X = [875, 983, 1093, 1203];

export function Pasos({
  nucleo,
  total,
  actual,
  href,
}: {
  nucleo: number;
  total: number;
  actual: number;
  href?: (paso: number) => string;
}) {
  // The Figma group is centred for four steps; each missing step moves it half a step right.
  const dx = ((PASOS_X.length - total) * (PASOS_X[1] - PASOS_X[0])) / 2;
  const xs = PASOS_X.slice(0, total).map((x) => x + dx);
  return (
    <div className="ig-pasos" aria-label={`Núcleo ${nucleo}, paso ${actual} de ${total}`}>
      <span className="ig-pasos-nombre" style={at(682 + dx, 183)}>
        NÚCLEO {nucleo}
      </span>
      <i className="ig-pasos-punto" style={at(817 + dx, 200, 10, 10)} />
      {xs.map((left, i) => {
        const paso = i + 1;
        const contenido = (
          <>
            {nucleo}.{paso}
          </>
        );
        return (
          <Fragment key={paso}>
            {i > 0 && <i className="ig-pasos-linea" style={at(xs[i - 1] + 42, 205, left - xs[i - 1] - 50, 1)} />}
            {href ? (
              <a
                className={`ig-paso ${paso === actual ? 'actual' : ''}`}
                href={href(paso)}
                aria-current={paso === actual ? 'step' : undefined}
                style={at(left, 188, 35, 35)}
              >
                {contenido}
              </a>
            ) : (
              <span className={`ig-paso ${paso === actual ? 'actual' : ''}`} style={at(left, 188, 35, 35)}>
                {contenido}
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

// Display titles: the white-to-orchid text sits on three offset copies (orchid, blue, mint),
// the stacked «print» look of the Figma titles. `capas` are those offsets in px.
export function TituloNeon({
  children,
  left,
  top,
  size,
  width,
  capas = [4, 8, 12],
  centrado = false,
  como: Etiqueta = 'h1',
}: {
  children: ReactNode;
  left: number;
  top: number;
  size: number;
  width?: number;
  capas?: [number, number, number];
  centrado?: boolean;
  como?: 'h1' | 'h2' | 'p';
}) {
  return (
    <Etiqueta
      className={`ig-titulo ${centrado ? 'centrado' : ''}`}
      style={{ ...at(left, top, width), ...tam(size), whiteSpace: width ? undefined : 'nowrap' }}
    >
      <span className="ig-titulo-capa verde" style={{ top: capas[2] }} aria-hidden="true">
        {children}
      </span>
      <span className="ig-titulo-capa azul" style={{ top: capas[1] }} aria-hidden="true">
        {children}
      </span>
      <span className="ig-titulo-capa rosa" style={{ top: capas[0] }} aria-hidden="true">
        {children}
      </span>
      <span className="ig-titulo-frente">{children}</span>
    </Etiqueta>
  );
}

// A glowing neon outline. It is its own element so the glow (a filter) never blurs the content.
export function Neon({
  style,
  variante = 'rosa',
  grosor = 7,
  radio = 33,
}: {
  style: CSSProperties;
  variante?: 'rosa' | 'verde' | 'azul' | 'violeta' | 'menta' | 'trivia';
  grosor?: number;
  radio?: number;
}) {
  return (
    <i
      className={`ig-neon ${variante}`}
      style={{ ...style, '--grosor': `${grosor}px`, borderRadius: radio } as CSSProperties}
      aria-hidden="true"
    />
  );
}

export function BotonVolver({ left, top, href }: { left: number; top: number; href: string }) {
  return (
    <a className="ig-boton contorno" href={href} style={at(left, top, 303, 81)}>
      VOLVER
    </a>
  );
}

export function BotonSiguiente({
  left,
  top,
  href,
  onClick,
  children = 'SIGUIENTE',
  width = 303,
}: {
  left: number;
  top: number;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  width?: number;
}) {
  if (onClick)
    return (
      <button className="ig-boton relleno" onClick={onClick} style={at(left, top, width, 81)}>
        {children}
      </button>
    );
  return (
    <a className="ig-boton relleno" href={href} style={at(left, top, width, 81)}>
      {children}
    </a>
  );
}

// The BeatMind waveform logo. Bars are relative to the first bar and the top of the tallest one,
// measured on the cover slide; `escala` reproduces the bigger copies (loading screen, slide 1.4).
const ONDA: [number, number, number, 'rosa' | 'azul' | 'verde'][] = [
  [0, 28, 19, 'rosa'],
  [19, 22, 31, 'rosa'],
  [38, 20, 35, 'rosa'],
  [56, 13, 49, 'azul'],
  [75, 28, 19, 'azul'],
  [94, 7, 61, 'azul'],
  [113, 15, 45, 'verde'],
  [132, 0, 75, 'verde'],
  [151, 25, 26, 'verde'],
];

export function OndaLogo({ left, top, escala = 1 }: { left: number; top: number; escala?: number }) {
  return (
    <div className="ig-onda" aria-hidden="true">
      {ONDA.map(([x, y, alto, color], i) => (
        <i
          key={i}
          className={color}
          style={{
            ...at(left + x * escala, top + y * escala, 10 * escala, alto * escala),
            animationDelay: `${(i % 4) * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Imagen({ src, style, className = '' }: { src: string; style: CSSProperties; className?: string }) {
  return <img className={`ig-img ${className}`} src={src} alt="" style={style} draggable={false} />;
}

export { ir, RUTA };
