// app/src/lexical/customListFeature.server.ts
import type {
    HTMLConverter,
    SanitizedServerEditorConfig,
    // Removed SerializedLexicalNode as it wasn't found
} from '@payloadcms/richtext-lexical'

import {
    createServerFeature,
    createNode,
} from '@payloadcms/richtext-lexical'

import {
    // Import the custom node definition and its serialized type
    CustomListItemNode,
    type SerializedCustomListItemNode,
} from './customListFeature.node'

import {
    ListNode, // Import ListNode for registration
    type SerializedListNode, // Import its serialized type
} from '@payloadcms/richtext-lexical/lexical/list' // Correct path?

// Removed import for convertLexicalNodesToHTML as it wasn't found
// import { convertLexicalNodesToHTML } from '@payloadcms/richtext-lexical/lexical/html'

// --- HTML Converter for CustomListItemNode ---
const CustomListItemHTMLConverter: HTMLConverter<SerializedCustomListItemNode> = {
    nodeTypes: [CustomListItemNode.getType()],

    // Simplified converter - does NOT render children due to helper issues
    converter: async ({ node }) => { // Removed converters, parent, editorConfig
        const childrenHTML = '<!-- children omitted -->' // Placeholder

        const iconTypeAttr = node.iconType
            ? ` data-icon-type="${node.iconType}"`
            : ''
        const checkedAttr = node.checked !== undefined ? ` aria-checked="${String(node.checked)}" role="checkbox"` : '';
        const valueAttr = node.value !== undefined ? ` value="${node.value}"` : '';

        return `<li${valueAttr}${iconTypeAttr}${checkedAttr}>${childrenHTML}</li>`
    },
}

// --- Server Feature Definition ---
export const CustomListServerFeature = createServerFeature({
    // Remove editorConfig from the destructured arguments
    feature: ({ /* editorConfig, */ ...restArgs }) => ({
        nodes: [
            createNode({
                node: CustomListItemNode,
                converters: {
                    html: CustomListItemHTMLConverter,
                },
            }),
        ],
        ClientFeature: '/lexical/customListFeature.client.tsx#CustomListClientFeature',
    }),
    key: 'customList',
}) 