/*import { ListNode } from "@payloadcms/richtext-lexical/lexical/list"
import { ElementTransformer } from "@payloadcms/richtext-lexical/lexical/markdown"

export const UNORDERED_LIST: ElementTransformer = {
  type: 'element',
  dependencies: [ListNode, ListItemNode],
  export: (node, exportChildren) => {
    return $isListNode(node) ? listExport(node, exportChildren, 0) : null
  },
  regExp: /^(\s*)[-*+]\s/,
  replace: listReplace('bullet'),
}
  */