'use client'
import type {
    SerializedListItemNode as _SerializedListItemNode,
    SerializedListNode as _SerializedListNode,
    PluginComponent,
} from '@payloadcms/richtext-lexical'

import React, { useEffect } from 'react'

import { $getNodeByKey, $isRangeSelection, $getSelection, $isTextNode, COMMAND_PRIORITY_LOW, INSERT_PARAGRAPH_COMMAND, LexicalEditor, Spread, TextNode, NodeKey, LexicalCommand, createCommand, ParagraphNode, $createParagraphNode, $isRootOrShadowRoot, $isLeafNode, $isElementNode, LexicalNode, ElementNode } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { ListItemNode, ListNode, $isListNode, $isListItemNode, $getListDepth, $removeList, registerList, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND, $createListNode, $createListItemNode, ListType } from '@payloadcms/richtext-lexical/lexical/list'
import { $findMatchingParent, mergeRegister, } from '@payloadcms/richtext-lexical/lexical/utils'
import invariant, { $getTopListNode, $removeHighestEmptyListParent } from '../formatList'



export type SerializedListItemNode = Spread<
    {
        checked?: boolean
        type: 'listitem'
    },
    _SerializedListItemNode
>

export type SerializedListNode = Spread<
    {
        checked?: boolean
        type: 'list'
    },
    _SerializedListNode
>

export function updateChildrenListItemValue(list: ListNode): void {
    const isNotChecklist = list.getListType() !== 'check';
    let value = list.getStart();
    for (const child of list.getChildren()) {
        if ($isListItemNode(child)) {
            if (child.getValue() !== value) {
                child.setValue(value);
            }
            if (isNotChecklist && child.getLatest().__checked != null) {
                child.setChecked(undefined);
            }
            if (!$isListNode(child.getFirstChild())) {
                value++;
            }
        }
    }
}
function append(node: ElementNode, nodesToAppend: Array<LexicalNode>) {
    node.splice(node.getChildrenSize(), 0, nodesToAppend);
}

function $isSelectingEmptyListItem(
    anchorNode: ListItemNode | LexicalNode,
    nodes: Array<LexicalNode>,
): boolean {
    return (
        $isListItemNode(anchorNode) &&
        (nodes.length === 0 ||
            (nodes.length === 1 &&
                anchorNode.is(nodes[0]) &&
                anchorNode.getChildrenSize() === 0))
    );
}

function $createListOrMerge(node: ElementNode, listType: ListType): ListNode {
    if ($isListNode(node)) {
        return node;
    }

    const previousSibling = node.getPreviousSibling();
    const nextSibling = node.getNextSibling();
    const listItem = $createListItemNode();
    append(listItem, node.getChildren());

    let targetList;
    if (
        $isListNode(previousSibling) &&
        listType === previousSibling.getListType()
    ) {
        previousSibling.append(listItem);
        // if the same type of list is on both sides, merge them.
        if ($isListNode(nextSibling) && listType === nextSibling.getListType()) {
            append(previousSibling, nextSibling.getChildren());
            nextSibling.remove();
        }
        targetList = previousSibling;
    } else if (
        $isListNode(nextSibling) &&
        listType === nextSibling.getListType()
    ) {
        nextSibling.getFirstChildOrThrow().insertBefore(listItem);
        targetList = nextSibling;
    } else {
        const list = $createListNode(listType);
        list.append(listItem);
        node.replace(list);
        targetList = list;
    }
    // listItem needs to be attached to root prior to setting indent
    listItem.setFormat(node.getFormatType());
    listItem.setIndent(node.getIndent());
    node.remove();

    return targetList;
}

export function $insertList(listType: ListType): void {
    const selection = $getSelection();

    if (selection !== null) {
        let nodes = selection.getNodes();
        if ($isRangeSelection(selection)) {
            const anchorAndFocus = selection.getStartEndPoints();
            invariant(
                anchorAndFocus !== null,
                'insertList: anchor should be defined',
            );
            const [anchor] = anchorAndFocus;
            const anchorNode = anchor.getNode();
            const anchorNodeParent = anchorNode.getParent();

            if ($isRootOrShadowRoot(anchorNode)) {
                const firstChild = anchorNode.getFirstChild();
                if (firstChild) {
                    nodes = firstChild.selectStart().getNodes();
                } else {
                    const paragraph = $createParagraphNode();
                    anchorNode.append(paragraph);
                    nodes = paragraph.select().getNodes();
                }
            } else if ($isSelectingEmptyListItem(anchorNode, nodes)) {
                const list = $createListNode(listType);

                if ($isRootOrShadowRoot(anchorNodeParent)) {
                    anchorNode.replace(list);
                    const listItem = $createListItemNode();
                    if ($isElementNode(anchorNode)) {
                        listItem.setFormat(anchorNode.getFormatType());
                        listItem.setIndent(anchorNode.getIndent());
                    }
                    list.append(listItem);
                } else if ($isListItemNode(anchorNode)) {
                    const parent = anchorNode.getParentOrThrow();
                    append(list, parent.getChildren());
                    parent.replace(list);
                }

                return;
            }
        }

        const handled = new Set();
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            if (
                $isElementNode(node) &&
                node.isEmpty() &&
                !$isListItemNode(node) &&
                !handled.has(node.getKey())
            ) {
                $createListOrMerge(node, listType);
                continue;
            }

            let parent = $isLeafNode(node)
                ? node.getParent()
                : $isListItemNode(node) && node.isEmpty()
                    ? node
                    : null;

            while (parent != null) {
                const parentKey = parent.getKey();

                if ($isListNode(parent)) {
                    if (!handled.has(parentKey)) {
                        const newListNode = $createListNode(listType);
                        append(newListNode, parent.getChildren());
                        parent.replace(newListNode);
                        handled.add(parentKey);
                    }

                    break;
                } else {
                    const nextParent = parent.getParent();

                    if ($isRootOrShadowRoot(nextParent) && !handled.has(parentKey)) {
                        handled.add(parentKey);
                        $createListOrMerge(parent, listType);
                        break;
                    }

                    parent = nextParent;
                }
            }
        }
    }
}

