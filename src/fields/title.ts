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
  ],
}

export default titleGroup; 
