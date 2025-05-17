import path from 'path';
import fs from 'fs';
import { getPayload } from 'payload';
import type { CollectionConfig, Field, Block, Payload, Tab } from 'payload';
import config from '@payload-config'; // Using the alias as you confirmed earlier

const outputPath = path.resolve('collection-schemas.json'); // Relative to CWD

// Function to recursively sanitize fields, removing non-serializable props
const sanitizeFields = (fields: Field[]): any[] => {
    return fields.map(field => {
        const sanitized: any = {};

        // *** START DEBUG LOGGING ***
        try {
            // Log the basic type and name (if available) of the field being processed
            const fieldIdentifier = `'${field.type}'${'name' in field ? ` (name: ${field.name})` : ''}`;
            console.log(`[DEBUG] Processing field: ${fieldIdentifier}`);

            // Specifically log when a 'tabs' type is encountered
            if (field.type === 'tabs') {
                console.log(`[DEBUG] --- Found Tabs Field ---`);
                // Attempt to log the structure of the tabs field's direct properties (excluding nested fields for brevity)
                const fieldShallowCopy = { ...field, tabs: `[${field.tabs?.length || 0} tabs]`, fields: undefined }; // Log tabs array length
                console.log(`[DEBUG] Original Tabs Field (Shallow):`, JSON.stringify(fieldShallowCopy, null, 2));
            }

            // Log when processing nested fields, indicating the parent type
            // Check for .fields (array, group, etc)
            const nestedFieldsSource = ('fields' in field && field.fields /* && field.type !== 'tabs' */) ? field.fields : [];
            if (nestedFieldsSource.length > 0) {
                console.log(`[DEBUG]   Recursively processing ${nestedFieldsSource.length} nested fields for: ${fieldIdentifier}`);
            }
        } catch (e: any) {
            console.warn(`[DEBUG] Error during logging for field type ${field?.type}:`, e?.message);
        }
        // *** END DEBUG LOGGING ***

        // Copy basic, known serializable properties
        if ('name' in field) sanitized.name = field.name; // Keep name if it exists (for named fields)
        sanitized.type = field.type; // Always keep type
        if ('label' in field && typeof field.label === 'string') sanitized.label = field.label; // Keep simple string labels
        if ('required' in field) sanitized.required = field.required;
        if ('localized' in field) sanitized.localized = field.localized;
        if ('unique' in field) sanitized.unique = field.unique;
        if ('index' in field) sanitized.index = field.index;
        // Only include defaultValue if it's simple (string, number, boolean, null)
        if ('defaultValue' in field && (typeof field.defaultValue !== 'object' || field.defaultValue === null)) {
            sanitized.defaultValue = field.defaultValue;
        }

        // Admin config - handle differently for layout vs regular fields
        if ('admin' in field && field.admin) {
            // For non-layout fields, copy specific simple properties if they exist
            if (!['tabs', 'row', 'collapsible', 'group', 'ui'].includes(field.type)) {
                sanitized.admin = {};
                // Check for property existence on field.admin before accessing
                if ('readOnly' in field.admin && typeof field.admin.readOnly === 'boolean') sanitized.admin.readOnly = field.admin.readOnly;
                if ('hidden' in field.admin && typeof field.admin.hidden === 'boolean') sanitized.admin.hidden = field.admin.hidden;
                if ('position' in field.admin && typeof field.admin.position === 'string') sanitized.admin.position = field.admin.position;
                if ('width' in field.admin && typeof field.admin.width === 'string') sanitized.admin.width = field.admin.width;
                if ('description' in field.admin && typeof field.admin.description === 'string') sanitized.admin.description = field.admin.description;
                // Skip placeholder/condition etc. as they can be functions or complex
            }
            // For layout fields, we don't copy these specific props onto the layout field itself,
            // but nested fields will be processed later.
        }

        // Type-specific properties
        if ((field.type === 'relationship' || field.type === 'upload') && 'relationTo' in field) {
            sanitized.relationTo = field.relationTo;
            if ('hasMany' in field) sanitized.hasMany = field.hasMany;
        }
        if (field.type === 'array') {
            if ('minRows' in field) sanitized.minRows = field.minRows;
            if ('maxRows' in field) sanitized.maxRows = field.maxRows;
        }
        if (field.type === 'number') {
            if ('min' in field) sanitized.min = field.min;
            if ('max' in field) sanitized.max = field.max;
            if ('hasMany' in field) sanitized.hasMany = field.hasMany; // Also applies to number
        }
        if (field.type === 'select' && 'options' in field) {
            // Only include options if they are simple value/label pairs or strings
            if (Array.isArray(field.options) && field.options.every(opt => typeof opt === 'string' || (typeof opt === 'object' && opt !== null && typeof opt.value === 'string' && typeof opt.label === 'string'))) {
                sanitized.options = field.options;
            }
        }

        // !!! Handle TABS field structure explicitly !!!
        if (field.type === 'tabs' && 'tabs' in field && Array.isArray(field.tabs)) {
            sanitized.tabs = field.tabs.map((tab: Tab) => {
                const sanitizedTab: any = {};
                // Copy tab label (exists on both NamedTab and UnnamedTab)
                if (tab.label) sanitizedTab.label = tab.label;
                // Copy name only if it exists (for NamedTab)
                if ('name' in tab && tab.name) sanitizedTab.name = tab.name;
                if (tab.description) sanitizedTab.description = tab.description; // Also copy description if present
                // Recursively sanitize fields within this tab
                sanitizedTab.fields = sanitizeFields(tab.fields);
                return sanitizedTab;
            });
            // We processed the nested fields within the tabs map, so clear sanitized.fields if it was wrongly populated earlier
            delete sanitized.fields; // Ensure .fields isn't duplicated
        }
        // !!! End TABS handling !!!

        // Recursively sanitize nested fields (for array, group, row, collapsible - NOT tabs)
        // Ensure this block doesn't run for field.type === 'tabs'
        else if ('fields' in field && Array.isArray(field.fields)) {
            sanitized.fields = sanitizeFields(field.fields); // Recursive call
        }

        // Recursively sanitize blocks
        if (field.type === 'blocks' && 'blocks' in field && Array.isArray(field.blocks)) {
            sanitized.blocks = field.blocks.map(block => ({
                slug: block.slug,
                // Add simple block labels if they exist
                ...(typeof block.labels?.singular === 'string' && { label_singular: block.labels.singular }),
                ...(typeof block.labels?.plural === 'string' && { label_plural: block.labels.plural }),
                fields: sanitizeFields(block.fields),
            }));
        }

        // *** START DEBUG LOGGING for sanitized output ***
        if (field.type === 'tabs') {
            try {
                console.log(`[DEBUG] Sanitized Tabs Field (before filter):`, JSON.stringify(sanitized, null, 2));
            } catch (e: any) {
                console.warn(`[DEBUG] Error logging sanitized tabs field:`, e?.message)
            }
        }
        // *** END DEBUG LOGGING for sanitized output ***

        // Return null for fields that are purely layout and have no serializable content after processing
        // UNLESS it's a known layout field type that we want to preserve for structure.
        if (!sanitized.name && !sanitized.admin && !sanitized.blocks && !sanitized.fields) {
            // Exception: keep UI fields and structural layout fields
            if (['ui', 'tabs', 'row', 'collapsible', 'group'].includes(field.type)) {
                // Ensure it at least has a type property before returning
                if (!sanitized.type) sanitized.type = field.type;
                return sanitized;
            }
            // Otherwise, it's likely an empty or fully non-serializable standard field
            return null;
        }

        return sanitized;
    }).filter(field => field !== null); // Remove null fields
};

