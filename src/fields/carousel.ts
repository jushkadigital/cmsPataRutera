import type { Field, GroupField } from 'payload'
import deepMerge from '@/utilities/deepMerge'

type carouselType = (options?: {
    overrides?: Partial<GroupField>
}) => Field
export const carouselGroup: carouselType = ({ overrides = {} } = {}) => {


    const carouselField: GroupField = {
        name: 'imageCarousel',
        label: 'Image Carousel',
        type: 'group', // Use group as the top-level container for organization
        interfaceName: 'ImageCarouselField', // Optional: for generated TS types
        fields: [
            {
                name: 'slides',
                label: false,
                type: 'array',
                required: true,
                minRows: 1,
                admin: {
                    description: 'Upload the images for the carousel gallery.',
                    components: {
                        // Consider adding a RowLabel component for better display of images in admin
                    },
                },
                fields: [
                    {
                        name: 'image',
                        label: 'Image',
                        type: 'upload',
                        relationTo: 'media', // Assuming your media collection is 'media'
                        required: true,
                    },
                    // You could add more fields per slide if needed, like alt text or caption
                    // {
                    //   name: 'alt',
                    //   label: 'Alt Text',
                    //   type: 'text',
                    // },
                ],
            },
            {
                label: 'Carousel Configuration',
                type: 'collapsible',
                admin: {
                    initCollapsed: true, // Start collapsed
                    description: 'Configure the carousel behavior and appearance.',
                },
                fields: [
                    {
                        type: 'row',
                        fields: [
                            {
                                name: 'itemsDesktop',
                                label: 'Items on Desktop',
                                type: 'number',
                                defaultValue: 3,
                                min: 1,
                                admin: {
                                    width: '50%',
                                    step: 1,
                                    description: 'Number of slides visible on larger screens.',
                                },
                            },
                            {
                                name: 'itemsMobile',
                                label: 'Items on Mobile',
                                type: 'number',
                                defaultValue: 1,
                                min: 1,
                                admin: {
                                    width: '50%',
                                    step: 1,
                                    description: 'Number of slides visible on smaller screens.',
                                },
                            },
                        ],
                    },
                    {
                        name: 'extraOptions',
                        label: 'Extra Options (JSON)',
                        type: 'json',
                        admin: {
                            description:
                                'Add any additional configuration options as a valid JSON object (e.g., for a specific carousel library).',
                        },
                    },
                ],
            },
        ],
    }
    return deepMerge(carouselField, overrides)
}