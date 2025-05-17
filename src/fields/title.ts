import type { Field, GroupField } from 'payload'

export const titleGroup: GroupField = {
    name: 'title',
    label: 'Configuración del Título',
    type: 'group',
    interfaceName: 'TitleGroup', // Optional: for generated TS types
    admin: {
        description: 'Configura la apariencia del elemento título.',
    },
    fields: [
        {
            name: 'titleText',
            label: 'Texto del Título',
            type: 'text',
            required: true,
            admin: {
                description: 'El contenido principal del texto del título.',
            },
        },
        {
            label: 'Opciones de Estilo',
            type: 'collapsible',
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'tag',
                            label: 'Etiqueta de Encabezado',
                            type: 'select',
                            required: true,
                            defaultValue: 'h2',
                            options: [
                                { label: 'H1', value: 'h1' },
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' },
                                { label: 'H5', value: 'h5' },
                                { label: 'H6', value: 'h6' },
                            ],
                            admin: {
                                width: '50%',
                                description: 'Selecciona la etiqueta HTML de encabezado (ej., H1, H2).',
                            },
                        },
                        {
                            name: 'size',
                            label: 'Tamaño de Fuente',
                            type: 'select',
                            required: true,
                            defaultValue: 'medium',
                            options: [
                                { label: 'Pequeño', value: 'small' },
                                { label: 'Mediano', value: 'medium' },
                                { label: 'Grande', value: 'large' },
                                { label: 'Extra Grande', value: 'xlarge' },
                            ],
                            admin: {
                                width: '50%',
                                description: 'Selecciona el tamaño relativo de la fuente.',
                            },
                        },
                    ],
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'textColor',
                            label: 'Color del Texto',
                            type: 'text',
                            defaultValue: '#2970B7',
                            admin: {
                                width: '50%',
                                description: 'Introduce un valor de color CSS (ej., #ff0000, rgba(255,0,0,0.5), red).',
                            },
                        },
                        {
                            name: 'underlineColor',
                            label: 'Color del Subrayado',
                            type: 'text',
                            defaultValue: '#EFBA06',
                            admin: {
                                width: '50%',
                                description: 'Introduce un valor de color CSS para el subrayado.',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

export default titleGroup; 