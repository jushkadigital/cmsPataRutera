// src/lexical/nodes/CustomCustomHeadingNode.ts

// --- IMPORTACIONES CORREGIDAS ---
import {
    HeadingNode,
    HeadingTagType,
} from '@payloadcms/richtext-lexical/lexical/rich-text';
import {
    $isListItemNode,
    $isListNode,
} from '@payloadcms/richtext-lexical/lexical/list';
import {
    ElementNode,
    LexicalNode,
    $applyNodeReplacement
} from '@payloadcms/richtext-lexical/lexical';

import { HeadingFeatureClient } from '@payloadcms/richtext-lexical/client'

// El resto de la lógica del nodo no cambia.
export class CustomHeadingNode extends HeadingNode {
    static override getType(): string {
        return 'custom-heading'
    }


    static override clone(node: CustomHeadingNode): CustomHeadingNode {
        return new CustomHeadingNode(node.getTag(), node.getKey());
    }

    override getParent<T extends ElementNode>(): T | null {
        const parent = super.getParent<T>();
        if ($isListItemNode(parent) || $isListNode(parent)) {
            console.log('IS LIST')

            return parent;
        }
        console.log('IS NO LIST')
        return super.getParent<T>();
    }

    canBeNested(): boolean {
        return true;
    }
}

export function $createCustomHeadingNode(
    headingTag: HeadingTagType,
) {
    return $applyNodeReplacement(new CustomHeadingNode(headingTag));
}

export function $isCustomHeadingNode(
    node: LexicalNode | null | undefined,
): node is CustomHeadingNode {
    return node instanceof CustomHeadingNode;
}


