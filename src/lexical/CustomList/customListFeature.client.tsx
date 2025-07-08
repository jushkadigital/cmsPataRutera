'use client'

import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'

import {
    useLexicalComposerContext
} from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'


// Import Node types and check functions
import {
    $getSelection, $isRangeSelection, $isNodeSelection, $getNodeByKey,
    COMMAND_PRIORITY_LOW,
    type EditorState,
    type LexicalEditor,
    $applyNodeReplacement,
    $createRangeSelection,
    $setSelection,
    $createTextNode,
} from '@payloadcms/richtext-lexical/lexical'
import {
    $isListItemNode,
    $isListNode,
    INSERT_UNORDERED_LIST_COMMAND,
    ListItemNode,
} from '@payloadcms/richtext-lexical/lexical/list'
import {
    CustomListItemNode,
    $isCustomListItemNode,
    $createCustomListItemNode,
    IconType,
} from './customListItem.node'
import { ListNode } from '@payloadcms/richtext-lexical/lexical/list'
import { i18n } from './i18n'
import { createClientFeature, slashMenuBasicGroupWithItems, toolbarTextDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client'
import { slashMenuListGroupWithItems } from './shared/slashMenuListGroup'
import { CustomIcon } from './Icon/customIcon'
import { ToolbarGroup } from '@payloadcms/richtext-lexical'
import { $createHeadingNode, $isHeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text'
import { LexicalListPlugin } from './plugin'

// Floating Toolbar Plugin Component
function CustomListItemToolbarPlugin(): React.JSX.Element | null {
    const [editor] = useLexicalComposerContext();
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
    const [isListItemSelected, setIsListItemSelected] = useState<boolean>(false);
    const [currentIconType, setCurrentIconType] = useState<string | null | undefined>(null);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        let nodeKey: string | null = null;
        let iconType: string | null | undefined = null;
        let isListItemSelected = false;

        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            const parent = anchorNode.getParent();

            let targetNode: ListItemNode | CustomListItemNode | null = null;

            if ($isCustomListItemNode(anchorNode)) {
                targetNode = anchorNode;
            } else if ($isCustomListItemNode(parent)) {
                targetNode = parent;
            } else if ($isListItemNode(anchorNode)) {
                targetNode = anchorNode;
            } else if ($isListItemNode(parent)) {
                targetNode = parent;
            }

            if (targetNode) {
                nodeKey = targetNode.getKey();
                isListItemSelected = true;
                if ($isCustomListItemNode(targetNode)) {
                    iconType = targetNode.getIconType();
                }
            }

        } else if ($isNodeSelection(selection)) {
            const nodes = selection.getNodes();
            if (nodes.length === 1) {
                const selectedNode = nodes[0];
                if ($isCustomListItemNode(selectedNode)) {
                    nodeKey = selectedNode.getKey();
                    iconType = selectedNode.getIconType();
                    isListItemSelected = true;
                } else if ($isListItemNode(selectedNode)) {
                    nodeKey = selectedNode.getKey();
                    isListItemSelected = true;
                }
            }
        }
        setSelectedNodeKey(nodeKey);
        setIsListItemSelected(isListItemSelected);
        setCurrentIconType(iconType);
    }, [editor]);

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }: { editorState: EditorState }) => {
            editorState.read(() => {
                updateToolbar();
            });
        });
    }, [editor, updateToolbar]);

    const setIcon = (type: IconType) => {
        if (!selectedNodeKey) return;
        editor.update(() => {
            const node = $getNodeByKey(selectedNodeKey);

            console.log(node)

            if ($isCustomListItemNode(node)) {
                node.setIconType(type);
                const content = node.getChildren();


            } else if ($isListItemNode(node)) {
            }

            // --- INICIO DE LA CORRECCIÓN ---



            // --- FIN DE LA CORRECCIÓN ---
        });
    };

    if (!isListItemSelected) {
        return null;
    }

    const buttonStyle: React.CSSProperties = {
        margin: '0 5px',
        padding: '5px 10px',
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    return (
        <div style={{ marginTop: '5px', borderTop: '1px solid #eee', paddingTop: '5px' }}>
            <button style={buttonStyle} onClick={() => setIcon('check')} disabled={currentIconType === 'check'}>✅ Set Check</button>
            <button style={buttonStyle} onClick={() => setIcon('warning')} disabled={currentIconType === 'nocheck'}>❌ Set Warning</button>
            <button style={buttonStyle} onClick={() => setIcon('location')} disabled={currentIconType === 'location'}>📍 Set Location</button>
            <button style={buttonStyle} onClick={() => setIcon('circle')} disabled={currentIconType === 'circle'}>🔵Set Location</button>
            <button style={buttonStyle} onClick={() => setIcon(null)} disabled={!currentIconType}> Clear Icon</button>
        </div>
    );
}

const toolbarGroups: ToolbarGroup[] = [
    toolbarTextDropdownGroupWithItems([
        {
            ChildComponent: CustomIcon,
            isActive: ({ selection }) => {
                if (!$isRangeSelection(selection)) {
                    return false
                }
                for (const node of selection.getNodes()) {
                    if ($isHeadingNode(node)) {
                        console.log('IS NODE')
                    }

                    if ($isListNode(node) && node.getListType() === 'bullet') {
                        continue
                    }

                    const parent = node.getParent()

                    if ($isListNode(parent) && parent.getListType() === 'bullet') {
                        continue
                    }


                    const parentParent = parent?.getParent()
                    // Example scenario: Node = textNode, parent = listItemNode, parentParent = listNode
                    if ($isListNode(parentParent) && parentParent.getListType() === 'bullet') {
                        continue
                    }

                    return false
                }
                return true
            },
            key: 'unorderedList',
            label: ({ i18n }) => {
                return i18n.t('lexical:unorderedList:label')
            },
            onSelect: ({ editor }) => {
                editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
            },
            order: 11,
        },
    ]),
]


// --- Client Feature Definition ---
export const CustomListClientFeature = createClientFeature({
    nodes: [
        ListItemNode,
        ListNode,
        CustomListItemNode,
        {
            replace: ListItemNode,
            with: (node: ListItemNode) => {
                return $createCustomListItemNode(null, node.getValue(), node.getChecked());
            },
            withKlass: CustomListItemNode,
        },
    ],
    plugins: [
        {
            Component: CustomListItemToolbarPlugin,
            position: 'floatingAnchorElem',
        },
        {
            Component: LexicalListPlugin,
            position: 'normal',
        }
    ],
    slashMenu: {
        groups: [
            slashMenuListGroupWithItems([
                {
                    Icon: CustomIcon,
                    key: 'unorderedList',
                    keywords: ['unordered list', 'ul'],
                    label: ({ i18n }) => {
                        return i18n.t('lexical:unorderedList:label')
                    },
                    onSelect: ({ editor }) => {
                        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
                    },
                },
            ]),
        ],
    },
    toolbarFixed: {
        groups: toolbarGroups,
    },
    toolbarInline: {
        groups: toolbarGroups,
    },
}) 