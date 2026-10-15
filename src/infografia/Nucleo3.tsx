import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { BotonSiguiente, Diapositiva, Imagen, Neon, Pasos, RUTA, TituloNeon, at, tam } from './comun';
import { bloquearNucleo3 } from '../nucleo3';
import { COMPARTIDO, registrarPartida, useEstadisticas } from './estadisticas';
import { ir } from './rutas';
import { ARTISTAS } from './trivia';
import tarjeta from './assets/trivia-tarjeta.svg';
import tarjetaCorta from './assets/trivia-tarjeta-corta.svg';
import circulo from './assets/paso-circulo.svg';
import play from './assets/trivia-play.svg';
import byteAcierto from './assets/byte-acierto.webp';
import globo from './assets/globo.svg';
import globoPico from './assets/globo-pico.svg';
import globoGrande from './assets/globo-grande.svg';
import globoGrandePico from './assets/globo-grande-pico.svg';

type Fase =
  | { tipo: 'pregunta'; i: number }
  | { tipo: 'respuesta'; i: number }
  | { tipo: 'resultados' }
  | { tipo: 'grafico' };

const pasos = (actual: number) => <Pasos nucleo={3} total={3} actual={actual} />;

// Byte's pose is the left half of a two-pose sheet, as cropped in Figma.
function Byte({ style }: { style: CSSProperties }) {
  return (
    <span className="ig-byte-recorte" style={style}>
      <img src={byteAcierto} alt="" />
    </span>
  );
}

// Speech bubble: an ellipse plus a rotated triangle pointing at Byte.
function Globo({
  grande = false,
  texto,
  tamano,
}: {
  grande?: boolean;
  texto: string;
  tamano: number;
}) {
  const [caja, pico, giro] = grande
    ? [at(515, 949, 449, 201), at(461, 1042.6, 115.5, 116.5), { w: 68.9, h: 95.6, t: 'rotate(-130.28deg) skewX(1.74deg)' }]
    : [at(1441, 391, 389, 173), at(1394, 472, 100, 100), { w: 59.4, h: 82.4, t: 'rotate(-130.42deg) skewX(1.45deg)' }];
  return (
    <>
      <span className="ig-globo-pico" style={pico}>
        <span style={{ width: giro.w, height: giro.h, transform: giro.t }}>
          <img src={grande ? globoGrandePico : globoPico} alt="" />
        </span>
      </span>
      <span className="ig-globo" style={caja}>
        <img src={grande ? globoGrande : globo} alt="" />
        <span style={{ ...tam(tamano) }}>{texto}</span>
      </span>
    </>
  );
}

function Pregunta({
  i,
  elegida,
  onResponder,
}: {
  i: number;
  elegida: boolean | null;
  onResponder: (esIA: boolean) => void;
}) {
  const artista = ARTISTAS[i];
  const audio = useRef<HTMLAudioElement | null>(null);
  const [estado, setEstado] = useState<'quieto' | 'cargando' | 'sonando' | 'error'>('quieto');

  useEffect(() => {
    const elemento = new Audio(artista.audio);
    elemento.preload = 'none';
    elemento.onplaying = () => setEstado('sonando');
    elemento.onpause = () => setEstado((e) => (e === 'error' ? e : 'quieto'));
    elemento.onerror = () => setEstado('error');
    audio.current = elemento;
    setEstado('quieto');
    return () => {
      // Detach the handlers first: clearing the source fires an error we must not show.
      elemento.onplaying = elemento.onpause = elemento.onerror = null;
      elemento.pause();
      elemento.removeAttribute('src');
      elemento.load();
      audio.current = null;
    };
  }, [artista.audio]);

  const alternar = () => {
    const elemento = audio.current;
    if (!elemento) return;
    if (!elemento.paused) return elemento.pause();
    setEstado('cargando');
    elemento.play().catch(() => setEstado('error'));
  };

  return (
    <Diapositiva alto={2200} seccion="nucleo3">
      {pasos(1)}
      <TituloNeon left={164} top={289} size={163} capas={[4, 8, 12]}>
        ¡ADIVINÁ QUIÉN!
      </TituloNeon>
      <p className="ig-texto menta" style={{ ...at(164, 520), ...tam(55) }}>
        Escuchá y decidí: ¿IA o humano?
      </p>
      <p className="ig-texto menta suave" style={{ ...at(164, 600), ...tam(36) }}>
        Artista {i + 1} de {ARTISTAS.length}
      </p>

      <Imagen className="ig-fondo-tarjeta" src={tarjeta} style={at(339, 877, 1240, 1196)} />
      <Neon style={at(324, 877, 1272, 1196)} variante="trivia" grosor={20} />
      <Neon style={at(336.5, 889.5, 1247, 1171)} variante="violeta" grosor={5} radio={46} />
      <h2 className="ig-artista" style={at(324, 1009, 1272)}>
        {artista.nombre}
      </h2>
      <button
        className={`ig-play ${estado}`}
        style={at(803, 1335, 313, 301)}
        onClick={alternar}
        aria-label={estado === 'sonando' ? `Pausar a ${artista.nombre}` : `Escuchar a ${artista.nombre}`}
      >
        <img className="ig-play-circulo" src={circulo} alt="" style={at(6, 0, 301, 301)} />
        {estado === 'sonando' ? (
          <span className="ig-play-pausa" aria-hidden="true">
            <i />
            <i />
          </span>
        ) : (
          <img src={play} alt="" style={at(0, 29, 313, 244)} />
        )}
      </button>
      {estado === 'error' && (
        <p className="ig-texto centrado menta" style={{ ...at(324, 1660, 1272), ...tam(32) }}>
          No pudimos cargar el audio. Revisá la conexión a internet.
        </p>
      )}
      {estado === 'sonando' && (
        <p className="ig-texto centrado menta suave" style={{ ...at(324, 1660, 1272), ...tam(32) }}>
          ♪ {artista.tema}
        </p>
      )}
      <button
        className={`ig-respuesta ia ${elegida === true ? 'elegida' : ''}`}
        style={at(652, 1841, 296, 108)}
        onClick={() => onResponder(true)}
      >
        ES IA
      </button>
      <button
        className={`ig-respuesta humano ${elegida === false ? 'elegida' : ''}`}
        style={at(972, 1841, 296, 108)}
        onClick={() => onResponder(false)}
      >
        ES HUMANO
      </button>
    </Diapositiva>
  );
}

