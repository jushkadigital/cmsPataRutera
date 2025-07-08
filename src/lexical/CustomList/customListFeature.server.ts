import {
    createServerFeature,
    createNode,
} from '@payloadcms/richtext-lexical'

import {
    $createCustomListItemNode,
    // Import the custom node definition and its serialized type
    CustomListItemNode,
    type SerializedCustomListItemNode,
} from './customListItem.node'
import { ListItemNode, ListNode } from '@payloadcms/richtext-lexical/lexical/list';
import { UNORDERED_LIST } from '@payloadcms/richtext-lexical/lexical/markdown';
import { ListHTMLConverter, ListItemHTMLConverter } from './htmlConverter';

// --- HTML Converter for CustomListItemNode ---

// --- Server Feature Definition ---
export const CustomListServerFeature = createServerFeature({
    // Remove editorConfig from the destructured arguments
    feature: ({ /* editorConfig, */ ...restArgs }) => ({
        markdownTransformers: [UNORDERED_LIST],
        nodes: [
            createNode({
                converters: {
                    html: ListHTMLConverter as any, // ListHTMLConverter uses a different generic type than ListNode[exportJSON], thus we need to cast as any
                },
                node: ListNode,
            }),
            createNode({
                node: ListItemNode,
                converters: {
                    html: ListItemHTMLConverter as any,
                },

            }),
            createNode({
                node: CustomListItemNode,
                converters: {
                    html: ListItemHTMLConverter as any,
                },
            }),
            createNode({
                node: {
                    replace: ListItemNode,
                    with: (node: ListItemNode) => {
                        return $createCustomListItemNode(null, node.getValue(), node.getChecked());
                    },
                    withKlass: CustomListItemNode,
                },
            })
        ],
        ClientFeature: '/lexical/CustomList/customListFeature.client.tsx#CustomListClientFeature',
    }),
    key: 'unorderedList',
})

