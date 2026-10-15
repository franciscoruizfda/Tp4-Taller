import { useEffect, useState } from 'react';
import { FIREBASE } from './firebase';
import { ARTISTAS } from './trivia';

// Totals of every finished trivia game. With a Firebase project configured they live in one
// Firestore document shared by every visitor (read and incremented through the REST API, polled
// every few seconds); without it they are kept in this browser only.
export type Estadisticas = {
  partidas: number;
  correctas: number;
  incorrectas: number;
  artistas: Record<string, { ok: number; mal: number }>;
};

const LOCAL_KEY = 'beatmind-trivia-v1';
const PENDIENTES_KEY = 'beatmind-trivia-pendientes-v1';
const INTERVALO = 4000;

export const COMPARTIDO = Boolean(FIREBASE.apiKey && FIREBASE.projectId);
const BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents`;
const DOC = `projects/${FIREBASE.projectId}/databases/(default)/documents/trivia/global`;

export function vacias(): Estadisticas {
  return {
    partidas: 0,
    correctas: 0,
    incorrectas: 0,
    artistas: Object.fromEntries(ARTISTAS.map((a) => [a.id, { ok: 0, mal: 0 }])),
  };
}

// Flat field names, so the Firestore rules can check each one: ok_lumi7, mal_lumi7, ...
function incrementos(aciertos: Record<string, boolean>): Record<string, number> {
  const ok = Object.values(aciertos).filter(Boolean).length;
  const campos: Record<string, number> = {
    partidas: 1,
    correctas: ok,
    incorrectas: Object.keys(aciertos).length - ok,
  };
  for (const [id, acerto] of Object.entries(aciertos)) campos[`${acerto ? 'ok' : 'mal'}_${id}`] = 1;
  return campos;
}

function desdeCampos(campos: Record<string, number>): Estadisticas {
  const datos = vacias();
  datos.partidas = campos.partidas ?? 0;
  datos.correctas = campos.correctas ?? 0;
  datos.incorrectas = campos.incorrectas ?? 0;
  for (const a of ARTISTAS) datos.artistas[a.id] = { ok: campos[`ok_${a.id}`] ?? 0, mal: campos[`mal_${a.id}`] ?? 0 };
  return datos;
}

function leerJson<T>(key: string, fallback: T): T {
  try {
    const texto = localStorage.getItem(key);
    return texto ? (JSON.parse(texto) as T) : fallback;
  } catch {
    return fallback;
  }
}

function guardarJson(key: string, valor: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(valor));
  } catch {
    /* Private mode or full storage: the game still works, the totals just don't persist. */
  }
}

/* ── Remote (Firestore REST) ─────────────────────────────────────────────── */

async function leerRemoto(): Promise<Estadisticas> {
  const respuesta = await fetch(`${BASE}/trivia/global?key=${FIREBASE.apiKey}`);
  if (respuesta.status === 404) return vacias();
  if (!respuesta.ok) throw new Error(`Firestore ${respuesta.status}`);
  const doc = (await respuesta.json()) as { fields?: Record<string, { integerValue?: string }> };
  const campos: Record<string, number> = {};
  for (const [nombre, valor] of Object.entries(doc.fields ?? {})) campos[nombre] = Number(valor.integerValue ?? 0);
  return desdeCampos(campos);
}

async function enviarRemoto(campos: Record<string, number>) {
  // An empty update mask plus increments creates the document the first time and never
  // overwrites what other visitors sent in the meantime.
  const respuesta = await fetch(`${BASE}:commit?key=${FIREBASE.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      writes: [
        {
          update: { name: DOC, fields: {} },
          updateMask: { fieldPaths: [] },
          updateTransforms: Object.entries(campos).map(([fieldPath, n]) => ({
            fieldPath,
            increment: { integerValue: String(n) },
          })),
        },
      ],
    }),
  });
  if (!respuesta.ok) throw new Error(`Firestore ${respuesta.status}`);
}

// Games finished while offline wait here and are sent on the next successful poll.
async function vaciarPendientes() {
  const pendientes = leerJson<Record<string, number>[]>(PENDIENTES_KEY, []);
  while (pendientes.length) {
    await enviarRemoto(pendientes[0]);
    pendientes.shift();
    guardarJson(PENDIENTES_KEY, pendientes);
  }
}

/* ── Public API ──────────────────────────────────────────────────────────── */

const oyentes = new Set<() => void>();
const avisar = () => oyentes.forEach((f) => f());

export async function registrarPartida(aciertos: Record<string, boolean>) {
  const campos = incrementos(aciertos);
  if (!COMPARTIDO) {
    const actual = leerJson<Record<string, number>>(LOCAL_KEY, {});
    for (const [k, n] of Object.entries(campos)) actual[k] = (actual[k] ?? 0) + n;
    guardarJson(LOCAL_KEY, actual);
    avisar();
    return;
  }
  try {
    await enviarRemoto(campos);
  } catch {
    guardarJson(PENDIENTES_KEY, [...leerJson<Record<string, number>[]>(PENDIENTES_KEY, []), campos]);
  }
  avisar();
}

export function useEstadisticas() {
  const [estado, setEstado] = useState<{ datos: Estadisticas; conectado: boolean }>(() => ({
    datos: COMPARTIDO ? vacias() : desdeCampos(leerJson(LOCAL_KEY, {})),
    conectado: !COMPARTIDO,
  }));

  useEffect(() => {
    let activo = true;
    const actualizar = async () => {
      if (!COMPARTIDO) {
        setEstado({ datos: desdeCampos(leerJson(LOCAL_KEY, {})), conectado: true });
        return;
      }
      try {
        await vaciarPendientes();
        const datos = await leerRemoto();
        if (activo) setEstado({ datos, conectado: true });
      } catch {
        if (activo) setEstado((e) => ({ ...e, conectado: false }));
      }
    };
    actualizar();
    oyentes.add(actualizar);
    const timer = COMPARTIDO ? window.setInterval(actualizar, INTERVALO) : undefined;
    const alGuardar = (e: StorageEvent) => e.key === LOCAL_KEY && actualizar();
    window.addEventListener('storage', alGuardar);
    return () => {
      activo = false;
      oyentes.delete(actualizar);
      window.clearInterval(timer);
      window.removeEventListener('storage', alGuardar);
    };
  }, []);

  return estado;
}
