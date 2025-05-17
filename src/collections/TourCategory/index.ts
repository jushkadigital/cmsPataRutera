import type { Field, CollectionConfig } from 'payload';

export const TourCategory: CollectionConfig = {
    slug: 'tourCategory',
    admin: {
        useAsTitle: 'name',
        description: 'Categorías para agrupar tours.'
    },
    access: {
        read: () => true, // Allow public read access
    },
    fields: [
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            required: true,
            unique: true,
            index: true,
        },
        // Optional: Add more fields like description, icon, etc.
    ],
};

// Assuming default export might be needed depending on how it's imported
// export default TourCategory; // Adjust default export if necessary based on usage elsewhere 