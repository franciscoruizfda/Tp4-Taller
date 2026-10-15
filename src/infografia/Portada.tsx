import { useEffect } from 'react';
import { Diapositiva, Imagen, OndaLogo, RUTA, TituloNeon, at, ir } from './comun';
import byteInicio from './assets/byte-inicio.webp';
import tweeterRing from './assets/speaker-tweeter-ring.svg';
import tweeterRingGlow from './assets/speaker-tweeter-ring-glow.svg';
import tweeterCore from './assets/speaker-tweeter-core.svg';
import tweeterGlow from './assets/speaker-tweeter-glow.svg';
import wooferRing from './assets/speaker-woofer-ring.svg';
import wooferRingGlow from './assets/speaker-woofer-ring-glow.svg';
import wooferCore from './assets/speaker-woofer-core.svg';
import wooferGlow from './assets/speaker-woofer-glow.svg';

// One speaker cabinet; children are placed relative to its top-left corner.
function Parlante({ left }: { left: number }) {
  return (
    <div className="ig-parlante" style={at(left, 333, 339, 514)} aria-hidden="true">
      <img src={tweeterRing} alt="" style={at(104, 66, 132, 132)} />
      <img src={tweeterRingGlow} alt="" style={at(104 - 9, 66 - 9, 150, 150)} />
      <img className="ig-parlante-cono" src={tweeterCore} alt="" style={at(139, 101, 62, 62)} />
      <img className="ig-parlante-cono" src={tweeterGlow} alt="" style={at(139 - 13.5, 101 - 13.5, 89, 89)} />
      <img src={wooferRing} alt="" style={at(68, 236, 204, 204)} />
      <img src={wooferRingGlow} alt="" style={at(68 - 9, 236 - 9, 222, 222)} />
      <img className="ig-parlante-cono grave" src={wooferCore} alt="" style={at(122, 290, 96, 96)} />
      <img className="ig-parlante-cono grave" src={wooferGlow} alt="" style={at(122 - 8.6, 290 - 8.6, 113, 113)} />
    </div>
  );
}

export function Inicio() {
  return (
    <Diapositiva alto={1080} seccion="inicio" className="ig-inicio">
      <OndaLogo left={880} top={192} />
      <TituloNeon left={0} top={267} width={1920} centrado size={128} capas={[12, 22, 30]}>
        BEATMIND
      </TituloNeon>
      <p className="ig-inicio-lema" style={at(603, 461)}>
        Cómo crear un beat usando <span className="verde">IA</span>
      </p>
      <Parlante left={142} />
      <Parlante left={1439} />
      <Imagen src={byteInicio} style={at(748, 524, 424, 339)} />
      <a className="ig-empezar" href={RUTA.carga} style={at(649, 863, 624, 78)}>
        EMPEZÁ A CREAR
      </a>
    </Diapositiva>
  );
}

// A short loading beat between the cover and the first slide; a click skips it.
export function Carga() {
  useEffect(() => {
    const timer = setTimeout(() => ir(RUTA.nucleo1(1)), 2400);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Diapositiva alto={1080} className="ig-carga">
      <button className="ig-carga-saltar" onClick={() => ir(RUTA.nucleo1(1))} aria-label="Empezar">
        <OndaLogo left={719} top={231} escala={2.98} />
        <TituloNeon left={0} top={466} width={1920} centrado size={256} capas={[12, 22, 30]} como="p">
          BEATMIND
        </TituloNeon>
      </button>
    </Diapositiva>
  );
}
