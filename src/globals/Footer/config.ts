import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'
import { linkGroup } from '@/fields/linkGroup'

export const Footer: GlobalConfig = {
    slug: 'footer',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'navItems',
            type: 'array',
            fields: [
                {
                    type: 'text',
                    name: 'nameColumn',
                    required: true
                },
                linkGroup({
                    appearances: false,
                }),
            ],
            maxRows: 6,
            admin: {
                initCollapsed: true,
            },
        },
    ],
    hooks: {
        afterChange: [revalidateFooter],
    },
}