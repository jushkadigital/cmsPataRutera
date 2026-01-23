import { applyConditionalDefaults } from '@/utilities/frontEnd'
import type { Block, Field } from 'payload'
import titleNew from '@/fields/titlenew';

export const ServicesTicket: Block = {
  slug: 'svticket',
  interfaceName: 'ServicesTicket',
  labels: {
    singular: 'Ticket Service',
    plural: 'Ticket Services',
  },
  fields: [
    {
      type: 'row', // required
      fields: [
        titleNew,
        {
          name: 'quantity',
          label: 'Cantidad',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            width: '25%'
          },
        }

      ]

    },
    {
      type: 'row', // required
      fields: [
        {
          name: 'price',
          label: 'Precio',
          type: 'number',
          min: 0,
          required: true,
          admin: {
            width: '50%'
          },
        },

        // required
        {
          name: 'time',
          label: 'Tiempo de Duracion',
          min: 0,
          type: 'number',
          required: true,
          admin: {
            width: '50%'
          },
        }

      ],
    },
  ],
} 
