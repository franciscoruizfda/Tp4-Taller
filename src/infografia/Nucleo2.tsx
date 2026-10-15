import { useState, type ReactNode } from 'react';
import { BotonSiguiente, BotonVolver, Diapositiva, Imagen, Neon, Pasos, RUTA, TituloNeon, at, tam } from './comun';
import { Fader } from './Fader';
import ondaMezcla from './assets/onda-mezcla.svg';
import faderTicks from './assets/fader-ticks.svg';
import iconMic from './assets/icon-mic.svg';
import iconMicGlow from './assets/icon-mic-glow.svg';
import iconMicVector from './assets/icon-mic-vector.svg';
import iconMixer from './assets/icon-mixer.webp';
import frecuencias from './assets/frecuencias.webp';
import flecha from './assets/flecha.svg';
import byteSenala from './assets/byte-senala-n2.webp';
import byteLaptop from './assets/byte-laptop.webp';
import iconPlayArrow from './assets/icon-play-arrow.svg';
import bytePensando from './assets/byte-pensando.webp';
import capturaBeatmind from './assets/captura-beatmind.webp';

const pasos = (actual: number) => <Pasos nucleo={2} total={4} actual={actual} href={RUTA.nucleo2} />;

/* ── 2.1 Asistencia técnica y mezcla ──────────────────────────────────────── */

// The four stems the AI separates. x is the card's left edge; the fader track sits at x + 134,
// its tick marks at x + 191 (positions from the Figma frame).
const PISTAS: [string, 'voz' | 'bateria' | 'guitarra' | 'otros', number, number][] = [
  ['VOZ', 'voz', 295, 252 / 373],
  ['BATERÍA', 'bateria', 646, 170 / 373],
  ['GUITARRA', 'guitarra', 997, 310 / 373],
  ['OTROS', 'otros', 1348, 73 / 373],
];

export function Nucleo21() {
  return (
    <Diapositiva alto={2747} seccion="nucleo2">
      {pasos(1)}
      <TituloNeon left={164} top={259} size={100} width={952} capas={[4, 8, 12]}>
        ASISTENCIA TÉCNICA Y MEZCLA
      </TituloNeon>

      <Neon style={at(162, 593, 1596, 1410)} />
      <h2 className="ig-subtitulo" style={at(237, 660)}>
        SEPARACIÓN DE PISTAS CON IA
      </h2>
      <i className="ig-onda-panel" style={at(293, 801, 1334, 285)} />
      <Imagen src={ondaMezcla} style={at(314, 840, 1282, 198)} />
      {PISTAS.map(([nombre, variante], i) => (
        <i
          key={nombre}
          className={`ig-conector ${variante}`}
          style={at([433, 786, 1144, 1489][i], 1086, 4, 38)}
        />
      ))}
      {PISTAS.map(([nombre, variante, x, valor]) => (
        <div key={nombre}>
          <span className={`ig-pista-ia ${variante}`} style={at(x, 1124, 281, 817)} />
          <img className="ig-img" src={faderTicks} alt="" style={at(x + 191, 1402, 2, 373)} />
          <Fader
            left={x + 134}
            top={1389}
            alto={373}
            ancho={13}
            inicial={valor}
            variante={variante}
            etiqueta={`Volumen de ${nombre.toLowerCase()}`}
          />
          <span className="ig-pista-ia-nombre" style={at(x, 1822, 281)}>
            {nombre}
          </span>
        </div>
      ))}
      <Imagen src={iconMic} style={at(364, 1164, 143, 143)} />
      <Imagen src={iconMicGlow} style={at(364, 1164, 143, 143)} />
      <Imagen src={iconMicVector} style={at(384.7, 1169.7, 102, 131.6)} />
      <Imagen className="ig-brillo" src={iconMixer} style={at(1425, 1211, 128, 128)} />

      <Neon style={at(167, 2042, 967, 482)} />
      <h2 className="ig-subtitulo" style={at(242, 2081)}>
        LIMPIEZA DE FRECUENCIAS
      </h2>
      <span className="ig-recorte" style={at(242, 2178, 362, 258)}>
        <img src={frecuencias} alt="Frecuencias con ruido" style={{ left: '-10.81%', top: '-23.68%', width: '241.55%', height: '140.11%' }} />
      </span>
      <Imagen src={flecha} style={at(604, 2285, 90, 44)} />
      <span className="ig-recorte" style={at(697, 2178, 362, 258)}>
        <img src={frecuencias} alt="Frecuencias limpias" style={{ left: '-135.23%', top: '-25.27%', width: '245.31%', height: '142.4%' }} />
      </span>
      <Imagen className="ig-byte" src={byteSenala} style={at(1300, 2057, 390, 466)} />

      <BotonVolver left={647} top={2588} href={RUTA.nucleo1(4)} />
      <BotonSiguiente left={970} top={2588} href={RUTA.nucleo2(2)} />
    </Diapositiva>
  );
}

