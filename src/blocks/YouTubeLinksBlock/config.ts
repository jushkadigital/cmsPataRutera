import { titleGroup } from '@/fields/title';
import { Block } from 'payload';


export const YouTubeLinksBlock: Block = {
  slug: 'youTubeLinks',
  interfaceName: 'YouTubeLinksBlockType',
  labels: {
    singular: 'YouTube Links',
    plural: 'YouTube Links Blocks',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Título',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          ...titleGroup, // Add the main title group for the block
          name: 'blockTitle', // Ensure a unique name for the title within this block
          label: 'Título del Bloque', // Customize label if needed
        },
      ]
    },
    {
      name: 'videoLinks',
      label: 'YouTube Video Links',
      type: 'array',
      minRows: 0,
      labels: {
        singular: 'Video Link',
        plural: 'Video Links',
      },
      admin: {
      },
      fields: [
        {
          name: 'image',
          label: 'Background',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'url',
          label: 'YouTube Video URL',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },

          validate: (value?: string | null) => {
            if (!value) {
              return 'URL is required.';
            }
            const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|shorts\/|watch\?v=|v\/|e\/|u\/\w+\/)|watch\?.+&v=)?([\w\-]+)(\S+)?$/i;
            if (!youtubeRegex.test(value)) {
              return 'Please enter a valid YouTube video URL.';
            }
            return true;
          },
        },
      ],
    },
  ],
}; 