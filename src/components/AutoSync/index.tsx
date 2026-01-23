'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useFormFields, RowLabel, useField } from '@payloadcms/ui'

// Define aquí tu endpoint
const ENDPOINT_URL = 'https://api.tu-dominio.com/webhook-sync'

export const AutoSync: React.FC = () => {
  // Estado para la UI
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [lastSync, setLastSync] = useState<string | null>(null)

  // Usamos una referencia para saber si ya hay una petición en vuelo
  const isSyncingRef = useRef(false)

  // OBTENER TODOS LOS DATOS DEL FORMULARIO
  // Nota: Obtenemos 'fields' completo. Si solo quieres campos específicos, ajusta el selector.
  function getSanitizedData(obj: any) {
    const max = obj['bussiness.servicesSet']
    delete obj['bussiness.servicesSet']
    const finalServices = []
    for (let index = 0; index < max; index++) {
      finalServices.push({})
    }
    Object.entries(obj).forEach(([key, value]) => {
      const index = key.split(".")[2]
      const indexName = key.split(".").at(-1)
      console.log(index)
      console.log(indexName)
      finalServices[Number(index)][indexName] = value
    })

    return finalServices

  }

  const getId = useField({ path: 'domainTourId' })



  const allFormData = useFormFields(([fields]) => {
    // Transformamos el objeto complejo de Payload a un JSON simple key:value
    const data: Record<string, any> = {}
    Object.keys(fields).forEach((key) => {
      if (key.startsWith("bussiness"))
        data[key] = fields[key]!.value
    })

    const dataF2 = {}
    Object.entries(data).filter(([key, value]) => {
      if (value !== undefined) {
        dataF2[key] = value
      }
    })

    const dataServices = Object.entries(dataF2).filter(([key]) => key.includes("bussiness.servicesSet"))
    const dataF3 = Object.fromEntries(dataServices)
    const dataF4 = getSanitizedData(dataF3)
    const agrupadoData = Object.groupBy(dataF4, (item) => item.blockType)
    return agrupadoData
  })

  // Ref para tener siempre la data fresca dentro del setInterval sin reiniciar el timer
  const dataRef = useRef(allFormData)
  useEffect(() => {
    dataRef.current = allFormData
  }, [allFormData])

  // EL BUCLE DE 5 SEGUNDOS
  useEffect(() => {
    const intervalId = setInterval(async () => {
      // 1. Evitar peticiones simultáneas si la red está lenta
      if (isSyncingRef.current) return

      // 2. Iniciar proceso
      isSyncingRef.current = true
      setStatus('loading')

      try {
        const payload = dataRef.current

        for (const nombre in payload) {
          switch (nombre) {
            case "svticket": {

              const promesasTicket = payload[nombre].map(async (ele) => {
                const response = await fetch(`http://172.17.0.1:8081/api/catalog/tours/${getId.value}/services`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    "serviceType": "TICKET",
                    "serviceName": ele['titleText'],
                    "basePrice": Number(ele['price']),
                    "currency": "USD",
                    "quantity": Number(ele['quantity']),
                    "isMandatory": true,
                    "durationHours": Number(ele['time'])
                  }),
                })

                if (!response.ok) throw new Error('Error en endpoint')

              })

              const resultados = await Promise.all(promesasTicket);
              console.log(resultados);

            }

              // Lógica especial para el administrador
              break;
            case "svfood": {
              const promesasFood = payload[nombre].map(async (ele) => {
                const response = await fetch(`http://172.17.0.1:8081/api/catalog/tours/${getId.value}/services`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    "serviceType": "FOOD",
                    "serviceName": ele['titleText'],
                    "basePrice": Number(ele['price']),
                    "currency": "USD",
                    "quantity": Number(ele['quantity']),
                    "isMandatory": true,
                    "durationHours": Number(ele['time'])
                  }),
                })

                if (!response.ok) throw new Error('Error en endpoint')

              })

              const resultados = await Promise.all(promesasFood);
              console.log(resultados);

            }

              break;
            default:
            // Lógica general
          }
        }
        // 3. Enviar el POST
        /*const response = await fetch(ENDPOINT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error('Error en endpoint')
          */
        // 4. Éxito
        setStatus('success')
        setLastSync(new Date().toLocaleTimeString())
      } catch (error) {
        console.error('AutoSync Error:', error)
        setStatus('error')
      } finally {
        isSyncingRef.current = false
      }
    }, 5000) // 5000ms = 5 segundos

    // Limpieza al desmontar
    return () => clearInterval(intervalId)
  }, [])

  // --- RENDERIZADO DE LA UI ---

  // Colores según estado
  const getStatusColor = () => {
    switch (status) {
      case 'loading': return '#eab308' // Amarillo
      case 'success': return '#22c55e' // Verde
      case 'error': return '#ef4444'   // Rojo
      default: return '#64748b'        // Gris
    }
  }

  return (
    <div style={{
      padding: '10px 15px',
      border: `1px solid ${getStatusColor()}`,
      borderRadius: '6px',
      backgroundColor: 'var(--theme-elevation-50)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Círculo indicador */}
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: getStatusColor(),
          boxShadow: status === 'loading' ? `0 0 8px ${getStatusColor()}` : 'none',
          transition: 'background-color 0.3s'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', color: 'var(--theme-text)' }}>
            Sincronización Externa
          </span>
          <span style={{ fontSize: '11px', color: '#888' }}>
            {status === 'loading' && 'Sincronizando...'}
            {status === 'success' && `Sincronizado: ${lastSync}`}
            {status === 'error' && 'Error de conexión'}
            {status === 'idle' && 'En espera...'}
          </span>
        </div>
      </div>

      {/* Botón opcional para forzar envío manual */}
      {status === 'error' && (
        <button
          type="button"
          onClick={() => setStatus('idle')} // Esto reseteará visualmente, el intervalo reintentará
          style={{
            fontSize: '10px',
            padding: '4px 8px',
            cursor: 'pointer',
            border: 'none',
            background: 'var(--theme-elevation-200)',
            color: 'var(--theme-text)'
          }}>
          Reintentar
        </button>
      )}
    </div>
  )
}
