import { useEffect, useLayoutEffect, useState } from 'react';
import { SelectorEstilo, useEstilo } from './SelectorEstilo';
import { Carga, Inicio } from './Portada';
import { Nucleo11, Nucleo12, Nucleo13, Nucleo14 } from './Nucleo1';
import { Nucleo21, Nucleo22, Nucleo23, Nucleo24 } from './Nucleo2';
import { Nucleo3 } from './Nucleo3';
import { useNucleo3Abierto } from '../nucleo3';
import { RUTA, type Ruta } from './rutas';
import './infografia.css';
import './estilo-app.css';

const ANCHO = 1920;

// The slides keep the Figma artboard (1920 px wide) and are scaled to the window width, so the
// composition looks the same on any screen; tall slides scroll vertically like in the prototype.
function useEscala() {
  const [escala, setEscala] = useState(() => window.innerWidth / ANCHO);
  useEffect(() => {
    const medir = () => setEscala(document.documentElement.clientWidth / ANCHO);
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);
  return escala;
}

function Pantalla({ ruta }: { ruta: Ruta }) {
  switch (ruta.vista) {
    case 'carga':
      return <Carga />;
    case 'nucleo1':
      return [<Nucleo11 />, <Nucleo12 />, <Nucleo13 />, <Nucleo14 />][ruta.paso - 1];
    case 'nucleo2':
      return [<Nucleo21 />, <Nucleo22 />, <Nucleo23 />, <Nucleo24 />][ruta.paso - 1];
    case 'nucleo3':
      return <Nucleo3Protegido />;
    default:
      return <Inicio />;
  }
}

// Opening #/nucleo-3 directly before downloading a beat lands on 2.4, where BeatMind starts.
function Nucleo3Protegido() {
  const abierto = useNucleo3Abierto();
  useEffect(() => {
    if (!abierto) window.location.replace(RUTA.nucleo2(4));
  }, [abierto]);
  return abierto ? <Nucleo3 /> : null;
}

export default function Infografia({ ruta }: { ruta: Ruta }) {
  const escala = useEscala();
  const [estilo, setEstilo] = useEstilo();
  const clave = ruta.vista + ('paso' in ruta ? ruta.paso : '');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [clave]);

  return (
    <div className={`ig estilo-${estilo}`}>
      <div className="ig-escenario" style={{ zoom: escala }}>
        <Pantalla key={clave} ruta={ruta} />
      </div>
      <SelectorEstilo estilo={estilo} onCambiar={setEstilo} />
    </div>
  );
}
