'use client' // Obligatorio en Payload 3 (Next.js App Router)
import React, { useMemo } from 'react'
import { Select, useFormFields, useField, RowLabel } from '@payloadcms/ui'

// Tipado para los props que Payload inyecta en el componente de campo
import { Option, TextFieldClientProps } from 'payload'

export const DynamicMultiSelect: React.FC<TextFieldClientProps> = ({ path, field }) => {
  // 1. Obtenemos el valor actual y la función para cambiarlo desde el formulario
  const { value, setValue } = useField<any[]>({ path })

  // 2. Leemos los datos del array de definiciones (el primer array)
  // Nota: 'fieldDefinitions' debe coincidir con el 'name' de tu primer array

  // 3. Formateamos las opciones para el Select


  const options = useFormFields(([fields]) => {
    // 1. Obtenemos el array "padre" para saber cuántas filas existen
    const blockField = fields['bussiness.servicesSet']

    // Si no existe o no es un array, retornamos vacío
    if (!blockField || !Array.isArray(blockField.rows)) {
      return []
    }

    // 2. Recorremos las filas (rows) del array
    // 'blockField.value' es una lista de IDs de fila, no de tus datos.
    // Usamos el índice (index) para construir la ruta hacia el dato real.
    return blockField.rows!.reduce((acc: any[], row, index) => {
      // Construimos el PATH específico hacia el campo 'id' de ESA fila
      // Ejemplo: "fieldDefinitions.0.id"
      const idPath = `bussiness.servicesSet.${index}.id`
      const blockTypePath = `bussiness.servicesSet.${index}.blockType`
      const titlePath = `bussiness.servicesSet.${index}.title.titleText`

      // Buscamos el valor en el objeto gigante 'fields'
      const idValue = fields[idPath]?.value as string
      const blockTypeValue = fields[blockTypePath]?.value as string
      const titleValue = fields[titlePath]?.value as string

      // Solo añadimos la opción si el usuario escribió un ID
      acc.push({
        label: `(${blockTypeValue || 'N/A'}) ${titleValue} `,
        value: blockTypeValue + "-" + idValue, // Esto es lo que se guardará
      })

      return acc
    }, [])
  })


  const dataTimeSelected = useFormFields(([fields]) => {
    if (!value || !Array.isArray(value)) {
      return []
    }
    return (value as any).reduce((acc: any, row: any, index: any) => {
      // Construimos el PATH específico hacia el campo 'id' de ESA fila
      // Ejemplo: "fieldDefinitions..id"
      const idPath = `bussiness.servicesSet.${index}.id`
      const timePath = `bussiness.servicesSet.${index}.time`
      const pricePath = `bussiness.servicesSet.${index}.price`
      const quantityPath = `bussiness.servicesSet.${index}.quantity`

      // Buscamos el valor en el objeto gigante 'fields'
      const idValue = fields[idPath]?.value as string
      const timeValue = fields[timePath]?.value as string
      const priceValue = Number(fields[pricePath]?.value) as number
      const quantityValue = Number(fields[quantityPath]?.value) as number

      // Solo añadimos la opción si el usuario escribió un ID


      return { time: acc.time + timeValue, price: acc.price + priceValue * quantityValue }
    }, { time: 0, price: 0 })
  })

  return (
    <div style={{ marginBottom: '1rem' }}>
      {/* Usamos el label que viene de la configuración jjde la colección */}
      <Select
        // Propiedades requeridas por el componente Select de @payloadcms/ui
        options={options}
        value={value}
        onChange={
          (selectedOptions) => {
            if (!selectedOptions) {
              setValue([])
              return
            }

            // Si es multi, 'selectedOptions' es un array de objetos: [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}]
            // Pero nosotros queremos guardar solo strings: ['a', 'b']
            if (Array.isArray(selectedOptions)) {
              const idsOnly = selectedOptions
              setValue(idsOnly)
            }
            // Caso raro: si por alguna razón devuelve un solo objeto (no debería si es isMulti)
            else if (typeof selectedOptions === 'object' && 'value' in selectedOptions) {
              // @ts-ignore
              setValue([selectedOptions.value])
            }
          }
        }
        isMulti={true} // Para permitir las combinaciones (Block 1, Block 3...)
        isClearable={true}
      />
      <div>
        {dataTimeSelected.time}
      </div>
      <div>
        {dataTimeSelected.price}
      </div>
    </div>
  )
}

