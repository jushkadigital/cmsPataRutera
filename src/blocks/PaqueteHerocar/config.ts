import type { Block } from 'payload'

export const PaqueteHerocar: Block = {
    slug: 'paqueteHerocar',
    interfaceName: 'PaqueteHerocar',
    labels: {
        singular: 'CarouselHero Paquete',
        plural: 'CarouselHero Paquetes',
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
                            label: 'Carousel Images',
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
                            label: 'Image',
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
