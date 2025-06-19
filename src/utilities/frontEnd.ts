// Attempt to import Payload types. If this fails, we'll use fallback basic types.
/*import type { Condition as PayloadCondition } from 'payload';

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
};*/

// Attempt to import Payload types. If this fails, we'll use fallback basic types.
import type { Condition as PayloadCondition } from 'payload';

// Fallback basic types in case the import fails or types are not found
type PayloadRichText = any[]; // Define PayloadRichText as a fallback
type RichText = PayloadRichText | any[];
type Condition = PayloadCondition | ((data: any, siblingData: any) => boolean);

// Define el nombre del campo booleano que controla esto
const OVERRIDE_FIELD_NAME = 'overrideDefaults';

// Define los argumentos que nuestro hook beforeChange espera
type ConditionalDefaultHookArgs = {
    siblingData: Record<string, any>; // Datos del mismo nivel del documento
    value: any; // Valor actual del campo
};

// Interfaz para campos que pueden usar nuestra lógica.
// Ahora incluye la propiedad 'fields' para ser compatible con los grupos.
interface FieldWithOptions {
    name: string;
    type: string; // 'text', 'number', 'group', etc.
    label?: string | RichText;
    required?: boolean;
    fields?: FieldWithOptions[]; // << AÑADIDO: Para campos de tipo 'group'
    hooks?: {
        beforeChange?: Array<(args: ConditionalDefaultHookArgs) => any | Promise<any>>;
        [key: string]: any;
    };
    admin?: {
        condition?: Condition;
        [key: string]: any;
    };
    [key: string]: any;
}

/**
 * Aplica una lógica condicional a un campo o a un grupo de campos.
 * - Oculta el campo/grupo si 'overrideDefaults' es true.
 * - Limpia el valor del campo/grupo si 'overrideDefaults' es true.
 *
 * @param field - El campo o grupo a modificar.
 * @returns El campo o grupo modificado con la lógica condicional.
 */
export const applyConditionalDefaults = (field: FieldWithOptions): FieldWithOptions => {
    // No aplicamos la lógica si el campo es el propio interruptor de control
    if (field.name === OVERRIDE_FIELD_NAME) {
        return field;
    }

    // Clonar el campo para no modificar el objeto original
    const modifiedField: FieldWithOptions = { ...field };

    // 1. Lógica para ocultar/mostrar el campo/grupo en la interfaz de administración
    //    Esto se aplica tanto a campos individuales como a grupos completos.
    modifiedField.admin = {
        ...(modifiedField.admin || {}),
        condition: (data: any, siblingData: any) => {
            // Oculta el campo si el override está activo.
            // Si no hay siblingData, asumimos que no hay override.
            const overrideActive = siblingData && siblingData[OVERRIDE_FIELD_NAME];
            return !overrideActive;
        },
    };

    // 2. Lógica para establecer el valor por defecto (o limpiar el valor) usando un hook.
    const conditionalDefaultHook = ({ siblingData, value }: ConditionalDefaultHookArgs): any => {
        const overrideActive = siblingData && siblingData[OVERRIDE_FIELD_NAME];

        if (overrideActive) {
            // Si el override está activo, el valor se anula (se usará el default de la colección).
            // Devolver `null` limpia el valor del campo o del grupo entero.
            return null;
        }

        // Si el override no está activo, se conserva el valor que el usuario introdujo.
        return value;
    };

    modifiedField.hooks = {
        ...(modifiedField.hooks || {}),
        beforeChange: [
            ...(modifiedField.hooks?.beforeChange || []),
            conditionalDefaultHook,
        ],
    };

    // 3. Si el campo es un grupo, aplica esta misma lógica a todos sus campos hijos.
    //    Esta es la parte RECURSIVA.
    if (modifiedField.type === 'group' && modifiedField.fields) {
        modifiedField.fields = modifiedField.fields.map(applyConditionalDefaults);
    }

    return modifiedField;
};