import { SlashMenuGroup, SlashMenuItem } from "@payloadcms/richtext-lexical"

export function slashMenuListGroupWithItems(items: SlashMenuItem[]): SlashMenuGroup {
    return {
        items,
        key: 'lists',
        label: ({ i18n }) => {
            return i18n.t('lexical:general:slashMenuListGroupLabel')
        },
    }
}