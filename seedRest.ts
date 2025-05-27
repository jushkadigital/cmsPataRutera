// src/seeder.ts
import path from 'path';
import { readFile, access } from 'fs/promises';
import FormData from 'form-data';
import axios from 'axios';
import type { Media, TourCategory, Destination } from '@/payload-types'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload';

let TOKEN = '';
const BASE_URL = 'http://localhost:3000';
const assetsDir = path.resolve('./assets');

interface AssetBuffer {
  buffer: Buffer;
  filename: string;
}

interface User {
  email: string;
  password: string;
  roles: string[];
}

function getMimeType(filename: string): string | null {
  const extension = filename.split('.').pop()!.toLowerCase();

  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp',
    pdf: 'application/pdf',
    txt: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    zip: 'application/zip',
    rar: 'application/vnd.rar',
    tar: 'application/x-tar',
    xml: 'application/xml',
    ico: 'image/x-icon',
  };

  return mimeTypes[extension] || null;
}

async function uploadMedia(icon: { buffer: Buffer; filename: string }, token: string, alt: string) {
  const form = new FormData();

  form.append('file', icon.buffer, {
    filename: icon.filename,
    contentType: getMimeType(icon.filename)!,
    knownLength: icon.buffer.length,
  });

  form.append('_payload', JSON.stringify({ alt }));

  try {
    const response = await axios.post(`${BASE_URL}/api/media`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...form.getHeaders(),
      },
    });

    return response.data.doc;
  } catch (err: any) {
    console.error('Error al subir media:', err.response?.data || err.message);
    throw new Error('Falló la subida de media');
  }
}

const readAssetAsBuffer = async (filename: string): Promise<AssetBuffer> => {
  const filePath = path.join(assetsDir, filename);
  try {
    await access(filePath);
    const buffer = await readFile(filePath);
    return { buffer, filename };
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(`Asset file not found: ${filename}`);
    } else {
      throw new Error(`Failed to read asset file ${filename}: ${error.message}`);
    }
  }
};

async function loginAndGetToken(): Promise<void> {
  const url = `${BASE_URL}/api/users/login`;
  const payload = {
    email: 'urgosxd@gmail.com',
    password: '123',
  };

  try {
    const { data } = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (data.token) {
      TOKEN = data.token;
      console.log('Token obtenido:', TOKEN);
    } else {
      console.error('No se encontró el token en la respuesta del login.');
    }
  } catch (error: any) {
    console.error('Error al hacer login:', error.response?.data || error.message);
  }
}

