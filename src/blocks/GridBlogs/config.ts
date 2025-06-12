import type { Block, Field } from 'payload'
import titleGroup from '@/fields/title' // Import the title group field

export const GridBlogs: Block = { // Renamed constant
    slug: 'gridBlogs', // Updated slug
    interfaceName: 'GridBlogsBlock', // Updated interface name
    labels: {
        singular: 'Grid de Blogs',
        plural: 'Grids de Blogs',
    },
    fields: [
        {
            name: 'carousel',
            type: 'ui',
            admin: {
            },
        }
    ]
}
