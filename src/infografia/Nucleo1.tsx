import { useState, type ReactNode } from 'react';
import {
  BotonSiguiente,
  BotonVolver,
  Diapositiva,
  Imagen,
  Neon,
  OndaLogo,
  Pasos,
  RUTA,
  TituloNeon,
  at,
  tam,
} from './comun';
import { Fader } from './Fader';
import iconMetronome from './assets/icon-metronome.webp';
import iconLayers from './assets/icon-layers.webp';
import iconDrums from './assets/icon-drums.webp';
import iconGuitar from './assets/icon-guitar.webp';
import iconMusic from './assets/icon-music.webp';
import bytePensando from './assets/byte-pensando.webp';
import pulsoOnda from './assets/pulso-onda.svg';
import pulsoOndaGlow from './assets/pulso-onda-glow.svg';
import waveVioleta from './assets/wave-violeta.webp';
import waveAzul from './assets/wave-azul.webp';
import waveVerde from './assets/wave-verde.webp';
import byteCapas from './assets/byte-presenta-capas.webp';
import capasStack from './assets/capas-stack.svg';
import capasStackGlow from './assets/capas-stack-glow.svg';
import iconPads from './assets/icon-pads.svg';
import iconPadsGlow from './assets/icon-pads-glow.svg';
import iconBass from './assets/icon-bass.webp';
import iconEstructura from './assets/icon-estructura.svg';
import iconEstructuraGlow from './assets/icon-estructura-glow.svg';
import iconMixer from './assets/icon-mixer.webp';
import faderCircle from './assets/fader-circle.svg';
import iconMusicDark from './assets/icon-music-dark.webp';
import iconAudioDark from './assets/icon-audio-dark.webp';
import iconGuitarDark from './assets/icon-guitar-dark.webp';
import iconDrumsDark from './assets/icon-drums-dark.webp';
import knobTrack from './assets/knob-track.svg';
import knobTrack2 from './assets/knob-track-2.svg';
import knobArcFull from './assets/knob-arc-full.svg';
import knobArcQuarter from './assets/knob-arc-quarter.svg';
import knobArcHalf from './assets/knob-arc-half.svg';
import flLogo from './assets/fl-studio-logo.webp';
import byteProductor from './assets/byte-productor.webp';
import flCaptura from './assets/fl-studio-captura.webp';
import bizarrap from './assets/bizarrap.webp';
import bytePensando2 from './assets/byte-pensando-2.webp';
import byteIa from './assets/byte-ia.webp';
import iconHeadphonesW from './assets/icon-headphones-white.webp';
import iconMusicW from './assets/icon-music-white.webp';
import iconDownloadW from './assets/icon-download-white.webp';
import iconTimerW from './assets/icon-timer-white.webp';
import iconBassdrumW from './assets/icon-bassdrum-white.webp';
import iconGuitarW from './assets/icon-guitar-white.webp';
import iconTuneW from './assets/icon-tune-white.webp';
import pasoCirculo from './assets/paso-circulo.svg';

const pasos = (actual: number) => <Pasos nucleo={1} total={4} actual={actual} href={RUTA.nucleo1} />;

/* ── 1.1 ¿Qué es un beat? ─────────────────────────────────────────────────── */

// A card that opens to show its explanation, like the «+» variants of the Figma component.
function Desplegable({
  left,
  top,
  abierto,
  onToggle,
  titulo,
  children,
}: {
  left: number;
  top: number;
  abierto: boolean;
  onToggle: () => void;
  titulo: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      className={`ig-desplegable ${abierto ? 'abierto' : ''}`}
      style={at(left, top, 465, abierto ? 359 : 97)}
      aria-expanded={abierto}
      onClick={onToggle}
    >
      <Neon style={at(0, 0, 465, abierto ? 359 : 97)} />
      {titulo}
      <span className="ig-desplegable-cuerpo">{children}</span>
    </button>
  );
}

