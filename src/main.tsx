import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/akshar/300.css';
import '@fontsource/akshar/400.css';
import '@fontsource/akshar/500.css';
import '@fontsource/akshar/600.css';
import '@fontsource/akshar/700.css';
import App from './App';
import Infografia from './infografia/Infografia';
import { useRuta } from './infografia/rutas';
import './styles.css';
import './theme/tokens.css';
import './theme/neon.css';
import { fitToScreen } from './fit';

// The site opens on the infographic; BeatMind is one of its stops, at #/beatmind.
function BeatMind() {
  useEffect(() => fitToScreen(), []);
  return <App />;
}

function Root() {
  const ruta = useRuta();
  return ruta.vista === 'beatmind' ? <BeatMind /> : <Infografia ruta={ruta} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
