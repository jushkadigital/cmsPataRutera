import { Block } from "payload";

export const FormBitrixBlock: Block = {
    slug: 'formBitrixBlock',
    interfaceName: 'FormBitrixBlock',
    fields: [
        {
            name: 'trackingCode', // required
            type: 'code', // required
            required: true,
            admin: {
                language: 'javascript',
            },
        },

    ],
} 