export const UPDATE_LIST_START_COMMAND: LexicalCommand<{
    listNodeKey: NodeKey;
    newStart: number;
}> = createCommand('UPDATE_LIST_START_COMMAND');
/*export const INSERT_UNORDERED_LIST_COMMAND: LexicalCommand<void> =
    createCommand('INSERT_UNORDERED_LIST_COMMAND');
export const INSERT_ORDERED_LIST_COMMAND: LexicalCommand<void> = createCommand(
    'INSERT_ORDERED_LIST_COMMAND',
);
export const REMOVE_LIST_COMMAND: LexicalCommand<void> = createCommand(
    'REMOVE_LIST_COMMAND',
);
*/

export function $handleListInsertParagraph(): boolean {

    const selection = $getSelection();

    if (!$isRangeSelection(selection) || !selection.isCollapsed()) {

        return false;
    }
    // Only run this code on empty list items
    const anchor = selection.anchor.getNode();

    if (!$isListItemNode(anchor) || anchor.getChildrenSize() !== 0) {
        return false;
    }
    const topListNode = $getTopListNode(anchor);
    const parent = anchor.getParent();


    console.log('HandleStep2')

    invariant(
        $isListNode(parent),
        'A ListItemNode must have a ListNode for a parent.',
    );

    const grandparent = parent.getParent();

    let replacementNode: ParagraphNode | ListItemNode;

    if ($isRootOrShadowRoot(grandparent)) {
        console.log('rootOrShadownRoot')
        replacementNode = $createParagraphNode();
        topListNode.insertAfter(replacementNode);
    } else if ($isListItemNode(grandparent)) {
        console.log('listITemNode')
        replacementNode = $createListItemNode();
        grandparent.insertAfter(replacementNode);
    } else {
        console.log('false')
        return false;
    }
    replacementNode
        .setTextStyle(selection.style)
        .setTextFormat(selection.format)
        .select();

    const nextSiblings = anchor.getNextSiblings();

    if (nextSiblings.length > 0) {
        const newList = $createListNode(parent.getListType());
        if ($isListItemNode(replacementNode)) {
            const newListItem = $createListItemNode();
            newListItem.append(newList);
            replacementNode.insertAfter(newListItem);
        } else {
            replacementNode.insertAfter(newList);
        }
        newList.append(...nextSiblings);
    }

    // Don't leave hanging nested empty lists
    $removeHighestEmptyListParent(anchor);

    return true;
}