export function Nucleo11() {
  const [abierto, setAbierto] = useState<'pulso' | 'instrumental' | null>(null);
  const alternar = (id: 'pulso' | 'instrumental') => setAbierto((a) => (a === id ? null : id));
  return (
    <Diapositiva alto={1080} seccion="nucleo1">
      {pasos(1)}
      <TituloNeon left={0} top={287} width={1920} centrado size={100} capas={[5, 11, 15]}>
        ¿QUÉ ES UN BEAT?
      </TituloNeon>
      <p className="ig-texto centrado" style={{ ...at(0, 430, 1920), ...tam(36) }}>
        Tiene dos significados que conviene distinguir.
      </p>
      <Desplegable
        left={323}
        top={504}
        abierto={abierto === 'pulso'}
        onToggle={() => alternar('pulso')}
        titulo={
          <>
            <Imagen className="ig-brillo" src={iconMetronome} style={at(84, 22, 53, 53)} />
            <span className="ig-desplegable-titulo" style={at(142, 25)}>
              BEAT COMO <span className="verde brillo">PULSO</span>
            </span>
          </>
        }
      >
        <Imagen src={pulsoOnda} style={at(28.7, 97.5, 409, 69)} />
        <Imagen src={pulsoOndaGlow} style={at(23.5, 92.5, 419, 80)} />
        {[94, 142, 184, 232, 272, 320, 362].map((x, i) => (
          <i key={x} className={`ig-pulso ${i % 2 ? 'verde' : 'rosa'}`} style={at(x, 195, 8, 51)} />
        ))}
        <span className="ig-texto" style={{ ...at(47, 278), ...tam(32) }}>
          Marca el tiempo de una canción
        </span>
      </Desplegable>
      <Desplegable
        left={1132}
        top={504}
        abierto={abierto === 'instrumental'}
        onToggle={() => alternar('instrumental')}
        titulo={
          <>
            <Imagen className="ig-brillo" src={iconLayers} style={at(29, 28, 42, 42)} />
            <span className="ig-desplegable-titulo" style={at(81, 25)}>
              BEAT COMO <span className="verde brillo">INSTRUMENTAL</span>
            </span>
          </>
        }
      >
        <Imagen className="ig-brillo" src={waveVioleta} style={at(137, 63, 256, 85)} />
        <Imagen className="ig-brillo" src={waveAzul} style={at(139, 130, 254, 85)} />
        <Imagen className="ig-brillo" src={waveVerde} style={at(137, 210, 256, 86)} />
        <Imagen className="ig-brillo" src={iconDrums} style={at(77, 88, 35, 35)} />
        <Imagen className="ig-brillo" src={iconGuitar} style={at(73, 151, 44, 44)} />
        <Imagen className="ig-brillo" src={iconMusic} style={at(73, 233, 39, 39)} />
        <span className="ig-texto" style={{ ...at(43, 303), ...tam(32) }}>
          Todo lo que suena menos la voz
        </span>
      </Desplegable>
      <Imagen className="ig-byte" src={bytePensando} style={at(817, 468, 286, 428)} />
      <BotonVolver left={647} top={939} href={RUTA.inicio} />
      <BotonSiguiente left={970} top={939} href={RUTA.nucleo1(2)} />
    </Diapositiva>
  );
}

/* ── 1.2 Las capas de un beat ─────────────────────────────────────────────── */

// Each card is 1596 × 367 at x = 162; everything inside is relative to the card.
function Capa({
  top,
  icono,
  titulo,
  tituloY,
  texto,
  textoY,
  textoNegrita = false,
  children,
}: {
  top: number;
  icono: ReactNode;
  titulo: string;
  tituloY: number;
  texto: string;
  textoY: number;
  textoNegrita?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="ig-capa" style={at(162, top, 1596, 367)}>
      <Neon style={at(0, 0, 1596, 367)} />
      {icono}
      <h2 className="ig-capa-titulo" style={at(173, tituloY)}>
        {titulo}
      </h2>
      <p className={`ig-texto ${textoNegrita ? 'negrita' : ''}`} style={{ ...at(173, textoY, 326), ...tam(textoNegrita ? 32 : 36) }}>
        {texto}
      </p>
      {children}
    </div>
  );
}