function Respuesta({ i, acerto, onVolver, onSeguir }: { i: number; acerto: boolean; onVolver: () => void; onSeguir: () => void }) {
  const artista = ARTISTAS[i];
  return (
    <Diapositiva alto={1611} seccion="nucleo3">
      {pasos(1)}
      <TituloNeon left={162} top={318} size={163} capas={[5, 10, 12]}>
        {acerto ? '¡ACERTASTE!' : '¡FALLASTE!'}
      </TituloNeon>
      <Imagen className="ig-fondo-tarjeta" src={tarjetaCorta} style={at(339, 877, 1240, 395)} />
      <Neon style={at(324, 877, 1272, 395)} variante="trivia" grosor={20} />
      <Neon style={at(336.5, 889.5, 1247, 370)} variante="violeta" grosor={5} radio={46} />
      <p className="ig-revelacion" style={at(324, 987, 1272)}>
        {artista.nombre}
        <br />
        {artista.revelacion}
      </p>
      <Byte style={at(1128, 456, 445, 475)} />
      <Globo texto={acerto ? '¡Nada mal!' : '¡Seguí intentando!'} tamano={acerto ? 50 : 40} />
      <button className="ig-boton contorno" style={at(647, 1451, 303, 81)} onClick={onVolver}>
        VOLVER
      </button>
      <BotonSiguiente left={970} top={1451} onClick={onSeguir} />
    </Diapositiva>
  );
}

function Resultados({ correctas, onFinalizar }: { correctas: number; onFinalizar: () => void }) {
  return (
    <Diapositiva alto={1611} seccion="nucleo3">
      {pasos(2)}
      <h1 className="ig-gradiente resultados" style={at(0, 398, 1920)}>
        TUS RESULTADOS
      </h1>
      <p className="ig-gradiente puntaje" style={at(0, 653, 1920)}>
        {correctas} {correctas === 1 ? 'correcta' : 'correctas'} de {ARTISTAS.length}
      </p>
      <Byte style={at(148, 1026, 516, 551)} />
      <Globo grande texto={correctas <= 1 ? 'Seguí intentando...' : 'Seguí así...'} tamano={50} />
      <BotonSiguiente left={1293} top={1452} width={465} onClick={onFinalizar}>
        FINALIZAR
      </BotonSiguiente>
    </Diapositiva>
  );
}

const porcentaje = (parte: number, total: number) => (total ? Math.round((parte / total) * 100) : 0);

