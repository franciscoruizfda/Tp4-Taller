// «¡Adiviná quién!»: six artists, in the order of the Figma slides. The audio is Apple Music's
// official 30-second preview, streamed from Apple (nothing is stored in the repository).
export type Artista = {
  id: string;
  nombre: string;
  esIA: boolean;
  revelacion: string;
  tema: string;
  audio: string;
};

const PREVIEW = 'https://audio-ssl.itunes.apple.com/itunes-assets/';

export const ARTISTAS: Artista[] = [
  {
    id: 'lumi7',
    nombre: 'Lumi-7',
    esIA: true,
    revelacion: 'Es una artista generada por IA',
    tema: '¿Qué pretendés?',
    audio: `${PREVIEW}AudioPreview211/v4/42/3f/71/423f7105-3f25-7337-46b7-e06eddf02530/mzaf_11948063540757064526.plus.aac.p.m4a`,
  },
  {
    id: 'weeknd',
    nombre: 'The Weeknd',
    esIA: false,
    revelacion: 'Es un artista humano',
    tema: 'Call Out My Name',
    audio: `${PREVIEW}AudioPreview211/v4/d5/0a/ca/d50aca46-f871-b774-077a-22cbb42df336/mzaf_7520446500958405524.plus.aac.p.m4a`,
  },
  {
    id: 'breakingrust',
    nombre: 'Breaking Rust',
    esIA: true,
    revelacion: 'Es un artista generado por IA',
    tema: 'Walk My Walk',
    audio: `${PREVIEW}AudioPreview211/v4/f5/92/84/f592845c-bceb-c150-141c-8895fc5fb0bb/mzaf_4017772424206884976.plus.aac.p.m4a`,
  },
  {
    id: 'miloj',
    nombre: 'Milo J',
    esIA: false,
    revelacion: 'Es un artista humano',
    tema: 'Niño',
    audio: `${PREVIEW}AudioPreview221/v4/63/1e/88/631e88cd-6b86-013e-93e3-1ad143056254/mzaf_11296575312619476772.plus.aac.p.m4a`,
  },
  {
    id: 'joji',
    nombre: 'Joji',
    esIA: false,
    revelacion: 'Es un artista humano',
    tema: 'Glimpse of Us',
    audio: `${PREVIEW}AudioPreview221/v4/0c/53/c2/0c53c240-300a-5ddf-fc86-3a54e1b73a78/mzaf_13555682862214742934.plus.aac.p.m4a`,
  },
  {
    id: 'kodegonzalez',
    nombre: 'Kode González',
    esIA: true,
    revelacion: 'Es un artista generado por IA',
    tema: 'Desalójame el alma',
    audio: `${PREVIEW}AudioPreview221/v4/73/7c/dd/737cdd66-3b2c-ba3d-8d52-7fb5bb6f8db4/mzaf_17101640771951126227.plus.aac.p.m4a`,
  },
];
