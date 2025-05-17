'use client'

import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import {
    createClientFeature,
} from '@payloadcms/richtext-lexical/client'
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
} from '@payloadcms/richtext-lexical/lexical'
import {
    $isListItemNode,
    ListItemNode,
} from '@payloadcms/richtext-lexical/lexical/list'
import {
    CustomListItemNode,
    $isCustomListItemNode,
    $createCustomListItemNode,
} from './customListFeature.node'
import { ListNode } from '@payloadcms/richtext-lexical/lexical/list'

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

    const setIcon = (type: 'check' | 'warning' | null) => {
        if (!selectedNodeKey) return;
        editor.update(() => {
            const node = $getNodeByKey(selectedNodeKey);

            if ($isCustomListItemNode(node)) {
                node.setIconType(type);
            } else if ($isListItemNode(node)) {
                const checked = node.getChecked();
                const value = node.getValue();
                const customNode = $createCustomListItemNode(type, value, checked);
                customNode.append(...node.getChildren());
                node.replace(customNode);
            }
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
            <button style={buttonStyle} onClick={() => setIcon('warning')} disabled={currentIconType === 'warning'}>⚠️ Set Warning</button>
            <button style={buttonStyle} onClick={() => setIcon(null)} disabled={!currentIconType}>❌ Clear Icon</button>
        </div>
    );
}

// --- Client Feature Definition ---
export const CustomListClientFeature = createClientFeature({
    nodes: [
        CustomListItemNode,
        ListNode,
    ],
    plugins: [
        {
            Component: CustomListItemToolbarPlugin,
            position: 'floatingAnchorElem',
        }
    ],
}) 