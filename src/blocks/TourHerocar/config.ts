import type { Block } from 'payload'

export const TourHerocarBlock: Block = {
    slug: 'tourHerocar',
    interfaceName: 'TourHerocarB',
    labels: {
        singular: 'Tour Hero Carousel',
        plural: 'Tour Hero Carousel',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    type: 'group',
                    name: 'carContent',
                    label: 'Carousel Images Column',
                    admin: {
                        width: '50%',

                    },
                    fields: [
                        {
                            name: 'carImages',
                            label: 'Carousel Images Dimensiones 1:1',
                            type: 'array',
                            fields: [
                                {
                                    name: 'image',
                                    label: 'Image',
                                    type: 'upload',
                                    relationTo: 'media', // Assuming you have a 'media' collection
                                    required: true,
                                },
                            ],
                        },
                    ]
                },
                {
                    type: 'group',
                    name: 'ImageContent',
                    label: 'Single Image Column',
                    admin: {
                        width: '50%',
                    },
                    fields: [
                        {
                            name: 'image',
                            label: 'Image Dimensiones 4:3',
                            type: 'upload',
                            relationTo: 'media', // Assuming you have a 'media' collection
                            required: true,
                        },
                    ]
                },
            ],
        },
    ],
}
