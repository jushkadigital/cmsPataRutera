import type {
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    Spread,
    SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical' // Core types

import {
    ListItemNode, // Base class from /lexical/list
    type SerializedListItemNode, // Serialized type from /lexical/list
} from '@payloadcms/richtext-lexical/lexical/list'

// --- Custom List Item Node Definition ---
type IconType = 'check' | 'warning' | null | undefined

export type SerializedCustomListItemNode = Spread<
    {
        iconType?: IconType // Optional property
    },
    SerializedListItemNode
>

// Helper function to add/remove classes based on iconType
function setIconClasses(dom: HTMLElement, iconType: IconType) {
    dom.classList.toggle('custom-list-item-check', iconType === 'check');
    dom.classList.toggle('custom-list-item-warning', iconType === 'warning');
    // Add a general class when any icon is active to hide default marker
    dom.classList.toggle('custom-list-item-active', !!iconType);
}

export class CustomListItemNode extends ListItemNode {
    __iconType?: IconType // Store the custom property

    static override getType(): string {
        return 'custom-list-item' // Unique type identifier
    }

    static override clone(node: CustomListItemNode): CustomListItemNode {
        return new CustomListItemNode(
            node.__iconType,
            node.getValue(), // Use base class method
            node.getChecked(), // Use base class method
            node.__key, // Key access is typical
        )
    }

    constructor(
        iconType?: IconType,
        value?: number,
        checked?: boolean | undefined,
        key?: NodeKey,
    ) {
        super(value, checked, key)
        this.__iconType = iconType
    }

    // Serialization
    static override importJSON(serializedNode: SerializedCustomListItemNode): CustomListItemNode {
        const { iconType, value, checked } = serializedNode;
        // Use the factory function which calls applyNodeReplacement
        const node = $createCustomListItemNode(iconType, value, checked);
        // Set other properties from the serialized node if needed and methods exist
        // Example: node.setFormat(rest.format); node.setIndent(rest.indent); ...
        // Often, the base class handles this implicitly if structured correctly.
        return node
    }

    override exportJSON(): SerializedCustomListItemNode {
        return {
            ...super.exportJSON(),
            iconType: this.getIconType(), // Use getter
            type: CustomListItemNode.getType(), // Ensure correct type
            version: 1,
        }
    }

    // DOM Export - Add the data attribute
    override exportDOM(editor: LexicalEditor): DOMExportOutput {
        const exportOutput = super.exportDOM(editor)
        const element = exportOutput?.element;
        if (element instanceof HTMLElement && this.__iconType) { // Check if element is HTMLElement
            element.setAttribute('data-icon-type', this.__iconType)
        }
        return exportOutput
    }

    // DOM Import (Optional but recommended for pasting HTML)
    static override importDOM(): DOMConversionMap | null {
        return {
            li: (domNode: Node) => {
                if (!(domNode instanceof HTMLElement)) return null; // Type guard
                if (domNode.parentNode?.nodeName === 'OL' || domNode.parentNode?.nodeName === 'UL') {
                    return {
                        conversion: convertCustomListItemElement, // Use separate converter function
                        priority: 1, // Higher priority than default li converter
                    };
                }
                return null;
            },
        };
    }

    // DOM Rendering Methods
    override createDOM(config: EditorConfig): HTMLElement {
        // Call super with only config
        const li = super.createDOM(config);
        // Apply initial classes based on the iconType at creation
        setIconClasses(li, this.__iconType);
        return li;
    }

    override updateDOM(
        prevNode: ListItemNode, // Use base type here
        dom: HTMLElement,
        config: EditorConfig,
    ): boolean {
        // Cast prevNode inside the method if needed to access custom props
        const prevCustomNode = prevNode as CustomListItemNode;

        // Call super with the correctly typed prevNode
        let needsReconciliation = super.updateDOM(prevNode, dom, config);

        // Check if our custom iconType property changed
        // Access custom prop via the casted variable
        if (prevCustomNode.__iconType !== this.__iconType) {
            setIconClasses(dom, this.__iconType);
            needsReconciliation = true;
        }

        return needsReconciliation;
    }

    // Custom Methods
    setIconType(iconType: IconType): void {
        this.getWritable().__iconType = iconType
    }

    getIconType(): IconType {
        return this.getLatest().__iconType
    }

    // Ensure Checklist functionality is preserved if needed
    // Override setChecked from ListItemNode if necessary
    /* override setChecked(checked: boolean): this {
      super.setChecked(checked);
      // Potentially add custom logic here
      return this;
    } */
}

// Factory Function - Use applyNodeReplacement if possible (import from /lexical)
// Assuming $applyNodeReplacement exists in the correct path
import { $applyNodeReplacement } from '@payloadcms/richtext-lexical/lexical'

export function $createCustomListItemNode(iconType?: IconType, value?: number, checked?: boolean): CustomListItemNode {
    // Pass key as undefined, Lexical handles it
    const node = new CustomListItemNode(iconType, value, checked);
    // If $applyNodeReplacement is not directly applicable or causes issues,
    // just return the new node. Lexical often handles replacement internally.
    // return $applyNodeReplacement(node);
    return node;
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