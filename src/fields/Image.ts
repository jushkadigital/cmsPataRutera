import deepMerge from '@/utilities/deepMerge'
import type { ArrayField, Field, GroupField, UploadField } from 'payload'


interface Props {
    name: Partial<GroupField>
    overrides?: Partial<UploadField>
}

export const ImageStandar = ({ name, overrides = {} }: Props) => {



    const image: GroupField = {
        name: 'groupImage',
        type: 'group',
        ...name,
        fields: [
            {
                name: 'image',
                type: 'upload',
                relationTo: 'media', // Asume que tienes una colección 'media' para tus uploads
                required: true,
                label: 'Imagen',
                ...deepMerge({}, overrides)
            },
            {
                name: 'alt',
                type: 'text',
                label: 'Texto Alternativo',
                required: true,
            },
        ]
    }

    return image
}