/* ── 2.2 Hacé más en menos tiempo ─────────────────────────────────────────── */

export function Nucleo22() {
  return (
    <Diapositiva alto={2400} seccion="nucleo2">
      {pasos(2)}
      <TituloNeon left={135} top={297} size={128} width={992} capas={[6, 12, 15]}>
        HACÉ MÁS EN MENOS TIEMPO
      </TituloNeon>
      <Imagen className="ig-byte" src={byteLaptop} style={at(1068, 215, 605, 499)} />
      <p className="ig-texto liviano" style={{ ...at(142, 630, 943), ...tam(48) }}>
        La IA no reemplaza tu talento, <span className="rosa brillo">lo amplifica</span>
      </p>

      <div className="ig-tiempo sin-ia" style={at(142, 714, 1636, 540)}>
        <Neon style={at(0, 0, 1636, 540)} />
      </div>
      <p className="ig-cifra rosa" style={at(303, 736)}>
        4 h 30 min<span className="ig-aprox">aprox</span>
      </p>
      <p className="ig-subtitulo blanco" style={at(322, 923)}>
        <span className="verde">SIN IA:</span> TRADICIONAL (MÁS COMPLEJO)
      </p>
      <div className="ig-linea-tiempo" aria-hidden="true">
        <i className="gris" style={at(1063, 1053, 620, 32)} />
        <i className="tramo uno" style={at(322, 1044, 464, 50)} />
        <i className="tramo dos" style={at(801, 1044, 247, 50)} />
        <i className="tramo tres" style={at(1063, 1044, 277, 50)} />
        <i className="tope" style={at(322, 1030, 11, 77)} />
        <i className="tope" style={at(1677, 1030, 11, 77)} />
        <img className="ig-cabezal" src={iconPlayArrow} alt="" style={at(289, 980, 78, 107)} />
      </div>
      {[
        ['PROBAR ACORDES (2 H)', 321, 464],
        ['BAJO (1 H)', 801, 247],
        ['EFECTOS (1,5 H)', 1064, 276],
      ].map(([texto, x, ancho]) => (
        <span key={texto as string} className="ig-tramo-nombre" style={at(x as number, 1124, ancho as number, 50)}>
          {texto}
        </span>
      ))}

      <div className="ig-tiempo con-ia" style={at(142, 1302, 1636, 755)}>
        <Neon style={at(0, 0, 1636, 755)} variante="menta" />
      </div>
      <p className="ig-cifra verde" style={at(303, 1324)}>
        4 minutos<span className="ig-aprox">aprox</span>
      </p>
      <p className="ig-subtitulo blanco" style={at(326, 1523)}>
        <span className="verde">CON BEATMIND IA:</span> RÁPIDO (MÁS SENCILLO Y FLUIDO)
      </p>
      <span className="ig-bloque azul" style={at(325, 1656, 656, 224)}>
        BASE INICIAL GENERADA
        <br />
        (1 minuto)
      </span>
      <span className="ig-bloque verde" style={at(1037, 1656, 655, 223)}>
        TU TOQUE PERSONAL
        <br />
        (2 minutos)
      </span>
      <div className="ig-eje" aria-hidden="true">
        <i style={at(332, 1923, 1360, 3)} />
        <i style={at(328, 1899, 3, 52)} />
        <i style={at(1691, 1899, 3, 52)} />
        {Array.from({ length: 17 }, (_, i) => (
          <i key={i} style={at(439 + i * 72, 1911, 3, 27)} />
        ))}
      </div>
      <span className="ig-texto" style={{ ...at(321, 1954), ...tam(36) }}>
        0
      </span>
      <span className="ig-texto" style={{ ...at(1621, 1954), ...tam(36) }}>
        3 min
      </span>

      <BotonVolver left={647} top={2175} href={RUTA.nucleo2(1)} />
      <BotonSiguiente left={970} top={2175} href={RUTA.nucleo2(3)} />
    </Diapositiva>
  );
}

