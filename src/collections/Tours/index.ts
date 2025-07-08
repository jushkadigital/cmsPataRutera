import type { CollectionConfig } from 'payload'
// Only import necessary features and types for this file
import {
    lexicalEditor,
    BlocksFeature,
    ParagraphFeature,
    HeadingFeature,
    UploadFeature,
    UnorderedListFeature, // Keep for filtering
    OrderedListFeature,   // Keep for filtering
    ChecklistFeature,     // Corrected Typo: Keep for filtering
    BoldFeature,
    ItalicFeature,
    LinkFeature,
    FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import DescrPrice from '@/blocks/DescrPrice/config'
import GuiaTour from '@/blocks/GuiaTour/config'
import { slugField } from '@/fields/slug'
import { GridTours } from '@/blocks/GridTours/config'
import { revalidateTour, revalidateDelete } from './hooks/revalidateTour'
import { createdBy, populatePublishedAt } from '@/hooks/populatePublishedAt'
import { PostRelationTourBlock } from '@/blocks/PostRelationTour/config'
import { YouTubeLinksBlock } from '@/blocks/YouTubeLinksBlock/config'
import { SociosBlock } from '@/blocks/Socios/config'
import { ReconocimientosBlock } from '@/blocks/Reconocimientos/config'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { heroTour } from '@/heros/TourHero'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload';
import config from '@payload-config';
import { TextContentBlock } from '@/blocks/TextContentBlock/config'
import { GridBlogs } from '@/blocks/GridBlogs/config'
import { RevistaBlock } from '@/blocks/RevistaBlock/config'
import { FormBitrixBlock } from '@/blocks/FormBitrix/config'
import { RowBlock } from '@/blocks/RowBlock/config'
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'
import { PopulatePrice } from './hooks/populatePrice'

// Import the custom feature






export const Tours: CollectionConfig = {
    slug: 'tours',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        title: true,
        slug: true,
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data, req }) => {
                const path = generatePreviewPath({
                    slug: typeof data?.slug === 'string' ? data.slug : '',
                    collection: 'tours',
                    req,
                })

                return path
            },
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'tours',
                req,
            }),
        useAsTitle: 'title',
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        heroTour
                    ],
                    label: 'Hero'
                },
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            blocks: [DescrPrice, GuiaTour, GridTours, GridBlogs, RowBlock, PostRelationTourBlock, YouTubeLinksBlock, TextContentBlock, SociosBlock, ReconocimientosBlock, FormBitrixBlock, RevistaBlock],
                            defaultValue: [
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
                                        nextText: "por persona",
                                        paymentForm: {
                                            InputPlaceHolderDate: "Fecha",
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
                                                                type: "listitem",
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 2,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 3,
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 4,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 5,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                type: "listitem",
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 2,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 3,
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 4,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 5,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                type: "listitem",
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 2,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 3,
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 4,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 5,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                type: "listitem",
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 2,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 3,
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 4,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                                                    }
                                                                ],
                                                                direction: "ltr"
                                                            },
                                                            {
                                                                type: "listitem",
                                                                value: 5,
                                                                format: "",
                                                                indent: 0,
                                                                version: 1,
                                                                children: [
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
                                },
                                {
                                    blockName: null,
                                    blockType: "reconocimientos",
                                    blockTitle: {
                                        titleText: "Nuestros reconocimientos",
                                        tag: "h2",
                                        size: "medium",
                                        textColor: "#2970B7",
                                        underlineColor: "#EFBA06"
                                    }
                                },
                                {

                                    blockName: null,
                                    blockType: "socios",
                                    blockTitle: {
                                        titleText: "Nuestros Socios",
                                        tag: "h2",
                                        size: "medium",
                                        textColor: "#2970B7",
                                        underlineColor: "#EFBA06"
                                    }
                                }
                            ],
                        },
                    ],
                    label: 'Content'
                },
                {
                    fields: [
                        {
                            name: 'featuredImage',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            label: 'Imagen Destacada',
                        },

                        {
                            name: 'miniDescription',
                            type: 'richText',
                            label: 'Descripción Miniatura',
                            editor: lexicalEditor({
                                features: ({ defaultFeatures }) => [
                                    ...defaultFeatures,
                                    //CustomListServerFeature(),
                                ],
                            }),
                            required: true,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    type: 'collapsible',
                                    label: 'Price Data',
                                    fields: [
                                        {
                                            type: 'text',
                                            name: 'Desde',
                                            required: true,
                                        },
                                        {
                                            type: 'number',
                                            name: 'price',
                                            admin: {
                                                readOnly: true
                                            }
                                        },
                                        {
                                            type: 'text',
                                            name: 'Person desc',
                                            required: true,
                                        },

                                    ]
                                },
                                {
                                    type: 'collapsible',
                                    label: 'Price Data',
                                    fields: [
                                        {
                                            name: 'iconMaxPassengers',
                                            type: 'upload',
                                            relationTo: 'media',
                                            defaultValue: async ({ user, locale, req }) => {
                                                try {
                                                    // Realiza una consulta a la colección 'media' para encontrar la imagen por su nombre de archivo
                                                    // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo
                                                    const payload = await getPayload({ config })
                                                    const result = await payload.find({
                                                        collection: 'media',
                                                        where: {
                                                            filename: {
                                                                equals: 'iconMaxPassengers.svg'
                                                            },
                                                        },
                                                        limit: 1, // Asumimos que solo quieres una imagen con ese nombre
                                                        depth: 0, // No necesitamos poblar relaciones de la imagen en este caso
                                                    });

                                                    // Si se encontró un documento, retorna su ID
                                                    if (result.docs.length > 0) {
                                                        return result.docs[0]!.id;
                                                    }

                                                } catch (error) {
                                                    // Maneja cualquier error durante la consulta
                                                    console.error('Error fetching default image:', error);
                                                }

                                                // Si no se encuentra la imagen o hay un error, retorna null o undefined
                                                // para que el campo quede vacío por defecto.
                                                return null;
                                            },
                                            admin: {
                                                readOnly: true, // Hace que el campo sea de solo lectura
                                            },
                                        },
                                        {
                                            name: 'maxPassengers',
                                            label: 'Máximo de Pasajeros',
                                            type: 'number',
                                            required: true,
                                        },
                                        {
                                            name: 'iconDifficulty',
                                            type: 'upload',
                                            relationTo: 'media',
                                            defaultValue: async ({ user, locale, req }) => {
                                                try {
                                                    // Realiza una consulta a la colección 'media' para encontrar la imagen por su nombre de archivo
                                                    // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo

                                                    const payload = await getPayload({ config })
                                                    const result = await payload.find({
                                                        collection: 'media',
                                                        where: {
                                                            filename: {
                                                                equals: 'iconDifficulty.svg',
                                                            },
                                                        },
                                                        limit: 1, // Asumimos que solo quieres una imagen con ese nombre
                                                        depth: 0, // No necesitamos poblar relaciones de la imagen en este caso
                                                    });

                                                    // Si se encontró un documento, retorna su ID
                                                    if (result.docs.length > 0) {
                                                        return result.docs[0]!.id;
                                                    }

                                                } catch (error) {
                                                    // Maneja cualquier error durante la consulta
                                                    console.error('Error fetching default image:', error);
                                                }

                                                // Si no se encuentra la imagen o hay un error, retorna null o undefined
                                                // para que el campo quede vacío por defecto.
                                                return null;
                                            },
                                            admin: {
                                                readOnly: true, // Hace que el campo sea de solo lectura
                                            },
                                        },
                                        {
                                            name: 'difficulty',
                                            type: 'select',
                                            defaultValue: 'easy',
                                            label: 'Dificultad',
                                            options: [
                                                {
                                                    label: 'Easy',
                                                    value: 'easy',
                                                },
                                                {
                                                    label: 'Medium',
                                                    value: 'medium',
                                                },
                                                {
                                                    label: 'Hard',
                                                    value: 'hard',
                                                },
                                            ],
                                            required: true,
                                        },
                                    ]
                                }

                            ]
                        },

                    ],
                    label: 'Thumbnail'
                },
                {
                    label: 'SEO',
                    name: 'meta',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        })
                        ,
                        MetaTitleField({
                            hasGenerateFn: true
                        }),
                        MetaImageField({
                            relationTo: 'media'
                        }),
                        MetaDescriptionField({
                        }),
                        PreviewField({
                            hasGenerateFn: true,
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description'
                        }),
                    ]
                }
            ]
        },
        {
            type: 'number',
            name: 'priceGeneral',
            required: true,
            admin: {
                position: 'sidebar',
                description: 'Precio General'
            },
        },
        {
            name: 'categorias',
            label: 'Categorías',
            type: 'relationship',
            relationTo: 'tourCategory',
            hasMany: true,
            admin: {
                position: 'sidebar',
                description: 'Categorías a las que pertenece este tour.'
            },
        },
        {
            name: 'destinos',
            label: 'Destinos',
            type: 'relationship',
            relationTo: 'destinations',
            admin: {
                position: 'sidebar',
                description: 'Destinos a los que pertenece este tour.'
            },
        },
        {
            name: 'createdBy',
            type: 'relationship',
            relationTo: 'users', // Assumes a 'users' collection slug
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
            access: {
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                }
            },
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidateTour],
        beforeChange: [populatePublishedAt, createdBy, PopulatePrice],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 350 // We set this interval for optimal live preview
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}