const CASILLAS_X = [984, 1043, 1102, 1161, 1220, 1279, 1338, 1397, 1456, 1515, 1574, 1633].map((x) => x - 162);
const PERCUSION: [string, number[]][] = [
  ['KICK', [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0]],
  ['SNARE', [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]],
  ['HI-HAT', [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]],
  ['CLAP', [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0]],
];

function Percusion() {
  const [patron, setPatron] = useState(() => PERCUSION.map(([, fila]) => fila.map(Boolean)));
  return (
    <>
      {PERCUSION.map(([nombre], fila) => {
        const y = 68 + fila * 59;
        return (
          <div key={nombre}>
            <span className="ig-etiqueta" style={at(626, y, 182, 54)}>
              <i className="ig-led" />
              {nombre}
            </span>
            {CASILLAS_X.map((x, col) => (
              <button
                key={x}
                className={`ig-casilla ${patron[fila][col] ? 'on' : ''}`}
                data-capa={nombre.toLowerCase()}
                style={at(x, y, 54, 54)}
                aria-label={`${nombre}, casilla ${col + 1}`}
                aria-pressed={patron[fila][col]}
                onClick={() =>
                  setPatron((p) => p.map((r, i) => (i === fila ? r.map((v, j) => (j === col ? !v : v)) : r)))
                }
              />
            ))}
          </div>
        );
      })}
    </>
  );
}

function Bajo() {
  const notas: [number, number, number][] = [
    [0, 698, 220],
    [0, 1273, 252],
    [1, 1138, 135],
    [2, 918, 220],
  ];
  return (
    <>
      <span className="ig-etiqueta ancha" style={at(626, 39, 899, 54)}>
        <i className="ig-led" />
        Bajo
      </span>
      {[0, 1, 2].map((fila) => (
        <div key={fila}>
          <span className="ig-etiqueta" style={at(626, 98 + fila * 59, 61, 54)}>
            <i className="ig-led" />
          </span>
          <i className="ig-pista" style={at(698, 98 + fila * 59, 827, 54)} />
        </div>
      ))}
      {notas.map(([fila, x, ancho]) => (
        <i key={`${fila}-${x}`} className="ig-nota bajo" style={at(x, 98 + fila * 59, ancho, 54)} />
      ))}
    </>
  );
}

function Melodia() {
  const filas = [26, 74, 119, 164, 209, 254, 299];
  const notas: [number, number, number][] = [
    [0, 760, 351],
    [1, 1321, 204],
    [2, 760, 210],
    [2, 1111, 210],
    [3, 1321, 204],
    [4, 1111, 210],
    [5, 760, 351],
    [6, 1321, 204],
  ];
  return (
    <>
      <div className="ig-teclado" style={at(626, 26, 129, 315)} aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <i key={i} className="blanca" />
        ))}
        {[36, 81, 126, 171, 216, 261].map((y) => (
          <b key={y} style={{ top: y }} />
        ))}
      </div>
      {filas.map((y, i) => (
        <i key={y} className="ig-pista" style={at(760, y, 765, i === 0 ? 45 : 42)} />
      ))}
      {notas.map(([fila, x, ancho]) => (
        <i key={`${fila}-${x}`} className="ig-nota suave melodia" style={at(x, filas[fila], ancho, fila === 0 ? 45 : 42)} />
      ))}
    </>
  );
}

function Piano() {
  // The little keyboard icon of the melody card: seven white keys and coloured black keys.
  return (
    <div className="ig-piano" style={at(31, 45, 121, 82)} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <i key={i} />
      ))}
      {[14, 32, 49, 66, 83, 101].map((x, i) => (
        <b key={x} className={i === 1 || i === 3 ? 'verde' : 'rosa'} style={{ left: x }} />
      ))}
    </div>
  );
}

function Estructura() {
  const partes: [string, number, number][] = [
    ['INTRO', 85, 818],
    ['ESTROFA', 144, 995],
    ['ESTRIBILLO', 203, 1336],
  ];
  return (
    <>
      {partes.map(([nombre, y]) => (
        <div key={nombre}>
          <span className="ig-etiqueta centrada" style={at(626, y, 182, 54)}>
            {nombre}
          </span>
          <i className="ig-pista" style={at(818, y, 707, 54)} />
        </div>
      ))}
      {[
        [818, 80],
        [995, 139],
        [1160, 139],
        [1336, 198],
      ].map(([x, y]) => (
        <Imagen key={`${x}-${y}`} className="ig-brillo" src={waveVioleta} style={at(x, y, 189, 63)} />
      ))}
    </>
  );
}

