// globals/CommonCarousel.ts

import { GlobalConfig } from "payload";

export const SociosCarousel: GlobalConfig = {
    slug: 'sociosCarousel',
    label: 'Socios Imagenes',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'images',
            type: 'array',
            label: 'Imágenes del Carrusel',
            minRows: 1,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media', // Asume que tienes una colección 'media' para tus uploads
                    required: true,
                    label: 'Imagen',
                },
            ],
        },
    ],
};
