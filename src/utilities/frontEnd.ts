// Attempt to import Payload types. If this fails, we'll use fallback basic types.
import type { Condition as PayloadCondition } from 'payload';

// Fallback basic types in case the import fails or types are not found
type PayloadRichText = any[]; // Define PayloadRichText as a fallback since it couldn't be imported
type RichText = PayloadRichText | any[]; // Use Payload's (now fallback) or a generic array
type Condition = PayloadCondition | ((data: any, siblingData: any) => boolean); // Use Payload's or a generic function

// Define el nombre del campo booleano que controla esto
const OVERRIDE_FIELD_NAME = 'overrideDefaults';

// Define los argumentos que nuestro hook beforeChange espera
type ConditionalDefaultHookArgs = {
    siblingData: Record<string, any>; // Datos del mismo nivel del documento
    value: any; // Valor actual del campo
    // Podríamos añadir otros argumentos de FieldHook si fueran necesarios:
    // data?: Record<string, any>;
    // operation?: 'create' | 'update';
    // req?: any; // Idealmente PayloadRequest
    // originalDoc?: Record<string, any>;
};

// Interfaz para campos que pueden usar nuestra lógica de defaults condicionales
interface IConditionalField {
    name: string;
    type: string; // Es bueno tener el tipo de campo, aunque no se use directamente en la lógica actual
    label?: string | RichText; // El label del campo
    required?: boolean; // Si el campo es requerido
    hooks?: {
        beforeChange?: Array<(args: ConditionalDefaultHookArgs) => any | Promise<any>>;
        // Podríamos añadir otros tipos de hooks si es necesario (afterChange, afterRead, etc.)
        [key: string]: any; // Para permitir otros arrays de hooks
    };
    admin?: {
        condition?: Condition; // Condición de visibilidad en el Admin UI
        // Podríamos añadir otras propiedades admin (readOnly, description, etc.)
        [key: string]: any;
    };
    // Para permitir otras propiedades específicas del tipo de campo (ej: 'options' para select)
    [key: string]: any;
}

export const applyConditionalDefaults = (field: IConditionalField): IConditionalField => {
    // No aplicamos la lógica si el campo es requerido por sí mismo o si es el campo de control
    if (field.required || field.name === OVERRIDE_FIELD_NAME) {
        return field;
    }

    // Clonar el campo para no modificar el original directamente
    const modifiedField: IConditionalField = { ...field };

    // 1. Lógica para ocultar/mostrar el campo en la interfaz admin
    modifiedField.admin = {
        ...(modifiedField.admin || {}), // Mantener configuración admin existente
        condition: (data: any, siblingData: any) => {
            const overrideActive = siblingData && siblingData[OVERRIDE_FIELD_NAME];
            return !overrideActive; // Simplificado: oculta si overrideActive es true
        },
    };

    // 2. Lógica para establecer el valor por defecto (o limpiar el valor manual)
    //    mediante un hook beforeChange.
    const conditionalDefaultHook = ({ siblingData, value }: ConditionalDefaultHookArgs): any | Promise<any> => {
        const overrideActive = siblingData && siblingData[OVERRIDE_FIELD_NAME as keyof typeof siblingData];

        if (overrideActive) {
            // Si el override está activo, en lugar de limpiar el valor (undefined),
            // establecemos el valor por defecto a 'frontend'.
            return null;
        }

        // Si el override no está activo, devolvemos el valor que el usuario haya introducido manualmente.
        return value;
    };

    modifiedField.hooks = {
        ...(modifiedField.hooks || {}), // Mantener hooks existentes
        beforeChange: [
            ...(modifiedField.hooks?.beforeChange || []), // Mantener otros beforeChange hooks existentes
            conditionalDefaultHook,
        ],
    };

    return modifiedField;
};