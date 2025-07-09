import {
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    Spread,
    SerializedLexicalNode,
    RangeSelection,
    ElementNode,
    $isRangeSelection,
    BaseSelection,
    ParagraphNode,
} from '@payloadcms/richtext-lexical/lexical' // Core types

import {
    $createListItemNode,
    $createListNode,
    $isListItemNode,
    $isListNode,
    ListItemNode, // Base class from /lexical/list
    type SerializedListItemNode, // Serialized type from /lexical/list
} from '@payloadcms/richtext-lexical/lexical/list'

// --- Custom List Item Node Definition ---
export type IconType = 'check' | 'location' | 'circle' | 'nocheck' | null | undefined

export type SerializedCustomListItemNode = Spread<
    {
        iconType?: IconType // Optional property
    },
    SerializedListItemNode
>

// Helper function to add/remove classes based on iconType
function setIconClasses(dom: HTMLElement, iconType: IconType) {
    dom.classList.toggle('custom-list-item-check', iconType === 'check');
    dom.classList.toggle('custom-list-item-nocheck', iconType === 'nocheck');
    dom.classList.toggle('custom-list-item-location', iconType === 'location');
    dom.classList.toggle('custom-list-item-circle', iconType === 'circle');
    // Add a general class when any icon is active to hide default marker
    dom.classList.toggle('custom-list-item-active', !!iconType);
}


export class CustomListItemNode extends ListItemNode {
    __iconType?: IconType

    static override getType(): string {
        return 'custom-list-item'
    }

    override canInsertAfter(node: any) {
        // Permite que los nodos de encabezado se inserten después de este nodo.
        return $isHeadingNode(node) || $isElementNode(node);
    }
    override canMergeWith(node: LexicalNode): boolean {
        return super.canMergeWith(node) || $isHeadingNode(node);
    }
    override extractWithChild(child: LexicalNode, selection: BaseSelection): boolean {
        if (!$isRangeSelection(selection)) {
            return false;
        }

        const anchorNode = selection.anchor.getNode();
        const focusNode = selection.focus.getNode();

        return (
            this.isParentOf(anchorNode) &&
            this.isParentOf(focusNode) &&
            this.getTextContent().length === selection.getTextContent().length
        )
    }

    override  insertAfter(node: LexicalNode, restoreSelection = true): LexicalNode {
        console.log('insertAfter')
        const listNode = this.getParentOrThrow();

        if (!$isListNode(listNode)) {
            invariant(
                false,
                'insertAfter: list node is not parent of list item node',
            );
        }
        console.log('paso')

        if ($isCustomListItemNode(node)) {
            // return super.insertAfter(node, restoreSelection);

            return ElementNode.prototype.insertAfter.call(this, node!, restoreSelection)
        }

        console.log('paso2')
        const siblings = this.getNextSiblings();

        // Split the lists and insert the node in between them
        listNode.insertAfter(node, restoreSelection);

        if (siblings.length !== 0) {
            const newListNode = $createListNode(listNode.getListType());

            siblings.forEach((sibling) => newListNode.append(sibling));

            node.insertAfter(newListNode, restoreSelection);
        }

        return node;
    }

    override insertNewAfter(_: RangeSelection, restoreSelection?: boolean): ListItemNode | ParagraphNode {
        console.log('isnert new')
        const newElement = $createCustomListItemNode()
            .updateFromJSON(this.exportJSON())
            .setChecked(this.getChecked() ? false : undefined);

        this.insertAfter(newElement, restoreSelection);

        return newElement;
    }

    override append(...nodes: LexicalNode[]): this {

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            if ($isElementNode(node) && this.canMergeWith(node)) {
                if ($isHeadingNode(node)) {
                    ElementNode.prototype.append.call(this, node!)
                } else {
                    const children = node.getChildren();
                    this.append(...children);
                    node.remove();
                }

            } else {
                /*const customHeading = $createHeadingNode('h3');
                customHeading.append(node!)
                ElementNode.prototype.append.call(this, customHeading!)*/
                ElementNode.prototype.append.call(this, node!)
            }
        }