async function createUsers(): Promise<void> {

  const users: User[] = [
    {
      email: 'dorregaray20@gmail.com',
      password: '12345',
      roles: ['admin'],
    },
    {
      email: 'perudestinoseguro@gmail.com',
      password: '12345',
      roles: ['admin'],
    },
  ];

  for (const user of users) {
    const url = `${BASE_URL}/api/users`;
    try {
      const { data } = await axios.post(url, user, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(`Usuario ${user.email} creado. Respuesta:`, data);
    } catch (error: any) {
      console.error(`Error al crear usuario ${user.email}:`, error.response?.data || error.message);
    }
  }
}



async function createTourCategories() {
  const categorias = [
    {
      name: 'Cultural',
    },
    {
      name: 'Gastronómico',
    },
  ]

  const gaga = []
  for (const category of categorias) {
    const url = `${BASE_URL}/api/tourCategory`;
    try {
      const { data } = await axios.post(url, category, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      gaga.push(data.doc)
    } catch (error: any) {
      console.error(`Error al crear :`, error.response?.data || error.message);
    }
  }

  return gaga
}

type TourArgs = {
  slug: string
  title: string
  price: number
  Images: Media[]
  Categories: TourCategory[]
  Destinos: Destination
}
const Tour = ({
  slug,
  title,
  price,
  Images,
  Categories,
  Destinos
}: TourArgs): RequiredDataFromCollectionSlug<'tours'> => {
  return {
    slug,
    title,
    _status: 'published',
    heroTour: [
      {
        blockType: 'tourHerocar',
        carContent: {
          carImages: [
            {
              image: Images[0]!.id,
            },
            {
              image: Images[1]!.id,
            },

          ],
        },
        ImageContent: {
          image: Images[2]!.id,
        },
      }
    ],
    layout: [
      {
        blockType: 'descrPrice',
        blockTitle: {
          titleText: "Dia completo",
          tag: "h2",
          size: "medium",
          textColor: "#2970B7",
          underlineColor: "#EFBA06"
        },
        leftColumn: {
          tourTitle: "Características Tour Valle Sagrado - Día Completo",
          tourDescription: {
            root: {
              type: "root",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Hemos creado un itinerario único para el Tour Valle Sagrado – Día Completo para que puedas conocer en pocas horas este maravilloso Valle y los lugares más icónicos de la zona. ",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  textStyle: "",
                  textFormat: 0
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [],
                  direction: null,
                  textStyle: "",
                  textFormat: 0
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Ubicación del Tour: El Valle Sagrado de los Incas está comprendido entre las poblaciones de Pisac y Ollantaytambo, paralelo al río Vilcanota y se puede acceder a él desde la ciudad del Cusco",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  textStyle: "",
                  textFormat: 0
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Tipo de tour: Tour de día completo",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  textStyle: "",
                  textFormat: 0
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [],
                  direction: null,
                  textStyle: "",
                  textFormat: 0
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Hora de inicio / finalización: El recojo es a las 8:00 am desde el lobby de su hotel y el retorno será alrededor de las 6 pm ",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  textStyle: "",
                  textFormat: 0
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Consideración: Recuerde usar zapatos cómodos, caminará mucho.",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  textStyle: "",
                  textFormat: 0
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "Puntos destacados: Mercado de Pisaq, Complejo arqueológico de Pisaq y la fortaleza de Ollantaytambo.",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  textStyle: "",
                  textFormat: 0
                },
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "¡No pierdas tiempo y realiza el Tour Valle Sagrado – Día Completo! ¡Te estamos esperando!",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  textStyle: "",
                  textFormat: 0
                }
              ],
              direction: "ltr"
            }
          }
        },
        rightColumn: {
          priceTitle: "Precio",
          prevText: "Precio desde",
          price: price,
          nextText: "por persona",
          paymentForm: {
            iconDate: Images[4]?.id
            ,
            InputPlaceHolderDate: "Fecha",
            iconPassengers: Images[5]?.id
            ,
            InputPlaceHolderPassengers: "Pasajeros"
          }
        }
      },
      {
        blockType: 'guiaTour',
        blockTitle: {
          titleText: "Guia Rutera",
          tag: "h2",
          size: "medium",
          textColor: "#2970B7",
          underlineColor: "#EFBA06"

        },
        sectionItinerario: {
          iconText: "Itinerario",
          iconImage: Images[6]!.id,
          contentSection: {
            root: {
              type: "root",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  tag: "ul",
                  type: "list",
                  start: 1,
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: "custom-list-item",
                      value: 1,
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Día 1: Cusco – Piskacucho Km 82 – Llactapata- Ayapata",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Lo primero que haremos dentro el servicio Camino del Inca Tour Grupal 4D/3N será recogerte directamente en el hotel en Cusco, Urubamba u Ollantaytambo. En el caso de Cusco, te buscamos a las 4:30 AM, desde Urubamba a las 5:30 AM, y si te hospedas en Ollantaytambo, podrás descansar un poco más, ya que pasaremos por ti a las 6:30 AM.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Luego conduciremos al Km 82, pasaremos por el primer punto de control del Camino Inca para comenzar nuestra caminata. Por favor, asegúrate de tener tu pasaporte original ya que lo necesitarás para poder entrar en el Camino Inca.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        }
                      ],
                      iconType: "check",
                      direction: "ltr"
                    },
                    {
                      type: "custom-list-item",
                      value: 2,
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Día 2: Paso de la mujer muerta (Warmiwañuska) – Paso de Runccuracay – Chaquiccocha",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "El inicio del día será muy temprano, ya que el recorrido es más largo. Caminaremos durante aproximadamente 4 horas hasta el paso más alto de la caminata, el Paso de la Mujer Muerta (4215 metros/13829 pies). Al llegar al paso, tendremos un breve descanso para disfrutar de las vistas, para luego partir de nuevo y descender al siguiente valle, el Valle de Pacaymayu – Río Oculto. Es otra hora y media por el lado del valle hasta nuestro lugar para almorzar, donde tendrás la oportunidad de recargar tus botellas de agua.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Luego del almuerzo, comenzamos a ascender de nuevo al segundo paso de la caminata. Son 2 horas sobre el paso donde nos detendremos en un pequeño sitio inca llamado Runcu Raccay y veremos dos enormes cascadas por el lado opuesto del valle.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        }
                      ],
                      iconType: "check",
                      direction: "ltr"
                    }
                  ],
                  listType: "bullet",
                  direction: "ltr"
                }
              ],
              direction: "ltr"
            }
          }
        },
        sectionIncluyeNoIncluye: {
          iconText: "Incluye/No Incluye",
          iconImage: Images[7]!.id,
          contentSection: {
            root: {
              type: "root",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  tag: "ul",
                  type: "list",
                  start: 1,
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: "custom-list-item",
                      value: 1,
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Día 1: Cusco – Piskacucho Km 82 – Llactapata- Ayapata",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Lo primero que haremos dentro el servicio Camino del Inca Tour Grupal 4D/3N será recogerte directamente en el hotel en Cusco, Urubamba u Ollantaytambo. En el caso de Cusco, te buscamos a las 4:30 AM, desde Urubamba a las 5:30 AM, y si te hospedas en Ollantaytambo, podrás descansar un poco más, ya que pasaremos por ti a las 6:30 AM.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Luego conduciremos al Km 82, pasaremos por el primer punto de control del Camino Inca para comenzar nuestra caminata. Por favor, asegúrate de tener tu pasaporte original ya que lo necesitarás para poder entrar en el Camino Inca.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        }
                      ],
                      iconType: "check",
                      direction: "ltr"
                    },
                    {
                      type: "custom-list-item",
                      value: 2,
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Día 2: Paso de la mujer muerta (Warmiwañuska) – Paso de Runccuracay – Chaquiccocha",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "El inicio del día será muy temprano, ya que el recorrido es más largo. Caminaremos durante aproximadamente 4 horas hasta el paso más alto de la caminata, el Paso de la Mujer Muerta (4215 metros/13829 pies). Al llegar al paso, tendremos un breve descanso para disfrutar de las vistas, para luego partir de nuevo y descender al siguiente valle, el Valle de Pacaymayu – Río Oculto. Es otra hora y media por el lado del valle hasta nuestro lugar para almorzar, donde tendrás la oportunidad de recargar tus botellas de agua.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Luego del almuerzo, comenzamos a ascender de nuevo al segundo paso de la caminata. Son 2 horas sobre el paso donde nos detendremos en un pequeño sitio inca llamado Runcu Raccay y veremos dos enormes cascadas por el lado opuesto del valle.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        }
                      ],
                      iconType: "check",
                      direction: "ltr"
                    }
                  ],
                  listType: "bullet",
                  direction: "ltr"
                }
              ],
              direction: "ltr"
            }
          }
        },
        sectionPrecios: {
          iconText: "Precios",
          iconImage: Images[8]!.id,
          contentSection: {
            root: {
              type: "root",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  tag: "ul",
                  type: "list",
                  start: 1,
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: "custom-list-item",
                      value: 1,
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Día 1: Cusco – Piskacucho Km 82 – Llactapata- Ayapata",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Lo primero que haremos dentro el servicio Camino del Inca Tour Grupal 4D/3N será recogerte directamente en el hotel en Cusco, Urubamba u Ollantaytambo. En el caso de Cusco, te buscamos a las 4:30 AM, desde Urubamba a las 5:30 AM, y si te hospedas en Ollantaytambo, podrás descansar un poco más, ya que pasaremos por ti a las 6:30 AM.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Luego conduciremos al Km 82, pasaremos por el primer punto de control del Camino Inca para comenzar nuestra caminata. Por favor, asegúrate de tener tu pasaporte original ya que lo necesitarás para poder entrar en el Camino Inca.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        }
                      ],
                      iconType: "check",
                      direction: "ltr"
                    },
                    {
                      type: "custom-list-item",
                      value: 2,
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Día 2: Paso de la mujer muerta (Warmiwañuska) – Paso de Runccuracay – Chaquiccocha",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "El inicio del día será muy temprano, ya que el recorrido es más largo. Caminaremos durante aproximadamente 4 horas hasta el paso más alto de la caminata, el Paso de la Mujer Muerta (4215 metros/13829 pies). Al llegar al paso, tendremos un breve descanso para disfrutar de las vistas, para luego partir de nuevo y descender al siguiente valle, el Valle de Pacaymayu – Río Oculto. Es otra hora y media por el lado del valle hasta nuestro lugar para almorzar, donde tendrás la oportunidad de recargar tus botellas de agua.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Luego del almuerzo, comenzamos a ascender de nuevo al segundo paso de la caminata. Son 2 horas sobre el paso donde nos detendremos en un pequeño sitio inca llamado Runcu Raccay y veremos dos enormes cascadas por el lado opuesto del valle.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        }
                      ],
                      iconType: "check",
                      direction: "ltr"
                    }
                  ],
                  listType: "bullet",
                  direction: "ltr"
                }
              ],
              direction: "ltr"
            }
          }
        },
        sectionInfoViaje: {
          iconText: "Información del viaje",
          iconImage: Images[9]!.id,
          contentSection: {
            root: {
              type: "root",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  tag: "ul",
                  type: "list",
                  start: 1,
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: "custom-list-item",
                      value: 1,
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Día 1: Cusco – Piskacucho Km 82 – Llactapata- Ayapata",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Lo primero que haremos dentro el servicio Camino del Inca Tour Grupal 4D/3N será recogerte directamente en el hotel en Cusco, Urubamba u Ollantaytambo. En el caso de Cusco, te buscamos a las 4:30 AM, desde Urubamba a las 5:30 AM, y si te hospedas en Ollantaytambo, podrás descansar un poco más, ya que pasaremos por ti a las 6:30 AM.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Luego conduciremos al Km 82, pasaremos por el primer punto de control del Camino Inca para comenzar nuestra caminata. Por favor, asegúrate de tener tu pasaporte original ya que lo necesitarás para poder entrar en el Camino Inca.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        }
                      ],
                      iconType: "check",
                      direction: "ltr"
                    },
                    {
                      type: "custom-list-item",
                      value: 2,
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Día 2: Paso de la mujer muerta (Warmiwañuska) – Paso de Runccuracay – Chaquiccocha",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "El inicio del día será muy temprano, ya que el recorrido es más largo. Caminaremos durante aproximadamente 4 horas hasta el paso más alto de la caminata, el Paso de la Mujer Muerta (4215 metros/13829 pies). Al llegar al paso, tendremos un breve descanso para disfrutar de las vistas, para luego partir de nuevo y descender al siguiente valle, el Valle de Pacaymayu – Río Oculto. Es otra hora y media por el lado del valle hasta nuestro lugar para almorzar, donde tendrás la oportunidad de recargar tus botellas de agua.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          type: "linebreak",
                          version: 1
                        },
                        {
                          mode: "normal",
                          text: "Luego del almuerzo, comenzamos a ascender de nuevo al segundo paso de la caminata. Son 2 horas sobre el paso donde nos detendremos en un pequeño sitio inca llamado Runcu Raccay y veremos dos enormes cascadas por el lado opuesto del valle.",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1
                        }
                      ],
                      iconType: "check",
                      direction: "ltr"
                    }
                  ],
                  listType: "bullet",
                  direction: "ltr"
                }
              ],
              direction: "ltr"
            }
          }
        }
      }
    ],
    featuredImage: Images[10]!.id,
    miniDescription: {

      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1
              }
            ],
            direction: "ltr",
            textStyle: "",
            textFormat: 0
          }
        ],
        direction: "ltr"
      }
    },
    Desde: "Desde",
    price: price,
    "Person desc": "por persona",
    iconMaxPassengers: Images[11]?.id,
    maxPassengers: 10,
    iconDifficulty: Images[12]?.id,
    difficulty: "medium",
    categorias: Categories,
    destinos: Destinos,
    publishedAt: new Date().toISOString(),
  }
}
async function createMedia(names: string[]) {
  const buffers = await Promise.all(names.map((ele) => readAssetAsBuffer(ele)));


  const mana = buffers.map((ele) => (uploadMedia(ele, TOKEN, 'icon')))
  const res = await Promise.all(mana)
  console.log('Archivos cargados exitosamente.');
  return res
}
async function createDestinationSingular(name: string, images: any[]) {

  const url = `${BASE_URL}/api/destinations`;
  try {
    const { data } = await axios.post(url, {
      name: name,
      imageDestination: images[0],
      backgroundDestination: images[1],
      carouselItemDestination: images[2],
    }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return data.doc
  } catch (error: any) {
    console.error(`Error al crear :`, error.response?.data || error.message);
  }

}

async function main() {
  await loginAndGetToken();
  await createUsers();
  const imagesIconosSvg = await createMedia(['iconDifficulty.svg', 'iconMaxPassengers.svg', 'iconDate.svg',
    'iconPassengers.svg', 'iconItinerario.svg', 'iconIncluyeNoIncluye.svg', 'iconPrecios.svg', 'iconInfo.svg']);
  const toursCategorias = await createTourCategories()
  const [iconCusco, backgroundCusco, carouselCusco] = await createMedia(['cuscoFeature.png', 'cuscoBackground.png', 'cuscoCarouselItem.png'])
  const [iconIca, backgroundIca, carouselIca] = await createMedia(['icaFeature.png', 'icaBackground.png', 'icaCarouselItem.png'])
  const [iconPmaldonado, backgroundPmaldonado, carouselPmaldonado] = await createMedia(['pmaldonadoFeature.png', 'icaBackground.png', 'pmaldonadoCarouselItem.png'])

  const cuscoDestino = await createDestinationSingular('Cusco', [iconCusco, backgroundCusco, carouselCusco])
  const icaDestinoDestino = await createDestinationSingular('Ica', [iconIca, backgroundIca, carouselIca])
  const pmaldonadoDestino = await createDestinationSingular('Puerto Maldonado', [iconPmaldonado, backgroundPmaldonado, carouselPmaldonado])

  const imagenesLogos = await createMedia(['travelerLogo.svg', 'traveler2Logo.svg', 'isoLogo.svg', 'iso2Logo.svg',
    'traveler3Logo.svg', 'pdsLogo.svg', 'peruDLogo.svg', 'jushkaLogo.png', 'agoLogo.png', 'atipajLogo.svg'])

  console.log('\nProceso de siembra completado.');

  const tours =
    [
      Tour({ slug: 'tour-valle-sagrado', title: 'Tour Valle Sagrado', price: 150, Images: [iconCusco, iconIca, iconPmaldonado, backgroundIca, ...imagesIconosSvg.slice(2), iconCusco, ...imagesIconosSvg.slice(0, 2)], Categories: [...toursCategorias], Destinos: cuscoDestino }),
      Tour({ slug: 'oasis-huacachina', title: 'Oasis Huacachina', price: 150, Images: [iconCusco, iconIca, iconPmaldonado, backgroundIca, ...imagesIconosSvg.slice(2), iconCusco, ...imagesIconosSvg.slice(0, 2)], Categories: [...toursCategorias], Destinos: cuscoDestino }),
      Tour({ slug: 'lago-sandoval', title: 'Lago Sandoval', price: 150, Images: [iconCusco, iconIca, iconPmaldonado, backgroundIca, ...imagesIconosSvg.slice(2), iconCusco, ...imagesIconosSvg.slice(0, 2)], Categories: [...toursCategorias], Destinos: cuscoDestino }),
      Tour({ slug: 'ccaccaccollo', title: 'Ccaccaccollo', price: 150, Images: [iconCusco, iconIca, iconPmaldonado, backgroundIca, ...imagesIconosSvg.slice(2), iconCusco, ...imagesIconosSvg.slice(0, 2)], Categories: [...toursCategorias], Destinos: cuscoDestino }),
      Tour({ slug: 'laguna-humantay', title: 'Laguna Humantay', price: 150, Images: [iconCusco, iconIca, iconPmaldonado, backgroundIca, ...imagesIconosSvg.slice(2), iconCusco, ...imagesIconosSvg.slice(0, 2)], Categories: [...toursCategorias], Destinos: cuscoDestino }),
      Tour({ slug: 'city-tour-ica', title: 'City Tour Ica', price: 150, Images: [iconCusco, iconIca, iconPmaldonado, backgroundIca, ...imagesIconosSvg.slice(2), iconCusco, ...imagesIconosSvg.slice(0, 2)], Categories: [...toursCategorias], Destinos: cuscoDestino }),
    ]

  for (const tour of tours) {
    const urlTour = `${BASE_URL}/api/tours`;
    try {
      const { data } = await axios.post(urlTour, tour, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(`Tour toru creada`, data);
    } catch (error: any) {
      console.error(`Error al crear :`, error.response?.data || error.message);
    }
  }

  const urlPage = `${BASE_URL}/api/pages`;

  try {
    const { data } = await axios.post(urlPage,
      {
        title: "destinos",
        layout: [


          {
            overrideDefaults: true,
            gridColumns: null,
            blockType: "gridTours",
            blockTitle: {
              titleText: "Tours",
              tag: "h2",
              size: "medium",
              textColor: "#2970B7",
              underlineColor: "#EFBA06"
            },
            category: [],
            gridStyle: true,
            destination: null

          }
        ],
        publishedAt: new Date().toISOString(),
        slug: "destinos",
        slugLock: true,
        _status: "published",
        heroPageBlocks: [
          {
            overrideDefaults: true,
            title: null,
            image: null,
            blockName: null,
            blockType: "banner"
          }
        ]
      }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(`Tour toru creada`, data);
  } catch (error: any) {
    console.error(`Error al crear :`, error.response?.data || error.message);
  }


  console.log('Pages seeding')

  try {
    const { data } = await axios.post(urlPage, {
      title: "home",
      heroPageBlocks: [

        {
          blockName: null,
          blockType: "carouselHeroPage"
        }

      ],
      layout: [
        {
          overrideDefaults: false,
          gridColumns: 6,
          gridStyle: true,
          destination: null,
          blockName: null,
          blockType: "gridTours",
          blockTitle: {
            titleText: "Tours",
            tag: "h2",
            size: "medium",
            textColor: "#2970B7",
            underlineColor: "#EFBA06"
          },
          category: []
        },
        {
          blockName: null,
          blockType: "carouselDestination",
          title: {
            titleText: "Destinos",
            tag: "h2",
            size: "medium",
            textColor: "#FFFFFF",
            underlineColor: "#EFBA06"
          }
        }
        , {
          blockName: null,

          videoLinks: [

            {
              url: "https://www.tiktok.com/@pdsviajes/video/7463977023497719046?is_from_webapp=1&sender_device=pc&web_id=7507389016896636421"
            },

            {
              url: "https://www.tiktok.com/@pdsviajes/video/7463977023497719046?is_from_webapp=1&sender_device=pc&web_id=7507389016896636421"
            },

            {
              url: "https://www.tiktok.com/@pdsviajes/video/7505161504463801655?is_from_webapp=1&sender_device=pc&web_id=7507389016896636421"
            }
          ],
          blockType: "tikTokLinks",
          blockTitle: {
            titleText: "Curiosidades",
            tag: "h2",
            size: "medium",
            textColor: "#2970B7",
            underlineColor: "#EFBA06"
          }

        },
        {
          description:
          {
            root: {
              type: "root",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  type: "paragraph",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: "normal",
                      text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  textStyle: "",
                  textFormat: 0
                }
              ],
              direction: "ltr"
            }
          },
          descriptionAlignment: "center",
          blockName: null,
          blockType: "textContent",

          blockTitle: {
            titleText: "What is Lorem Ipsum?",
            tag: "h2",
            size: "medium",
            textColor: "#2970B7",
            underlineColor: "#EFBA06"
          }
        },
        {
          colorItem: "#EFBA06",
          blockName: null,

          beneficios: [

            {
              beneficioText: "Soporte 24/7",
              beneficioImage: imagenesLogos[0]
            },

            {
              beneficioText: "Destinos únicos",
              beneficioImage: imagenesLogos[0]
            },

            {
              beneficioText: "Atención personalizada",
              beneficioImage: imagenesLogos[0]
            },

            {
              beneficioText: "Guías capacitados",
              beneficioImage: imagenesLogos[0]
            },

            {
              beneficioText: "Experiencias 100% seguras",
              beneficioImage: imagenesLogos[0]
            },

            {
              beneficioText: "Transportes cómodos y puntuales ",
              beneficioImage: imagenesLogos[0]
            }
          ],
          blockType: "beneficios",

          blockTitle: {
            titleText: "Por que viajar con Pata Rutera",
            tag: "h2",
            size: "medium",
            textColor: "#2970B7",
            underlineColor: "#EFBA06"
          }
        },
        {
          blockName: null,
          columns: [
            {
              columnWidth: "50",
              columnBlocks: [
                {
                  typeGrid: "overlapping",
                  blockName: null,
                  Image: [
                    {
                      image: iconCusco

                    },
                    {
                      image: iconIca

                    },
                    {
                      image: iconPmaldonado
                    }
                  ],
                  blockType: "gridImages"
                },

              ]
            },
            {
              columnWidth: "50",
              columnBlocks: [
                {
                  blockName: null,
                  blockType: "estadisticas",
                  estadisticasText: {
                    title: "PATA RUTERA",
                    description: {

                      root: {
                        type: "root",
                        format: "",
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: "paragraph",
                            format: "",
                            indent: 0,
                            version: 1,
                            children: [
                              {
                                mode: "normal",
                                text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
                                type: "text",
                                style: "",
                                detail: 0,
                                format: 0,
                                version: 1
                              }
                            ],
                            direction: "ltr",
                            textStyle: "",
                            textFormat: 0
                          }
                        ],
                        direction: "ltr"
                      }
                    },
                    colorBox: "#2970B7",
                    estadisticasBox: [
                      {
                        numbers: "5",
                        description: "Años de experiencia"
                      },
                      {
                        numbers: "500+",
                        description: "Tours en Perú"
                      },
                      {
                        numbers: "4000",
                        description: "Experiencias vividas"
                      }
                    ]
                  }
                }
              ]
            }

          ]
          ,
          blockType: "rowBlock"
        },
        {
          blockName: null,
          reconocimientos: [
            {
              image: imagenesLogos[0]
            },
            {
              image: imagenesLogos[1]
            },
            {
              image: imagenesLogos[2]
            }
            , {
              image: imagenesLogos[4]
            }
            ,
            {
              image: imagenesLogos[3]
            },
            {
              image: imagenesLogos[1]
            },
            {
              image: imagenesLogos[0]
            }
          ],
          blockType: "reconocimientos",
          blockTitle: {
            titleText: "aoeu",
            tag: "h2",
            size: "medium",
            textColor: "#2970B7",
            underlineColor: "#EFBA06"
          }
        }
        ,

        {
          blockName: null,
          socios: [
            {
              image: imagenesLogos[9]
            },
            {
              image: imagenesLogos[5]
            },
            {
              image: imagenesLogos[6]
            },
            {
              image: imagenesLogos[7]
            },
            {
              image: imagenesLogos[8]
            },
          ],
          blockType: "socios",
          blockTitle: {
            titleText: "oeu",
            tag: "h2",
            size: "medium",
            textColor: "#2970B7",
            underlineColor: "#EFBA06"
          }
        }
      ],
      publishedAt: new Date().toISOString(),
      slug: "home",
      slugLock: true,
      _status: "published",
    }
      , {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
    console.log(`Tour toru creada`, data);
  } catch (error: any) {
    console.error(`Error al crear :`, error.response?.data || error.message);
  }


}

main();
