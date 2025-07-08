// src/lexical/features/CustomHeadingFeature.ts

import { convertLexicalNodesToHTML, createNode, createServerFeature, HeadingFeatureProps } from '@payloadcms/richtext-lexical';
import {
    CustomHeadingNode,
    $createCustomHeadingNode,
} from './customHeadingFeature.node';
import { MarkdownTransformer } from './markdownTransformer';
import { i18n } from './i18n';
import { HeadingNode, HeadingTagType } from '@payloadcms/richtext-lexical/lexical/rich-text';
import { $getSelection } from '@payloadcms/richtext-lexical/lexical';
import { $setBlocksType } from '@payloadcms/richtext-lexical/lexical/selection';

const $setHeading = (headingSize: HeadingTagType) => {
    const selection = $getSelection()
    $setBlocksType(selection, () => $createCustomHeadingNode(headingSize))
}

export const CustomHeadingFeature = createServerFeature<
    HeadingFeatureProps,
    HeadingFeatureProps,
    HeadingFeatureProps
>({
    feature: ({ props }) => {
        if (!props) {
            props = {}
        }

        const { enabledHeadingSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] } = props

        return {
            ClientFeature: '/lexical/CustomHeading/customHeadingFeature.client.tsx#HeadingFeatureClient',
            clientFeatureProps: props,
            i18n,
            markdownTransformers: [MarkdownTransformer(enabledHeadingSizes)],
            nodes: [
                createNode({
                    converters: {
                        html: {
                            converter: async ({
                                converters,
                                currentDepth,
                                depth,
                                draft,
                                node,
                                overrideAccess,
                                parent,
                                req,
                                showHiddenFields,
                            }) => {
                                const childrenText = await convertLexicalNodesToHTML({
                                    converters,
                                    currentDepth,
                                    depth,
                                    draft,
                                    lexicalNodes: node.children,
                                    overrideAccess,
                                    parent: {
                                        ...node,
                                        parent,
                                    },
                                    req,
                                    showHiddenFields,
                                })
                                const style = [
                                    node.format ? `text-align: ${node.format};` : '',
                                    node.indent > 0 ? `padding-inline-start: ${Number(node.indent) * 2}rem;` : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')
                                return `<${node?.tag}${style ? ` style='${style}'` : ''}>${childrenText}</${node?.tag}>`
                            },
                            nodeTypes: [CustomHeadingNode.getType()],
                        },
                    },
                    node: CustomHeadingNode,
                }),
                /*createNode({
                    node: {
                        replace: HeadingNode,
                        with: (node: HeadingNode) => {
                            return $createCustomHeadingNode(node.getTag())
                        },
                        withKlass: CustomHeadingNode,
                    }
                })*/
            ],
            sanitizedServerFeatureProps: props,
        }
    },
    key: 'custom-heading',
})