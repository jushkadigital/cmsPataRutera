import type { Field, GroupField } from 'payload'

export const titleNew: GroupField = {
  name: 'title',
  type: 'group',
  interfaceName: 'TitleGroup', // Optional: for generated TS types
  admin: {
  },
  fields: [
    {
      name: 'titleText',
      label: 'Titulo',
      type: 'text',
      required: true,
    },
  ],
}

export default titleNew; 
