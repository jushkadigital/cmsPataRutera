import type { CollectionConfig } from 'payload';

export const BlogCategory: CollectionConfig = {
    slug: 'blogCategories',
    admin: {
        useAsTitle: 'name',
        description: 'Categories for blog posts.',
    },
    access: {
        // Define access control as needed, e.g.:
        read: () => true, // Publicly readable
        // create: authenticated, // Example: Only logged-in users can create
        // update: authenticated,
        // delete: authenticated,
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            unique: true,
            index: true,
        },
        // Optional: Add a description field
        // {
        //   name: 'description',
        //   label: 'Description',
        //   type: 'textarea',
        // },
    ],
}; 