import path, { dirname } from 'path';
import { access, readFile } from 'fs/promises'; // Import promise-based functions
import { getPayload, RequiredDataFromCollectionSlug } from 'payload';
import config from '@payload-config';
import type { Media, TourCategory, Destination } from '@/payload-types'
// Assuming 'assets' is relative to the Current Working Directory (CWD)
//const assetsDir = path.resolve('assets'); // Resolve assets dir relative to CWD

/**
 * Asynchronously reads an asset file into a Buffer.
 * Throws an error if the file doesn't exist or cannot be accessed.
 * @param filename - The name of the file within the assets directory.
 * @returns A Promise resolving to a Buffer containing the file data.
 */
const readAssetAsBuffer = async (filename: string): Promise<{ buffer: Buffer, filename: string }> => {
    //const filePath = path.join(assetsDir, filename);
    const filePath = path.resolve('/app/assets',filename);
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
    const payload = await getPayload({ config });
    await payload.logger.info('Seeding data...');
    payload.logger.info(`— Creating admin user...`)
    // Create admin user
    const admin = await payload.create({
        collection: 'users',
        data: {
            email: 'urgosxd@gmail.com',
            password: '123',
            roles: ['admin'],
        },
    })
    payload.logger.info(`— Admin user created...`)

    // --- Example Reading Buffers (Async) ---
    payload.logger.info(`— Reading asset buffers (async)...`);
    // Use await when calling the async function


    const [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8] = await Promise.all([
        readAssetAsBuffer('iconDifficulty.svg'),
        readAssetAsBuffer('iconMaxPassengers.svg'),
        readAssetAsBuffer('iconDate.svg'),
        readAssetAsBuffer('iconPassengers.svg'),
        readAssetAsBuffer('iconItinerario.svg'),
        readAssetAsBuffer('iconIncluyeNoIncluye.svg'),
        readAssetAsBuffer('iconPrecios.svg'),
        readAssetAsBuffer('iconInfo.svg')
    ])

    const [icon1Doc, icon2Doc, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc] = await Promise.all([
        payload.create(
            {
                collection: 'media',
                data: {
                    alt: 'Medidor de ejemplo',

                }
                ,
                file: {
                    data: icon1.buffer,
                    mimetype: 'image/svg+xml',
                    name: icon1.filename,
                    size: icon1.buffer.length,
                }
            }
        ),
        payload.create(
            {
                collection: 'media',
                data: {
                    alt: 'Icono máximo pasajeros',
                },
                file: {
                    data: icon2.buffer,
                    mimetype: 'image/svg+xml',
                    name: icon2.filename,
                    size: icon2.buffer.length,
                }
            }
        ),
        payload.create(
            {
                collection: 'media',
                data: {
                    alt: 'Icono fecha',
                },
                file: {
                    data: icon3.buffer,
                    mimetype: 'image/svg+xml',
                    name: icon3.filename,
                    size: icon3.buffer.length,
                }
            }
        ),
        payload.create(
            {
                collection: 'media',
                data: {
                    alt: 'Icono Passengers',
                },
                file: {
                    data: icon4.buffer,
                    mimetype: 'image/svg+xml',
                    name: icon4.filename,
                    size: icon4.buffer.length,
                }
            }
        ),
        payload.create(
            {
                collection: 'media',
                data: {
                    alt: 'Icono Itinerario',
                },
                file: {
                    data: icon5.buffer,
                    mimetype: 'image/png',
                    name: icon5.filename,
                    size: icon5.buffer.length,
                }
            }
        ),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Icono Incluye/No Incluye',
            },
            file: {
                data: icon6.buffer,
                mimetype: 'image/svg+xml',
                name: icon6.filename,
                size: icon6.buffer.length,
            }
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Icono Precios',
            },
            file: {
                data: icon7.buffer,
                mimetype: 'image/svg+xml',
                name: icon7.filename,
                size: icon7.buffer.length,
            }
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Icono Info',
            },
            file: {
                data: icon8.buffer,
                mimetype: 'image/svg+xml',
                name: icon8.filename,
                size: icon8.buffer.length,
            }
        })
    ])


    // Seed Categories
    payload.logger.info(`— Seeding Categories...`)
    const categories = await Promise.all(
        [
            payload.create({
                collection: 'tourCategory',
                data: {
                    name: 'Cultural',
                },
            }),
            payload.create({
                collection: 'tourCategory',
                data: {
                    name: 'Gastronómico',
                },
            }),

        ]
    )

    payload.logger.info(`— Categories seeded...`)



    payload.logger.info(`— Seeding Destinations...`)

    const [iconCusco, backgroundCusco, carouselCusco] = await Promise.all([
        readAssetAsBuffer('cuscoFeature.png'),
        readAssetAsBuffer('cuscoBackground.png'),
        readAssetAsBuffer('cuscoCarouselItem.png'),
    ])


    const [cuscoMedia, cuscoBackgroundMedia, cuscoCarouselMedia] = await Promise.all([
        payload.create({
            collection: 'media',
            data: {
                alt: 'Cusco',
            },
            file: {
                data: iconCusco.buffer,
                mimetype: 'image/png',
                name: iconCusco.filename,
                size: iconCusco.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Fondo Cusco',
            },
            file: {
                data: backgroundCusco.buffer,
                mimetype: 'image/png',
                name: backgroundCusco.filename,
                size: backgroundCusco.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Carousel Cusco',
            },
            file: {
                data: carouselCusco.buffer,
                mimetype: 'image/png',
                name: carouselCusco.filename,
                size: carouselCusco.buffer.length,
            },
        }),
    ])
    const cuscoDoc = await Promise.all([
        payload.create({
            collection: 'destinations',
            data: {
                name: 'Cusco',
                imageDestination: cuscoMedia,
                backgroundDestination: cuscoBackgroundMedia,
                carouselItemDestination: cuscoCarouselMedia,
            },
        }),
    ])
    const [iconIca, backgroundIca, carouselIca] = await Promise.all([
        readAssetAsBuffer('icaFeature.png'),
        readAssetAsBuffer('icaBackground.png'),
        readAssetAsBuffer('icaCarouselItem.png'),
    ])
    const [icaMedia, icaBackgroundMedia, icaCarouselMedia] = await Promise.all([
        payload.create({
            collection: 'media',
            data: {
                alt: 'Ica',
            },
            file: {
                data: iconIca.buffer,
                mimetype: 'image/png',
                name: iconIca.filename,
                size: iconIca.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Fondo Ica',
            },
            file: {
                data: backgroundIca.buffer,
                mimetype: 'image/png',
                name: backgroundIca.filename,
                size: backgroundIca.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Carousel Ica',
            },
            file: {
                data: carouselIca.buffer,
                mimetype: 'image/png',
                name: carouselIca.filename,
                size: carouselIca.buffer.length,
            },
        }),
    ])

    const icaDoc = await Promise.all([
        payload.create({
            collection: 'destinations',
            data: {
                name: 'Ica',
                imageDestination: icaMedia,
                backgroundDestination: icaBackgroundMedia,
                carouselItemDestination: icaCarouselMedia,
            },
        }),
    ])

    const [iconPmaldonado] = await Promise.all([
        readAssetAsBuffer('pmaldonadoFeature.png'),
    ])
    const [pmaldonadoMedia, pmaldonadoBackgroundMedia, pmaldonadoCarouselMedia] = await Promise.all([
        payload.create({
            collection: 'media',
            data: {
                alt: 'P Maldonado',
            },
            file: {
                data: iconPmaldonado.buffer,
                mimetype: 'image/png',
                name: iconPmaldonado.filename,
                size: iconPmaldonado.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Fondo Punta Maldonado',
            },
            file: {
                data: backgroundIca.buffer,
                mimetype: 'image/png',
                name: backgroundIca.filename,
                size: backgroundIca.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Carousel Punta Maldonado',
            },
            file: {
                data: carouselIca.buffer,
                mimetype: 'image/png',
                name: carouselIca.filename,
                size: carouselIca.buffer.length,
            },
        }),
    ])

    const pmaldonadoDoc = await Promise.all([
        payload.create({
            collection: 'destinations',
            data: {
                name: 'Punta Maldonado',
                imageDestination: pmaldonadoMedia,
                backgroundDestination: pmaldonadoBackgroundMedia,
                carouselItemDestination: pmaldonadoCarouselMedia,
            },
        }),
    ])

    payload.logger.info(`— Destinations seeded...`)

    payload.logger.info(`— Seeding Tours...`)

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
            categorias: [...Categories],
            destinos: Destinos,
            publishedAt: new Date().toISOString(),
        }
    }

    const tour1 = await payload.create({
        collection: 'tours',
        depth: 1,
        data: Tour({ slug: 'tour-valle-sagrado', title: 'Tour Valle Sagrado', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: [...categories], Destinos: cuscoDoc[0] }),
    })
    const tour2 = await payload.create({
        collection: 'tours',
        depth: 1,
        data: Tour({ slug: 'oasis-huacachina', title: 'Oasis Huacachina', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: [...categories], Destinos: cuscoDoc[0] })
    })
    const tour3 = await payload.create({
        collection: 'tours',
        depth: 1,
        data: Tour({ slug: 'lago-sandoval', title: 'Lago Sandoval', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: [...categories], Destinos: cuscoDoc[0] })
    })
    const tour4 = await payload.create({
        collection: 'tours',
        depth: 1,
        data: Tour({ slug: 'ccaccaccollo', title: 'Ccaccaccollo', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: [...categories], Destinos: icaDoc[0] }),
    })
    const tour5 = await payload.create({
        collection: 'tours',
        depth: 1,
        data: Tour({ slug: 'laguna-humantay', title: 'Laguna Humantay', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: [...categories], Destinos: icaDoc[0] }),
    })
    const tour6 = await payload.create({
        collection: 'tours',
        depth: 1,
        data: Tour({ slug: 'city-tour-ica', title: 'City Tour Ica', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: [...categories], Destinos: icaDoc[0] }),
    })

    payload.logger.info(`— Tours Seededd...`)


    payload.logger.info(`— Seeding Page...`)
    const pageDestino = await payload.create({
        collection: 'pages',
        data:
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
        }
    })
    const pageHome = await payload.create({
        collection: 'pages',
        data: {
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
    })
    payload.logger.info(`— Page Seeded...`)
}