        return this;
    }


    override collapseAtStart(selection: RangeSelection): true {
        console.log("collapse")
        const paragraph = $createParagraphNode();
        const children = this.getChildren();
        children.forEach((child) => paragraph.append(child));
        const listNode = this.getParentOrThrow();
        const listNodeParent = listNode.getParentOrThrow();
        const isIndented = $isListItemNode(listNodeParent);

        if (listNode.getChildrenSize() === 1) {
            if (isIndented) {
                // if the list node is nested, we just want to remove it,
                // effectively unindenting it.
                listNode.remove();
                listNodeParent.select();
            } else {
                listNode.insertBefore(paragraph);
                listNode.remove();
                // If we have selection on the list item, we'll need to move it
                // to the paragraph
                const anchor = selection.anchor;
                const focus = selection.focus;
                const key = paragraph.getKey();

                if (anchor.type === 'element' && anchor.getNode().is(this)) {
                    anchor.set(key, anchor.offset, 'element');
                }

                if (focus.type === 'element' && focus.getNode().is(this)) {
                    focus.set(key, focus.offset, 'element');
                }
            }
        } else {
            listNode.insertBefore(paragraph);
            this.remove();
        }

        return true;
    }


    static override clone(node: CustomListItemNode): CustomListItemNode {
        return new CustomListItemNode(
            node.__iconType,
            node.getValue(),
            node.getChecked(),
            node.__key,
        )
    }

    constructor(
        iconType?: IconType,
        value?: number,
        checked?: boolean,
        key?: NodeKey,
    ) {
        super(value, checked, key)
        this.__iconType = iconType
    }

    static override importJSON(json: SerializedCustomListItemNode): CustomListItemNode {
        return new CustomListItemNode(json.iconType, json.value, json.checked)
    }

    override exportJSON(): SerializedCustomListItemNode {
        return {
            ...super.exportJSON(),
            iconType: this.getIconType(),
            type: CustomListItemNode.getType(),
            version: 1,
        }
    }

    override exportDOM(editor?: LexicalEditor): DOMExportOutput {
        const { element } = super.exportDOM(editor!)
        if (element instanceof HTMLElement && this.__iconType) {
            element.setAttribute('data-icon-type', this.__iconType)
        }
        return { element }
    }

    static override importDOM(): DOMConversionMap | null {
        return {
            li: (domNode: Node) => {
                if (!(domNode instanceof HTMLElement)) return null
                if (domNode.parentNode?.nodeName === 'OL' || domNode.parentNode?.nodeName === 'UL') {
                    return {
                        conversion: convertCustomListItemElement,
                        priority: 1,
                    }
                }
                return null
            },
        }
    }

    override createDOM(config: EditorConfig): HTMLElement {
        const li = super.createDOM(config)
        setIconClasses(li, this.__iconType)
        return li
    }


    override updateDOM(prevNode: ListItemNode, dom: HTMLElement, config: EditorConfig): boolean {
        const prevCustomNode = prevNode as CustomListItemNode
        let needsUpdate = super.updateDOM(prevNode, dom, config)

        if (prevCustomNode.__iconType !== this.__iconType) {
            setIconClasses(dom, this.__iconType)
            needsUpdate = true
        }

        return needsUpdate
    }

    setIconType(iconType: IconType): void {
        this.getWritable().__iconType = iconType
    }

    getIconType(): IconType {
        return this.getLatest().__iconType
    }
}

// Factory Function - Use applyNodeReplacement if possible (import from /lexical)
// Assuming $applyNodeReplacement exists in the correct path
import { $applyNodeReplacement, $createParagraphNode, $isElementNode, $isParagraphNode } from '@payloadcms/richtext-lexical/lexical'
import { $createHeadingNode, $isHeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text'
import invariant from './formatList'

export function $createCustomListItemNode(iconType?: IconType, value?: number, checked?: boolean): CustomListItemNode {
    // Pass key as undefined, Lexical handles it
    const node = new CustomListItemNode(iconType, value, checked);
    // If $applyNodeReplacement is not directly applicable or causes issues,
    // just return the new node. Lexical often handles replacement internally.
    return $applyNodeReplacement(node);

}

// Type Guard
export function $isCustomListItemNode(node: LexicalNode | null | undefined): node is CustomListItemNode {
    return node instanceof CustomListItemNode
}

// DOM Conversion Function (for importDOM)
function convertCustomListItemElement(domNode: HTMLElement): DOMConversionOutput | null {
    const iconType = (domNode.getAttribute('data-icon-type') || undefined) as IconType | undefined
    let checked: boolean | undefined = undefined
    if (domNode.getAttribute('role') === 'checkbox') {
        checked = domNode.getAttribute('aria-checked') === 'true';
    }
    let value: number | undefined = undefined;
    if (domNode.parentNode?.nodeName === 'OL') {
        const valAttr = domNode.getAttribute('value');
        if (valAttr) {
            const parsed = parseInt(valAttr, 10);
            if (!isNaN(parsed)) {
                value = parsed;
            }
        }
    }
    // Create the node using the factory function
    const node = $createCustomListItemNode(iconType, value, checked)
    // This basic conversion doesn't handle children automatically.
    // More complex logic might be needed here to convert child elements/text.
    return { node };
} 