// Function to sanitize the main collection config
const sanitizeCollection = (collection: CollectionConfig): any => {
    const sanitized: any = {
        slug: collection.slug,
    };

    // Copy simple, known serializable properties
    if (collection.labels) { // Handle plural/singular labels
        sanitized.labels = {};
        if (typeof collection.labels.singular === 'string') sanitized.labels.singular = collection.labels.singular;
        if (typeof collection.labels.plural === 'string') sanitized.labels.plural = collection.labels.plural;
    }
    if (collection.admin) { // Handle simple admin properties
        sanitized.admin = {};
        if (typeof collection.admin.useAsTitle === 'string') sanitized.admin.useAsTitle = collection.admin.useAsTitle;
        if (typeof collection.admin.description === 'string') sanitized.admin.description = collection.admin.description;
        if (Array.isArray(collection.admin.defaultColumns)) sanitized.admin.defaultColumns = collection.admin.defaultColumns;
        if (typeof collection.admin.group === 'string') sanitized.admin.group = collection.admin.group;
        if (typeof collection.admin.hidden === 'boolean') sanitized.admin.hidden = collection.admin.hidden;
        // Skip components, listSearchableFields etc.
    }
    if (collection.timestamps === true || collection.timestamps === false) sanitized.timestamps = collection.timestamps;
    if (collection.versions) sanitized.versions = collection.versions; // Versions config is usually serializable
    if (collection.auth) sanitized.auth = collection.auth; // Auth config is usually serializable boolean/object

    // Sanitize fields recursively
    sanitized.fields = sanitizeFields(collection.fields);

    return sanitized;
};


async function runExport() {
    // Initialize payload as potentially undefined
    let payload: Payload | undefined;
    try {
        console.log('Initializing Payload locally...');
        payload = await getPayload({ config }); // Use the imported config

        payload.logger.info('Payload initialized. Extracting and sanitizing collection schemas...');

        // Access the processed collections configuration
        const collections = payload.config.collections;

        if (!collections || collections.length === 0) {
            payload.logger.warn('No collections found in the configuration.');
            process.exit(0);
        }

        // Sanitize each collection configuration
        const sanitizedCollections = collections.map(sanitizeCollection);

        // Convert the sanitized array to JSON and write to file
        const jsonOutput = JSON.stringify(sanitizedCollections, null, 2);
        fs.writeFileSync(outputPath, jsonOutput, 'utf-8');

        payload.logger.info(`Sanitized collection schemas saved to: ${outputPath}`);
        process.exit(0); // Exit successfully

    } catch (error: any) {
        console.error('Error exporting schema:', error);
        if (payload && payload.logger) {
            payload.logger.error('Error exporting schema:', error);
        } else {
            console.error('Failed to initialize Payload or encountered an error during export:', error);
        }
        process.exit(1); // Exit with error code
    }
}

// Execute the script
runExport();