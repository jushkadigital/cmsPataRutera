'use client'

import { FormSubmit, useConfig, useDocumentInfo, useForm, useFormModified, useLocale, useOperation, useTranslation } from '@payloadcms/ui'
import { useCallback } from 'react'

type ValidatedPublishButtonProps = {
  label?: string
}

export const ValidatedPublishButton = ({ label }: ValidatedPublishButtonProps) => {
  const {
    collectionSlug,
    globalSlug,
    hasPublishedDoc,
    hasPublishPermission,
    id,
    unpublishedVersionCount,
    uploadStatus,
  } = useDocumentInfo()
  const { config } = useConfig()
  const { code: localeCode } = useLocale()
  const operation = useOperation()
  const modified = useFormModified()
  const { submit } = useForm()
  const { t } = useTranslation()

  const hasNewerVersions = unpublishedVersionCount > 0
  const canPublish = hasPublishPermission && (modified || hasNewerVersions || !hasPublishedDoc) && uploadStatus !== 'uploading'
  const disabled = operation === 'update' ? !canPublish : !hasPublishPermission || uploadStatus === 'uploading'

  const publish = useCallback(() => {
    if (disabled) {
      return
    }

    const search = `?locale=${localeCode}&depth=0&fallback-locale=null&draft=true`
    let action: string | undefined
    let method: 'PATCH' | 'POST' = 'POST'

    if (collectionSlug) {
      action = `${config.serverURL}${config.routes.api}/${collectionSlug}${id ? `/${id}` : ''}${search}`

      if (id) {
        method = 'PATCH'
      }
    }

    if (globalSlug) {
      action = `${config.serverURL}${config.routes.api}/globals/${globalSlug}${search}`
    }

    if (!action) {
      return
    }

    void submit({
      action,
      method,
      overrides: {
        _status: 'published',
      },
    })
  }, [collectionSlug, config.routes.api, config.serverURL, disabled, globalSlug, id, localeCode, submit])

  return (
    <FormSubmit className="doc-controls__publish" disabled={disabled} onClick={publish}>
      {label ?? t('version:publishChanges')}
    </FormSubmit>
  )
}