export function registerListL(editor: LexicalEditor): () => void {
    const removeListener = mergeRegister(
        editor.registerCommand(
            INSERT_ORDERED_LIST_COMMAND,
            () => {
                $insertList('number');
                return true;
            },
            COMMAND_PRIORITY_LOW,
        ),
        editor.registerCommand(
            UPDATE_LIST_START_COMMAND,
            (payload) => {
                const { listNodeKey, newStart } = payload;
                const listNode = $getNodeByKey(listNodeKey);
                if (!$isListNode(listNode)) {
                    return false;
                }
                if (listNode.getListType() === 'number') {
                    listNode.setStart(newStart);
                    updateChildrenListItemValue(listNode);
                }
                return true;
            },
            COMMAND_PRIORITY_LOW,
        ),
        editor.registerCommand(
            INSERT_UNORDERED_LIST_COMMAND,
            () => {
                console.log('HHH')
                $insertList('bullet');
                return true;
            },
            COMMAND_PRIORITY_LOW,
        ),
        editor.registerCommand(
            REMOVE_LIST_COMMAND,
            () => {
                $removeList();
                return true;
            },
            COMMAND_PRIORITY_LOW,
        ),
        editor.registerCommand(
            INSERT_PARAGRAPH_COMMAND,
            () => {
                console.log('GAAAA')
                return $handleListInsertParagraph()
            },
            COMMAND_PRIORITY_LOW,
        ),
        editor.registerNodeTransform(ListItemNode, (node) => {
            const firstChild = node.getFirstChild();
            if (firstChild) {
                if ($isTextNode(firstChild)) {
                    const style = firstChild.getStyle();
                    const format = firstChild.getFormat();
                    if (node.getTextStyle() !== style) {
                        node.setTextStyle(style);
                    }
                    if (node.getTextFormat() !== format) {
                        node.setTextFormat(format);
                    }
                } else {

                    console.log('NO TEXTNODE')
                }
            } else {
                // If it's empty, check the selection
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) &&
                    (selection.style !== node.getTextStyle() ||
                        selection.format !== node.getTextFormat()) &&
                    selection.isCollapsed() &&
                    node.is(selection.anchor.getNode())
                ) {
                    node.setTextStyle(selection.style).setTextFormat(selection.format);
                }
            }
        }),
        editor.registerNodeTransform(TextNode, (node) => {
            const listItemParentNode = node.getParent();
            if (
                $isListItemNode(listItemParentNode) &&
                node.is(listItemParentNode.getFirstChild())
            ) {
                const style = node.getStyle();
                const format = node.getFormat();
                if (
                    style !== listItemParentNode.getTextStyle() ||
                    format !== listItemParentNode.getTextFormat()
                ) {
                    listItemParentNode.setTextStyle(style).setTextFormat(format);
                }
            }
        }),
    );
    return removeListener;
}

export interface ListPluginProps {
    /**
     * When `true`, enforces strict indentation rules for list items, ensuring consistent structure.
     * When `false` (default), indentation is more flexible.
     */
    hasStrictIndent?: boolean;
}

export function useList(editor: LexicalEditor): void {
    useEffect(() => {
        return registerListL(editor);
    }, [editor]);
}


export function registerListStrictIndentTransform(
    editor: LexicalEditor,
): () => void {
    const $formatListIndentStrict = (listItemNode: ListItemNode): void => {
        const listNode = listItemNode.getParent();
        if ($isListNode(listItemNode.getFirstChild()) || !$isListNode(listNode)) {
            return;
        }

        const startingListItemNode = $findMatchingParent(
            listItemNode,
            (node) =>
                $isListItemNode(node) &&
                $isListNode(node.getParent()) &&
                $isListItemNode(node.getPreviousSibling()),
        );

        if (startingListItemNode === null && listItemNode.getIndent() > 0) {
            listItemNode.setIndent(0);
        } else if ($isListItemNode(startingListItemNode)) {
            const prevListItemNode = startingListItemNode.getPreviousSibling();

            if ($isListItemNode(prevListItemNode)) {
                const endListItemNode = $findChildrenEndListItemNode(prevListItemNode);
                const endListNode = endListItemNode.getParent();

                if ($isListNode(endListNode)) {
                    const prevDepth = $getListDepth(endListNode);
                    const depth = $getListDepth(listNode);

                    if (prevDepth + 1 < depth) {
                        listItemNode.setIndent(prevDepth);
                    }
                }
            }
        }
    };
    function $findChildrenEndListItemNode(
        listItemNode: ListItemNode,
    ): ListItemNode {
        let current = listItemNode;
        let firstChild = current.getFirstChild();

        while ($isListNode(firstChild)) {
            const lastChild = firstChild.getLastChild();

            if ($isListItemNode(lastChild)) {
                current = lastChild;
                firstChild = current.getFirstChild();
            } else {
                break;
            }
        }

        return current;
    }

    const $processListWithStrictIndent = (listNode: ListNode): void => {
        const queue: ListNode[] = [listNode];

        while (queue.length > 0) {
            const node = queue.shift();
            if (!$isListNode(node)) {
                continue;
            }

            for (const child of node.getChildren()) {
                if ($isListItemNode(child)) {
                    $formatListIndentStrict(child);

                    const firstChild = child.getFirstChild();
                    if ($isListNode(firstChild)) {
                        queue.push(firstChild);
                    }
                }
            }
        }
    };

    return editor.registerNodeTransform(ListNode, $processListWithStrictIndent);
}

export function ListPlugin({ hasStrictIndent = false }: ListPluginProps): null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([ListNode, ListItemNode])) {
            throw new Error(
                'ListPlugin: ListNode and/or ListItemNode not registered on editor',
            );
        }
    }, [editor]);

    useEffect(() => {
        if (!hasStrictIndent) {
            return;
        }

        return registerListStrictIndentTransform(editor)
    }, [editor, hasStrictIndent]);

    useList(editor);

    return null;
}

export const LexicalListPlugin: PluginComponent<undefined> = () => {
    return <ListPlugin />
    //return <div>aoe</div>
}