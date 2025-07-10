import { GlobalConfig } from "payload";

export const RedesNegocio: GlobalConfig = {
    slug: 'redesNegocio',
    label: 'Redes Negocio',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'network',
            type: 'array',
            label: 'Cree redes sociales',
            minRows: 1,
            fields: [
                {
                    name: 'iconName',
                    type: 'text',
                    required: true,
                    label: 'icono name',
                },
                {
                    name: 'link',
                    type: 'text',
                    required: true,
                    label: 'link'
                }
            ],
        },
    ],
};