// 3.3: the live chart, in the style of the Figma «gráfico» frames, plus a row per artist.
function Grafico({ onRepetir }: { onRepetir: () => void }) {
  const { datos, conectado } = useEstadisticas();
  const respuestas = datos.correctas + datos.incorrectas;
  const ok = porcentaje(datos.correctas, respuestas);
  const mal = respuestas ? 100 - ok : 0;
  const ALTO = 700;

  return (
    <Diapositiva alto={1960} seccion="nucleo3">
      {pasos(3)}
      <TituloNeon left={164} top={289} size={128} capas={[6, 12, 15]}>
        ¿CUÁNTOS ACIERTAN?
      </TituloNeon>
      <p className="ig-texto menta" style={{ ...at(164, 470), ...tam(55), whiteSpace: 'nowrap' }}>
        Cuántas personas distinguen a un artista hecho con IA de uno humano
      </p>
      <p className={`ig-en-vivo ${conectado ? '' : 'sin-conexion'}`} style={at(164, 570)}>
        <i />
        {COMPARTIDO ? (conectado ? 'EN VIVO' : 'SIN CONEXIÓN') : 'EN ESTA COMPUTADORA'} ·{' '}
        {datos.partidas === 1 ? '1 partida' : `${datos.partidas} partidas`}
      </p>

      <div className="ig-grafico" style={at(162, 660, 880, 1000)}>
        <Neon style={at(0, 0, 880, 1000)} variante="trivia" grosor={12} />
        {[100, 75, 50, 25, 0].map((p) => (
          <div key={p} className="ig-grafico-linea" style={at(150, 80 + ((100 - p) / 100) * ALTO, 690)}>
            <span>{p}%</span>
          </div>
        ))}
        {[
          ['CORRECTAS', ok, 'ok', 230],
          ['INCORRECTAS', mal, 'mal', 540],
        ].map(([nombre, valor, clase, x]) => (
          <div key={nombre as string}>
            <i
              className={`ig-barra-dato ${clase}`}
              style={{ ...at(x as number, 80 + ALTO - ((valor as number) / 100) * ALTO, 230), height: ((valor as number) / 100) * ALTO }}
            />
            <span
              className="ig-barra-valor"
              style={at((x as number) - 35, 80 + ALTO - ((valor as number) / 100) * ALTO - 86, 300)}
            >
              {respuestas ? `${valor}%` : ''}
            </span>
            <span className="ig-barra-nombre" style={at((x as number) - 60, 80 + ALTO + 34, 350)}>
              {nombre}
            </span>
          </div>
        ))}
        {!respuestas && (
          <p className="ig-texto centrado menta" style={{ ...at(120, 380, 720), ...tam(40) }}>
            Todavía nadie terminó la trivia
          </p>
        )}
      </div>

      <div className="ig-por-artista" style={at(1090, 660, 668, 1000)}>
        <Neon style={at(0, 0, 668, 1000)} />
        <h2 className="ig-capa-titulo" style={at(48, 40)}>
          POR ARTISTA
        </h2>
        <span className="ig-texto suave" style={{ ...at(48, 104), ...tam(30) }}>
          Personas que lo adivinaron
        </span>
        {ARTISTAS.map((a, n) => {
          const { ok: bien, mal: error } = datos.artistas[a.id];
          const valor = porcentaje(bien, bien + error);
          const y = 180 + n * 132;
          return (
            <div key={a.id}>
              <span className="ig-artista-fila" style={at(48, y)}>
                {a.nombre}
              </span>
              <span className={`ig-etiqueta-tipo ${a.esIA ? 'ia' : 'humano'}`} style={at(330, y + 4)}>
                {a.esIA ? 'IA' : 'HUMANO'}
              </span>
              <i className="ig-artista-pista" style={at(48, y + 70, 420, 22)} />
              <i className="ig-artista-relleno" style={at(48, y + 70, (420 * valor) / 100, 22)} />
              <span className="ig-artista-valor" style={at(490, y + 50)}>
                {bien + error ? `${valor}%` : '—'}
              </span>
            </div>
          );
        })}
      </div>

      <button className="ig-boton contorno" style={at(560, 1760, 380, 81)} onClick={onRepetir}>
        JUGAR DE NUEVO
      </button>
      <BotonSiguiente
        left={980}
        top={1760}
        width={380}
        onClick={() => {
          // The experience is over: the next visitor has to make their own beat.
          bloquearNucleo3();
          ir(RUTA.inicio);
        }}
      >
        VOLVER AL INICIO
      </BotonSiguiente>
    </Diapositiva>
  );
}

export function Nucleo3() {
  const [fase, setFase] = useState<Fase>({ tipo: 'pregunta', i: 0 });
  const [elecciones, setElecciones] = useState<(boolean | null)[]>(() => ARTISTAS.map(() => null));
  const registrada = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [fase]);

  const aciertos = ARTISTAS.map((a, i) => elecciones[i] === a.esIA);
  const correctas = aciertos.filter(Boolean).length;

  const finalizarRonda = () => {
    if (!registrada.current) {
      registrada.current = true;
      registrarPartida(Object.fromEntries(ARTISTAS.map((a, i) => [a.id, aciertos[i]])));
    }
    setFase({ tipo: 'resultados' });
  };

  const repetir = () => {
    registrada.current = false;
    setElecciones(ARTISTAS.map(() => null));
    setFase({ tipo: 'pregunta', i: 0 });
  };

  switch (fase.tipo) {
    case 'pregunta':
      return (
        <Pregunta
          key={fase.i}
          i={fase.i}
          elegida={elecciones[fase.i]}
          onResponder={(esIA) => {
            setElecciones((e) => e.map((v, j) => (j === fase.i ? esIA : v)));
            setFase({ tipo: 'respuesta', i: fase.i });
          }}
        />
      );
    case 'respuesta':
      return (
        <Respuesta
          i={fase.i}
          acerto={aciertos[fase.i]}
          onVolver={() => setFase({ tipo: 'pregunta', i: fase.i })}
          onSeguir={() => (fase.i + 1 < ARTISTAS.length ? setFase({ tipo: 'pregunta', i: fase.i + 1 }) : finalizarRonda())}
        />
      );
    case 'resultados':
      return <Resultados correctas={correctas} onFinalizar={() => setFase({ tipo: 'grafico' })} />;
    case 'grafico':
      return <Grafico onRepetir={repetir} />;
  }
}

