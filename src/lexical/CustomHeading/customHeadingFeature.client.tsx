'use client'

import { $isHeadingNode, type HeadingTagType } from '@payloadcms/richtext-lexical/lexical/rich-text'


import { $setBlocksType } from '@payloadcms/richtext-lexical/lexical/selection'

import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical'


import { H1Icon } from './Icons/H1'
import { H2Icon } from './Icons/H2'
import { H3Icon } from './Icons/H3'
import { H4Icon } from './Icons/H4'
import { H5Icon } from './Icons/H5'
import { H6Icon } from './Icons/H6'
import { createClientFeature, slashMenuBasicGroupWithItems, toolbarTextDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client'
import { HeadingFeatureProps, ToolbarGroup } from '@payloadcms/richtext-lexical'
import { MarkdownTransformer } from './markdownTransformer'
import { CustomHeadingNode, $isCustomHeadingNode, $createCustomHeadingNode } from './customHeadingFeature.node'
import { $isCustomListItemNode } from '../CustomList/customListItem.node'

const $setHeading = (headingSize: HeadingTagType) => {
  const selection = $getSelection()
  $setBlocksType(selection, () => $createCustomHeadingNode(headingSize))
}

const iconImports = {
  h1: H1Icon,
  h2: H2Icon,
  h3: H3Icon,
  h4: H4Icon,
  h5: H5Icon,
  h6: H6Icon,
}

export const HeadingFeatureClient = createClientFeature<HeadingFeatureProps>(({ props }) => {
  const { enabledHeadingSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] } = props

  const toolbarGroups: ToolbarGroup[] = [
    toolbarTextDropdownGroupWithItems(
      enabledHeadingSizes.map((headingSize, i) => {
        return {
          ChildComponent: iconImports[headingSize],
          isActive: ({ selection }) => {

            /*if (!$isRangeSelection(selection)) {
              return false
            }
            for (const node of selection.getNodes()) {
              if ($isCustomHeadingNode(node) && node.getTag() === headingSize) {
                continue
              }

              const parent = node.getParent()
              if ($isCustomHeadingNode(parent) && parent.getTag() === headingSize) {
                continue
              }

              return false
            }
            return true
            */
            if (!$isRangeSelection(selection)) {
              return false;
            }
            const anchorNode = selection.anchor.getNode();
            const element =
              anchorNode.getType() === 'element'
                ? anchorNode
                : anchorNode.getTopLevelElementOrThrow();

            // Caso 1: El elemento es directamente un Heading
            if ($isHeadingNode(element) || $isCustomHeadingNode(element)) {
              // Asegurémonos de que su padre NO es un item de lista para evitar doble activación
              return element.getTag() === headingSize && !$isCustomListItemNode(element.getParent());
            }

            // Caso 2: El elemento es un ListItem, revisamos si su hijo es el Heading
            if ($isCustomListItemNode(element)) {
              const firstChild = element.getFirstChild();
              if ($isHeadingNode(firstChild) || $isCustomHeadingNode(firstChild)) {
                return firstChild.getTag() === headingSize;
              }
            }

            return false;
          },
          key: headingSize,
          label: ({ i18n }) => {
            return i18n.t('lexical:heading:label', { headingLevel: headingSize.charAt(1) })
          },
          onSelect: ({ editor }) => {
            editor.update(() => {
              $setHeading(headingSize)
            })
          },
          order: i + 2,
        }
      }),
    ),
  ]

  return {
    markdownTransformers: [MarkdownTransformer(enabledHeadingSizes)],
    nodes: [CustomHeadingNode],
    sanitizedClientFeatureProps: props,
    slashMenu: {
      groups: enabledHeadingSizes?.length
        ? [
          slashMenuBasicGroupWithItems(
            enabledHeadingSizes.map((headingSize) => {
              return {
                Icon: iconImports[headingSize],
                key: `headingList-${headingSize.charAt(1)}`,
                keywords: ['heading', headingSize],
                label: ({ i18n }) => {
                  return i18n.t('lexical:heading:label', {
                    headingLevel: headingSize.charAt(1),
                  })
                },
                onSelect: ({ editor }) => {
                  editor.update(() => {
                    $setHeading(headingSize)
                  })
                },
              }
            }),
          ),
        ]
        : [],
    },
    toolbarFixed: {
      groups: enabledHeadingSizes?.length ? toolbarGroups : [],
    },
    toolbarInline: {
      groups: enabledHeadingSizes?.length ? toolbarGroups : [],
    },
  }
})