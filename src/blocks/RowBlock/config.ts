// src/blocks/LayoutRowBlock.ts

import type { Block } from 'payload';
import { GridTours } from '../GridTours/config';
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
                    name: 'columnBlocks', // Nombre del campo que contendrá los bloques de esta columna
                    label: 'Content Blocks for this Column',
                    type: 'blocks', // <-- Es de tipo 'blocks'
                    // Aquí listas los bloques que están permitidos DENTRO de ESTA COLUMNA
                    blocks: [
                        GridTours, // Referencia a la definición del bloque de texto simple
                        // ButtonBlock,   // Añade referencias a otros bloques permitidos
                        // QuoteBlock,

                        // IMPORTANTE: NO te añadas a ti mismo (LayoutRowBlock) aquí dentro,
                        // podrías crear una recursión infinita en el Admin y la data.
                        // Solo incluye bloques de contenido atómicos o contenedores NO recursivos.
                    ],
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