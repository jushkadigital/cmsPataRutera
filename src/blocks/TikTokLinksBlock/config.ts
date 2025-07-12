import { titleGroup } from '@/fields/title';
import { Block } from 'payload';



export const TikTokLinksBlock: Block = {
  slug: 'tikTokLinks',
  interfaceName: 'TikTokLinksBlockType',
  labels: {
    singular: 'TikTok Link',
    plural: 'TikTok Links Blocks',
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
      label: 'TikTok Video Links',
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
          name: 'url',
          label: 'TikTok Video URL',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., https://www.tiktok.com/@user/video/1234567890123456789',
          },
          validate: (value?: string | null) => {
            if (!value) {
              return 'URL is required.';
            }
            // Regex for common TikTok video URLs
            const tikTokRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?tiktok\.com\/([@\w\.-]+\/video\/\d+)(\S*)?$/i;
            if (!tikTokRegex.test(value)) {
              return 'Please enter a valid TikTok video URL.';
            }
            return true;
          },
        },
      ],
    },
  ],
}; 