function Mezcla() {
  const canales: [number, number, string][] = [
    [694, 98 / 187, iconMusicDark],
    [828, 157 / 187, iconAudioDark],
    [963, 62 / 187, iconGuitarDark],
    [1097, 111 / 187, iconDrumsDark],
  ];
  // Label, row top, label width, knob ring, highlighted arc and its box (left, top, w, h).
  const efectos: [string, number, number, string, [string, number, number, number, number] | null][] = [
    ['Reverb', 67, 110, knobTrack, [knobArcFull, -2, -2, 30, 30]],
    ['Delay', 134, 87, knobTrack2, [knobArcQuarter, -2, -2, 15.6, 15.6]],
    ['EQ', 200, 52, knobTrack, [knobArcHalf, -2.3, -2, 16.2, 30]],
    ['Compresor', 266, 148, knobTrack, null],
  ];
  return (
    <>
      <i className="ig-panel" style={at(626, 41, 551, 285)} />
      {canales.map(([x, valor, icono], i) => (
        <div key={x}>
          <Fader
            left={x}
            top={52}
            alto={187}
            ancho={13}
            inicial={valor}
            variante="mezcla"
            etiqueta={`Volumen del canal ${i + 1}`}
          />
          <img className="ig-img" src={faderCircle} alt="" style={at(x - 20, 255, 54, 54)} />
          <img className="ig-img" src={icono} alt="" style={at(x - 15, 260, 43, 43)} />
        </div>
      ))}
      <i className="ig-panel" style={at(1213, 41, 312, 285)} />
      {efectos.map(([nombre, y, ancho, pista, arco]) => (
        <div key={nombre}>
          <i className="ig-efecto" style={at(1226, y, ancho, 42)} />
          <span className="ig-texto" style={{ ...at(1237, y), ...tam(32) }}>
            {nombre}
          </span>
          <img className="ig-img" src={pista} alt="" style={at(1476 - 2, y + 8 - 2, 30, 30)} />
          {arco && (
            <img className="ig-img" src={arco[0]} alt="" style={at(1476 + arco[1], y + 8 + arco[2], arco[3], arco[4])} />
          )}
        </div>
      ))}
    </>
  );
}

export function Nucleo12() {
  return (
    <Diapositiva alto={2747} seccion="nucleo1">
      {pasos(2)}
      <TituloNeon left={162} top={240} size={100} width={492} capas={[4, 8, 11]}>
        LAS CAPAS DE UN BEAT
      </TituloNeon>
      <Imagen className="ig-byte" src={byteCapas} style={at(831, 244, 424, 283)} />
      <Imagen src={capasStack} style={at(1517, 308, 227, 163)} />
      <Imagen src={capasStackGlow} style={at(1517 - 8.8, 308 - 8.5, 243, 178)} />

      <Capa
        top={527}
        titulo="PERCUSIÓN"
        tituloY={42}
        textoY={97}
        texto="Marca el pulso y el ritmo."
        icono={
          <>
            <Imagen src={iconPads} style={at(31, 31, 121, 116)} />
            <Imagen src={iconPadsGlow} style={at(31 - 4, 31 - 4, 129, 124)} />
          </>
        }
      >
        <Percusion />
      </Capa>
      <Capa
        top={936}
        titulo="BAJO"
        tituloY={49}
        textoY={104}
        texto="Da peso y une el ritmo con la armonía."
        icono={<Imagen className="ig-brillo" src={iconBass} style={at(47, 44, 100, 100)} />}
      >
        <Bajo />
      </Capa>
      <Capa
        top={1345}
        titulo="MELODÍA"
        tituloY={37}
        textoY={91}
        texto="Acordes que definen el clima emocional, ya sea alegre, triste, etc."
        textoNegrita
        icono={<Piano />}
      >
        <Melodia />
      </Capa>
      <Capa
        top={1755}
        titulo="ESTRUCTURACIÓN"
        tituloY={31}
        textoY={85}
        texto="Ordenar la base instrumental en estribillo, estrofa, introducción."
        icono={
          <>
            <Imagen src={iconEstructura} style={at(22.2, 28.8, 139, 105)} />
            <Imagen src={iconEstructuraGlow} style={at(30, 36.6, 122, 89.5)} />
          </>
        }
      >
        <Estructura />
      </Capa>
      <Capa
        top={2164}
        titulo="MEZCLA"
        tituloY={26}
        textoY={92}
        texto="Equilibrar volúmenes, aplicar efectos, etc."
        textoNegrita
        icono={<Imagen className="ig-brillo" src={iconMixer} style={at(39, 26, 111, 111)} />}
      >
        <Mezcla />
      </Capa>

      <BotonVolver left={647} top={2588} href={RUTA.nucleo1(1)} />
      <BotonSiguiente left={970} top={2588} href={RUTA.nucleo1(3)} />
    </Diapositiva>
  );
}

