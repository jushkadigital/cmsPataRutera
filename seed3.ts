
import path, { dirname } from 'path';
import { access, readFile } from 'fs/promises'; // Import promise-based functions
import { getPayload } from 'payload';
import config from '@payload-config';
import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, TourCategory, Destination } from '@/payload-types'

type HomeArgs = {
    Images: Media[]
    Categories: TourCategory[]
    Destinos: Destination[]
}

// Assuming 'assets' is relative to the Current Working Directory (CWD)
const assetsDir = path.resolve('assets'); // Resolve assets dir relative to CWD

/**
 * Asynchronously reads an asset file into a Buffer.
 * Throws an error if the file doesn't exist or cannot be accessed.
 * @param filename - The name of the file within the assets directory.
 * @returns A Promise resolving to a Buffer containing the file data.
 */
const readAssetAsBuffer = async (filename: string): Promise<{ buffer: Buffer, filename: string }> => {
    const filePath = path.join(assetsDir, filename);
    console.log(`[readAssetAsBuffer] Attempting to access asset at: ${filePath}`);

    try {
        // Check if file exists and is accessible (async)
        await access(filePath); // Throws error if fails

        console.log(`[readAssetAsBuffer] Reading asset into buffer from: ${filePath}`);
        // Read file asynchronously
        const buffer = await readFile(filePath);
        return { buffer, filename };

    } catch (error: any) {
        // Log specific error details
        if (error.code === 'ENOENT') {
            console.error(`[readAssetAsBuffer] Asset file not found at path: ${filePath}`);
            console.error(`[readAssetAsBuffer] Assets directory resolved relative to CWD: ${assetsDir}`);
            throw new Error(`Asset file not found: ${filename}`);
        } else {
            console.error(`[readAssetAsBuffer] Error accessing or reading file ${filePath}:`, error);
            throw new Error(`Failed to read asset file ${filename}: ${error.message}`);
        }
    }
};




export const seed = async () => {
    const payload = await getPayload({ config })
    payload.logger.info(`— Seeding Test...`)



    payload.logger.info(`— Seeding Tours...`)

    const home = ({
        Images,
        Categories,
        Destinos
    }: HomeArgs) => {
        return {

            slug: 'tour-valle-sagrado',
            _status: 'published',
            title: 'Tour Valle Sagrado',
            hero: {
                imageCarousel: {
                    slides: [
                        {
                            image: Images[0]?.id
                        },
                        {
                            image: Images[1]?.id
                        },
                        {
                            image: Images[2]?.id
                        }
                    ],
                    itemsDesktop: 3,
                    itemsMobile: 1,
                    extraOptions: null
                },
                mediaTour: Images[3]?.id,
            },
            layout: [
                {
                    blockType: 'descPrice',
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
                        price: 150,
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
                        iconImage: Images[6]?.id,
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
                        iconImage: Images[7]?.id,
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
                        iconImage: Images[8]?.id,
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
                        iconImage: Images[9]?.id,
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
            featuredImage: Images[10]?.id,
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
            desde: "Desde",
            featureTitle: "Tour valle Sagrado",
            personDesc: "por persona",
            iconMaxPassengers: Images[11]?.id,
            maxPassengers: 10,
            iconDifficulty: Images[12]?.id,
            difficulty: "medium",
            categorias: [...Categories],
            destinos: [...Destinos],
        }
    }
}

await seed()