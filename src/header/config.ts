import { authenticated } from '@/access/authenticated';
import type { GlobalConfig, Block } from 'payload'
import { link } from '@/fields/link'; // Import the link field generator

// --- Definición de los Bloques ---

const PageLinkBlock: Block = {
    slug: 'pageLink',
    interfaceName: 'PageLink',
    fields: [
        // Use the link field directly here
        // Adjust options like disableLabel or appearances as needed
        link({ disableLabel: false, appearances: false }),
    ],
};

const MegaMenuBlock: Block = {
    slug: 'megaMenu',
    interfaceName: 'MegaMenu',
    fields: [
        {
            name: 'title',
            label: 'Mega Menu Title', // Added label for clarity
            type: 'text',
            required: false,
        },
        {
            name: 'menuItems',
            label: 'Menu Items',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
                // Use the imported link field for each item in the megamenu
                // Disable appearance options within the megamenu context
                link({ appearances: false }),
            ],
        },
        // Podrías añadir más campos aquí si un megamenu necesita más estructura
    ],
};

// --- Definición del Global ---

// Assuming the GlobalConfig is defined here, might need renaming if Header is expected
// Keeping Nav as per the existing file content
export const Nav: GlobalConfig = {
    slug: 'nav',
    label: 'Header Configuration',
    access: {
        read: () => true,
        update: authenticated,
    },
    fields: [
        {
            name: 'logo',
            label: 'Logo',
            type: 'upload',
            relationTo: 'media', // Assuming your media collection slug is 'media'
            required: true,
            admin: {
                description: 'Upload the site logo for the header.',
            }
        },
        {
            name: 'items',
            label: 'Navigation Items',
            type: 'blocks',
            required: true,
            minRows: 1,
            // maxRows: 8, // Removed maxRows from original example, adjust if needed
            blocks: [ // Lista los bloques permitidos
                PageLinkBlock,
                MegaMenuBlock,
            ],
            admin: {
                description: 'Add top-level navigation items. These can be direct links or mega menus containing multiple links.' // Added description
            }
        },
    ],
};

export default Nav;