/* ── 1.3 FL Studio para empezar ───────────────────────────────────────────── */

export function Nucleo13() {
  return (
    <Diapositiva alto={2221} seccion="nucleo1">
      {pasos(3)}
      <TituloNeon left={291} top={242} size={100} width={640} capas={[4, 8, 11]}>
        FL STUDIO PARA EMPEZAR
      </TituloNeon>
      <Imagen src={flLogo} style={at(773, 229, 147, 149)} />
      <Imagen className="ig-byte" src={byteProductor} style={at(1144, 227, 485, 302)} />
      <Imagen className="ig-captura" src={flCaptura} style={at(814, 518, 964, 541)} />
      <p className="ig-texto" style={{ ...at(142, 569, 626), ...tam(64) }}>
        <span className="verde brillo">FL STUDIO</span> es un software de producción musical que te permite crear,
        grabar, mezclar y editar sonidos.
      </p>

      <div className="ig-foto" style={at(142, 1124, 970, 546)}>
        <img src={bizarrap} alt="Bizarrap en su estudio" />
        <Neon style={at(0, 0, 970, 546)} grosor={13} radio={0} />
      </div>
      <div className="ig-texto ig-cronica" style={{ ...at(1176, 1124, 626), ...tam(32) }}>
        <p>
          La crónica de <b className="rosa">Romina Zanellato</b> en Revista Anfibia (2022) sobre{' '}
          <b className="verde">Bizarrap</b> muestra que en Argentina un beat puede hacerse con muy poco equipamiento.
        </p>
        <p>
          <b className="verde">Bizarrap</b> aprendió a usar <b className="rosa">FL Studio</b> a los 13 años y trabaja
          con una computadora, parlantes, un micrófono y algunos sintetizadores chicos.
        </p>
        <blockquote>
          “herramientas que un pibe puede tener en la habitación de su casa”.
          <cite>
            <b className="rosa">Romina Zanellato</b>, Revista Anfibia (2022)
          </cite>
        </blockquote>
      </div>

      <i className="ig-franja" style={at(142, 1735, 1636, 340)} />
      <Imagen className="ig-byte" src={bytePensando2} style={at(142, 1774, 357, 297)} />
      <p className="ig-texto negrita" style={{ ...at(485, 1829, 549), ...tam(32) }}>
        No necesitás un gran estudio para empezar. Pero ¿qué pasa cuando querés llevar tu beat a otro nivel?
      </p>
      <BotonVolver left={1132} top={1864} href={RUTA.nucleo1(2)} />
      <BotonSiguiente left={1455} top={1864} href={RUTA.nucleo1(4)} />
    </Diapositiva>
  );
}

/* ── 1.4 Mezclar música con IA ────────────────────────────────────────────── */