/* ── 2.3 ¿Para qué nos sirve la IA? ───────────────────────────────────────── */

function Uso({
  left,
  abierto,
  alto,
  onToggle,
  titulo,
  children,
}: {
  left: number;
  abierto: boolean;
  alto: number;
  onToggle: () => void;
  titulo: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      className={`ig-uso ${abierto ? 'abierto' : ''}`}
      style={at(left, 674, 429, abierto ? alto : 159)}
      aria-expanded={abierto}
      onClick={onToggle}
    >
      <Neon style={at(0, 0, 429, abierto ? alto : 159)} />
      <span className="ig-uso-titulo">{titulo}</span>
      <span className="ig-uso-texto">{children}</span>
    </button>
  );
}

export function Nucleo23() {
  const [abierto, setAbierto] = useState<'texto' | 'voz' | null>(null);
  const alternar = (id: 'texto' | 'voz') => setAbierto((a) => (a === id ? null : id));
  return (
    <Diapositiva alto={1566} seccion="nucleo2">
      {pasos(3)}
      <TituloNeon left={0} top={318} size={100} width={1920} centrado capas={[3, 6, 9]}>
        ¿PARA QUÉ NOS SIRVE LA IA?
      </TituloNeon>
      <p className="ig-texto centrado" style={{ ...at(256, 465, 1408), ...tam(55) }}>
        La IA nos puede servir para varias cosas, algunas de ellas son las siguientes
      </p>
      <Uso
        left={326}
        alto={531}
        abierto={abierto === 'texto'}
        onToggle={() => alternar('texto')}
        titulo={
          <>
            PARA <span className="verde">GENERAR MÚSICA</span>
            <br />A PARTIR DE TEXTO
          </>
        }
      >
        Convierte descripciones textuales en piezas musicales completas, esto permite que cualquier persona pueda
        generar sonidos comercializables sin tener que ser músico.
      </Uso>
      <Imagen className="ig-byte" src={bytePensando} style={at(817, 705, 286, 428)} />
      <Uso
        left={1165}
        alto={617}
        abierto={abierto === 'voz'}
        onToggle={() => alternar('voz')}
        titulo={
          <>
            PARA MEJORAR
            <br />
            LA <span className="verde">CALIDAD DE LA VOZ</span>
          </>
        }
      >
        Se logra mediante herramientas de procesamiento vocal como el auto-tune, actualmente se exagera para cambiar
        el timbre de la voz hasta volverla casi robótica, definiendo el perfil sonoro de géneros como el trap.
      </Uso>
      <BotonVolver left={647} top={1407} href={RUTA.nucleo2(2)} />
      <BotonSiguiente left={970} top={1407} href={RUTA.nucleo2(4)} />
    </Diapositiva>
  );
}

/* ── 2.4 Manos a la obra ──────────────────────────────────────────────────── */

export function Nucleo24() {
  return (
    <Diapositiva alto={2092} seccion="nucleo2">
      {pasos(4)}
      <TituloNeon left={164} top={318} size={100} width={1620} capas={[4, 8, 12]}>
        ¡MANOS A LA OBRA!
        <br />
        CREÁ TU PROPIO BEAT CON BEATMIND
      </TituloNeon>
      <p className="ig-texto" style={{ ...at(162, 636, 1408), ...tam(55) }}>
        Seleccioná tu género favorito y dejá que nuestra IA te guíe paso a paso en la composición de tu primera base
      </p>
      <a className="ig-captura-app" href={RUTA.beatmind} style={at(164.5, 940, 1591, 690)} aria-label="Abrir BeatMind">
        <img src={capturaBeatmind} alt="" />
      </a>
      <a className="ig-boton relleno grande" href={RUTA.beatmind} style={at(751, 1724, 417, 100)}>
        PROBAR EXPERIENCIA
      </a>
      <BotonVolver left={162} top={1933} href={RUTA.nucleo2(3)} />
    </Diapositiva>
  );
}
