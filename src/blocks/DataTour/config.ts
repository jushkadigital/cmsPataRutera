import titleGroup from "@/fields/title";
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";
import { GridImages } from "../GridImages/config";


export const DataTour: Block = { // Renamed constant
    slug: 'dataTour', // Updated slug
    interfaceName: 'dataTourBlock', // Updated interface name
    labels: {
        singular: 'Data del tour',
        plural: 'Data del tours',
    },
    fields: [
        {
            name: 'duration',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true
                },
                {
                    name: 'valueDia',
                    type: 'number',
                    required: true
                },
                {
                    name: 'valueNoche',
                    type: 'number',
                    required: true
                }
            ]

        },
        {
            name: 'groupSize',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true
                },
                {
                    name: 'value',
                    type: 'number',
                    required: true
                }
            ]

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
        {
            name: 'altitud',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'number',
                    required: true,
                }
            ],

        },
        {
            name: 'idioma',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                }
            ]

        }

    ]
}
