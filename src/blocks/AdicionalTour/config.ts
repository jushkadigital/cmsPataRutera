import titleGroup from "@/fields/title";
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";
import { GridImages } from "../GridImages/config";


export const AdicionalTour: Block = { // Renamed constant
    slug: 'adicionalTour', // Updated slug
    interfaceName: 'adicionalTourBlock', // Updated interface name
    labels: {
        singular: 'Adicional del tour',
        plural: 'Adicional del tours',
    },
    fields: [
        titleGroup
        ,
        {
            name: 'arrayData',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text'
                },
                {
                    name: 'content',
                    type: 'richText',
                    editor: lexicalEditor({
                        features: ({ defaultFeatures }) => [
                            ...defaultFeatures,
                            FixedToolbarFeature(),
                            BlocksFeature({
                                blocks: [GridImages]
                            })
                        ]
                    })
                }
            ]

        }
    ]
}
