import { CustomHeadingNode, $isCustomHeadingNode, $createCustomHeadingNode } from './customHeadingFeature.node'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'

import { HeadingTagType } from '@payloadcms/richtext-lexical/lexical/rich-text'
import { ElementNode } from '@payloadcms/richtext-lexical/lexical'

export const createBlockNode = (
    createNode: (match: Array<string>) => ElementNode,
): ElementTransformer['replace'] => {
    return (parentNode, children, match) => {
        const node = createNode(match)
        if (node) {
            node.append(...children)
            parentNode.replace(node)
            node.select(0, 0)
        }
    }
}

export const MarkdownTransformer: (enabledHeadingSizes: HeadingTagType[]) => ElementTransformer = (
    enabledHeadingSizes,
) => {
    // Convert enabledHeadingSizes to a list of numbers (1 for h1, 2 for h2, etc.)
    const enabledSizes = enabledHeadingSizes.map((tag) => Number(tag.slice(1)))

    // Create a regex pattern that matches any of the enabled sizes
    const pattern = `^(${enabledSizes.map((size) => `#{${size}}`).join('|')})\\s`
    const regExp = new RegExp(pattern)

    return {
        type: 'element',
        dependencies: [CustomHeadingNode],
        export: (node, exportChildren) => {
            if (!$isCustomHeadingNode(node)) {
                return null
            }
            const level = Number(node.getTag().slice(1))
            return '#'.repeat(level) + ' ' + exportChildren(node)
        },
        regExp,
        replace: createBlockNode((match) => {
            const tag = ('h' + match[1]?.length) as HeadingTagType
            return $createCustomHeadingNode(tag)
        }),
    }
}