const RECORRIDO: [string, string, number, number, number][] = [
  // label, icon, icon size, icon left/top inside the 301 px circle
  ['ESTILO', iconHeadphonesW, 158, 72, 72],
  ['VELOCIDAD', iconTimerW, 168, 67, 67],
  ['RITMO', iconBassdrumW, 132, 85, 85],
  ['BAJO', iconGuitarW, 160, 71, 71],
  ['MELODÍA', iconMusicW, 170, 66, 66],
  ['EQUILIBRIO', iconTuneW, 158, 72, 72],
  ['TU BEAT', iconDownloadW, 184, 59, 46],
];

// The seven steps of BeatMind are wider than the slide: they glide by on a loop (pausing under the
// pointer) and can also be scrolled by hand.
function Recorrido() {
  const vuelta = [...RECORRIDO, ...RECORRIDO];
  return (
    <div className="ig-recorrido" style={at(162, 1906, 1596, 400)}>
      <div className="ig-recorrido-cinta">
        {vuelta.map(([nombre, icono, lado, x, y], i) => (
          <div key={i} className="ig-recorrido-paso" aria-hidden={i >= RECORRIDO.length}>
            <span className="ig-recorrido-circulo">
              <img src={pasoCirculo} alt="" className={i % RECORRIDO.length === 0 ? 'invertido' : ''} />
              <img src={icono} alt="" style={at(x, y, lado, lado)} />
            </span>
            <span className="ig-recorrido-nombre">{nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const INSTANCIAS: [string, string, number, number, number][] = [
  ['Elegí un estilo', iconHeadphonesW, 162, 194, 55],
  ['Sumá sonidos', iconMusicW, 808, 194, 55],
  ['Guardá tu base', iconDownloadW, 1461, 184, 60],
];

export function Nucleo14() {
  return (
    <Diapositiva alto={2700} seccion="nucleo1">
      {pasos(4)}
      <TituloNeon left={257} top={242} size={100} width={764} capas={[4, 7, 10]}>
        MEZCLAR MÚSICA CON IA
      </TituloNeon>
      <Imagen className="ig-byte" src={byteIa} style={at(1123, 253, 655, 437)} />
      <p className="ig-texto" style={{ ...at(257, 509, 880), ...tam(36) }}>
        Hoy en día, casi cualquier persona tiene las herramientas a mano para poder crear un beat, pero si se quiere
        escalar, muchas veces suele ser difícil si no se tiene conocimiento sobre música.
      </p>

      <Neon style={at(162, 690, 1596, 368)} />
      <p className="ig-texto" style={{ ...at(219, 728, 1054), ...tam(64) }}>
        Por eso, en esta experiencia vamos a estar usando “BeatMind”
      </p>
      <p className="ig-texto" style={{ ...at(219, 904, 1054), ...tam(36) }}>
        Un software inspirado en FL Studio el cual utiliza Inteligencia artificial para hacer que el proceso de
        aprendizaje sea más sencillo y rápido.
      </p>
      <OndaLogo left={1393} top={766} escala={1.2} />
      <TituloNeon left={1288} top={857} size={96} capas={[4, 8, 11]} como="p">
        BEATMIND
      </TituloNeon>

      <p className="ig-texto centrado" style={{ ...at(0, 1106, 1920), ...tam(64) }}>
        A <span className="rosa brillo">3</span> instancias de crear tu propio beat
      </p>
      {INSTANCIAS.map(([texto, icono, x, lado, pad]) => (
        <div key={texto}>
          <span className="ig-instancia" style={at(x, 1242, 304, 304)}>
            <img src={icono} alt="" style={at(pad - 6, pad - 6, lado, lado)} />
          </span>
          <span className="ig-texto centrado" style={{ ...at(x - 48, 1558, 400), ...tam(36) }}>
            {texto}
          </span>
        </div>
      ))}

      <p className="ig-texto centrado" style={{ ...at(0, 1738, 1920), ...tam(64) }}>
        Seguí todos los pasos y descargá el resultado
      </p>
      <Recorrido />

      <BotonVolver left={644} top={2504} href={RUTA.nucleo1(3)} />
      <BotonSiguiente left={970} top={2504} href={RUTA.nucleo2(1)}>
        NÚCLEO 2
      </BotonSiguiente>
    </Diapositiva>
  );
}

