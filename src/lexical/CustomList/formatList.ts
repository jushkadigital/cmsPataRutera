import { $createParagraphNode, $getSelection, $isRangeSelection, $isRootOrShadowRoot, LexicalNode, ParagraphNode } from "@payloadcms/richtext-lexical/lexical";
import { $createListItemNode, $createListNode, $isListItemNode, $isListNode, ListItemNode, ListNode } from "@payloadcms/richtext-lexical/lexical/list";


export function $removeHighestEmptyListParent(
    sublist: ListItemNode | ListNode,
) {
    // Nodes may be repeatedly indented, to create deeply nested lists that each
    // contain just one bullet.
    // Our goal is to remove these (empty) deeply nested lists. The easiest
    // way to do that is crawl back up the tree until we find a node that has siblings
    // (e.g. is actually part of the list contents) and delete that, or delete
    // the root of the list (if no list nodes have siblings.)
    let emptyListPtr = sublist;

    while (
        emptyListPtr.getNextSibling() == null &&
        emptyListPtr.getPreviousSibling() == null
    ) {
        const parent = emptyListPtr.getParent();

        if (parent == null || !($isListItemNode(parent) || $isListNode(parent))) {
            break;
        }

        emptyListPtr = parent;
    }

    emptyListPtr.remove();
}

export default function invariant(
    cond?: boolean,
    message?: string,
    ...args: string[]
): asserts cond {
    if (cond) {
        return;
    }

    throw new Error(
        'Internal Lexical error: invariant() is meant to be replaced at compile ' +
        'time. There is no runtime version. Error: ' +
        message,
    );
}

export function $getTopListNode(listItem: LexicalNode): ListNode {
    let list = listItem.getParent<ListNode>();

    if (!$isListNode(list)) {
        invariant(false, 'A ListItemNode must have a ListNode for a parent.');
    }

    let parent: ListNode | null = list;

    while (parent !== null) {
        parent = parent.getParent();

        if ($isListNode(parent)) {
            list = parent;
        }
    }

    return list;
}

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

    invariant(
        $isListNode(parent),
        'A ListItemNode must have a ListNode for a parent.',
    );

    const grandparent = parent.getParent();

    let replacementNode: ParagraphNode | ListItemNode;

    if ($isRootOrShadowRoot(grandparent)) {
        replacementNode = $createParagraphNode();
        topListNode.insertAfter(replacementNode);
    } else if ($isListItemNode(grandparent)) {
        replacementNode = $createListItemNode();
        grandparent.insertAfter(replacementNode);
    } else {
        return false;
    }
    replacementNode
        .setTextStyle(selection.style)
        .setTextFormat(selection.format)
        .select();

    const nextSiblings = anchor.getNextSiblings();

    if (nextSiblings.length > 0) {
        const newList = $createListNode(parent!.getListType());
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