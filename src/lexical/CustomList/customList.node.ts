import { ListNode } from "@payloadcms/richtext-lexical/lexical/list";


/*
export class CustomListItemNode extends ListNode {
    static override getType(): string {
        return 'custom-list'
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
    */