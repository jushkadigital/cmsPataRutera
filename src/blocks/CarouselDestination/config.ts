import titleGroup from '@/fields/title';
import type { Block } from 'payload'

export const CarouselDestination: Block = {
    slug: 'carouselDestination',
    interfaceName: 'CarouselDestinationBlock', // Optional: For generated TypeScript types
    labels: {
        singular: 'Carousel Destination',
        plural: 'Carousel Destinations',
    },
    fields: [
        titleGroup

        // No other fields are needed here, as the data comes from the collection itself.
        // The frontend component associated with this slug ('destinationsList')
        // will be responsible for fetching and displaying all Destination entries.
    ],
}

export default CarouselDestination;
