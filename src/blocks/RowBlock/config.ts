// src/blocks/LayoutRowBlock.ts

import type { Block } from 'payload';
import { GridTours } from '../GridTours/config';
import { MediaBlock } from '../MediaBlock/config';
import { PostRelationTourBlock } from '../PostRelationTour/config';
import { SociosBlock } from '../Socios/config';
import { ReconocimientosBlock } from '../Reconocimientos/config';
import OfertasBlock from '../Ofertas/config';
import CarouselDestination from '../CarouselDestination/config';
import { TikTokLinksBlock } from '../TikTokLinksBlock/config';
import { BeneficiosBlock } from '../Beneficios/config';
import { EstadisticasBlock } from '../EstadisticasBlock/config';
import { TextContentBlock } from '../TextContentBlock/config';
import { GridImages } from '../GridImages/config';
import { FormBitrixBlock } from '../FormBitrix/config';
import { RevistaBlock } from '../RevistaBlock/config';
import { YouTubeLinksBlock } from '../YouTubeLinksBlock/config';
import { TextIconContentBlock } from '../TextIconContentBlock/config';
// Importa los bloques típicos que quieres permitir DENTRO de las columnas
// Importa cualquier otro bloque típico que deba poder ir en una columna


export const RowBlock: Block = {
    slug: 'rowBlock',
    interfaceName: 'RowBlock', // Updated interface name
    labels: {
        singular: 'Row',
        plural: 'Layout Rows (Columns)',
    },
    fields: [
        // Campo para definir el tipo de layout (número de columnas y distribución)
        {
            name: 'columns',
            label: 'Column Content Areas',
            type: 'array',
            fields: [
                // >>> ESTE ES EL CAMPO BLOCKS ANIDADO <<<
                // Este campo permite a los editores añadir MULTIPLES bloques
                // DENTRO de CADA COLUMNA individual.
                {
                    name: 'columnWidth',
                    type: 'select',
                    label: 'Ancho de la Columna',
                    required: true,
                    defaultValue: '50', // Puedes establecer un valor por defecto si lo deseas
                    options: [
                        {
                            label: '25%',
                            value: '25', // Almacena el número como string o number
                        },
                        {
                            label: '33.33%',
                            value: '33.333333',
                        },
                        {
                            label: '50%',
                            value: '50',
                        },
                        {
                            label: '66.67%',
                            value: '66.666667',
                        },
                        {
                            label: '75%',
                            value: '75',
                        },
                        {
                            label: '100%',
                            value: '100',
                        },
                    ],
                },
                {
                    name: 'columnBlocks', // Nombre del campo que contendrá los bloques de esta columna
                    label: 'Content Blocks for this Column',
                    type: 'blocks', // <-- Es de tipo 'blocks'
                    // Aquí listas los bloques que están permitidos DENTRO de ESTA COLUMNA
                    blocks: [
                        GridTours, MediaBlock, PostRelationTourBlock, SociosBlock, ReconocimientosBlock, OfertasBlock,
                        CarouselDestination, TikTokLinksBlock, YouTubeLinksBlock, BeneficiosBlock, EstadisticasBlock, TextContentBlock, GridImages,
                        OfertasBlock, FormBitrixBlock, RevistaBlock, TextIconContentBlock
                        // QuoteBlock,
                        // IMPORTANTE: NO te añadas a ti mismo (LayoutRowBlock) aquí dentro,
                        // podrías crear una recursión infinita en el Admin y la data.
                        // Solo incluye bloques de contenido atómicos o contenedores NO recursivos.
                    ],
                    maxRows: 1,
                    minRows: 1,
                    required: true, // Cada columna debe tener al menos un bloque dentro
                    admin: {
                        description: 'Añade los bloques de contenido que irán en esta columna.',
                    }
                }
            ],
            minRows: 1, // Requiere al menos una columna definida
            // Puedes poner un maxRows si tu layout tiene un número fijo o máximo de columnas (ej: max 3)
            // maxRows: 3,
            admin: {
                description: 'Añade un item por cada columna que necesites. Cada item contendrá sus propios bloques internos.',
            },
        },
    ],
};