// src/plugins/webp-support.ts
import { CollectionAfterChangeHook, CollectionAfterDeleteHook, Plugin } from 'payload';
import path from 'path';
import fs from 'fs/promises'; // Usamos la versión de promesas de fs
import sharp from 'sharp';
import { Config } from 'payload';


// Opciones que nuestro plugin puede recibir
interface PluginOptions {
    /** Calidad de la imagen WebP (1-100) */
    quality?: number;
}

// La función principal del plugin
export const webpSupport = (pluginOptions: PluginOptions = {}): Plugin => (incomingConfig) => {
    const { quality = 80 } = pluginOptions; // Calidad por defecto es 80

    // --- HOOK AFTERCHANGE: Se ejecuta después de subir una imagen ---
    const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req, operation, collection }) => {
        // 1. Solo ejecutar en la creación de un nuevo documento
        if (operation !== 'create' || !collection.upload) {
            return doc;
        }

        // 2. Prevenir bucles infinitos. Si el campo 'webp' ya fue procesado, no hagas nada.
        if ((doc as any).webp) {
            return doc;
        }

        try {
            const staticDir = collection.upload.staticDir;
            if (!staticDir) return doc; // Salir si no hay directorio estático

            const mediaDir = path.resolve(process.cwd(), staticDir);
            const webpData: { [key: string]: { filename: string; url?: string } } = {};

            // 4. Procesar la imagen original y cada uno de los 'imageSizes'
            const filesToProcess = [
                { name: 'original', data: doc as any },
                ...Object.entries(((doc as any).sizes || {})).map(([name, data]) => ({ name, data })),
            ];

            for (const file of filesToProcess) {
                if (!file.data?.filename) continue;

                const originalFilePath = path.join(mediaDir, file.data.filename);
                const parsedPath = path.parse(file.data.filename);
                const webpFileName = `${parsedPath.name}.webp`;
                const webpFilePath = path.join(mediaDir, webpFileName);

                // Verificar que el archivo original existe
                try {
                    await fs.access(originalFilePath);
                } catch (e) {
                    req.payload.logger.error(`Archivo original no encontrado en ${originalFilePath}, saltando WebP.`);
                    continue;
                }

                // 5. Usar Sharp para la conversión
                await sharp(originalFilePath).webp({ quality }).toFile(webpFilePath);

                // Guardar la información del archivo WebP
                webpData[file.name] = {
                    filename: webpFileName,
                    url: file.data.url ? `${path.dirname(file.data.url)}/${webpFileName}` : undefined,
                };
            }

            // 6. Actualizar el documento en la base de datos
            if (Object.keys(webpData).length > 0) {
                await (req.payload.update as any)({
                    collection: collection.slug,
                    id: (doc as any).id,
                    data: { webp: webpData } as any,
                    depth: 0, // Evita que se disparen otros hooks
                });
            }
        } catch (err: any) {
            req.payload.logger.error(`Error al generar WebP para la imagen ${(doc as any).id}: ${err.message}`);
        }

        return doc;
    };

    // --- HOOK AFTERDELETE: Se ejecuta después de borrar una imagen ---
    const afterDeleteHook: CollectionAfterDeleteHook = async ({ doc, collection }) => {
        if (!collection.upload || !(doc as any).webp) return;

        try {
            const staticDir = collection.upload.staticDir;
            if (!staticDir) return;

            const mediaDir = path.resolve(process.cwd(), staticDir);

            const webpFiles = Object.values((doc as any).webp as { [key: string]: { filename: string } })
                .map(size => size.filename)
                .filter(Boolean);

            for (const filename of webpFiles) {
                const filePath = path.join(mediaDir, filename);
                try {
                    await fs.unlink(filePath); // Borra el archivo
                } catch (e: any) {
                    // Ignora si el archivo no existe, pero loguea otros errores
                    if (e.code !== 'ENOENT') {
                        console.error(`Error al borrar el archivo WebP ${filePath}:`, e);
                    }
                }
            }
        } catch (err: any) {
            console.error(`Error en el hook afterDelete de WebP: ${err.message}`);
        }
    };


    // --- MODIFICAR LA CONFIGURACIÓN DE PAYLOAD ---
    const config: Config = {
        ...incomingConfig,
        collections: (incomingConfig.collections || []).map((collection) => {
            // Aplicar solo a colecciones que tengan 'upload' habilitado
            if (collection.upload) {
                return {
                    ...collection,
                    // Añadir el campo 'webp' a la colección automáticamente
                    fields: [
                        ...collection.fields,
                        {
                            name: 'webp',
                            type: 'json',
                            label: 'WebP Versions',
                            admin: {
                                readOnly: true,
                                description: 'Versiones WebP generadas automáticamente al subir la imagen.',
                                condition: (data) => (data as any).webp, // Solo muestra el campo si tiene datos
                            },
                        },
                    ],
                    // Inyectar los hooks
                    hooks: {
                        ...collection.hooks,
                        afterChange: [...(collection.hooks?.afterChange || []), afterChangeHook],
                        afterDelete: [...(collection.hooks?.afterDelete || []), afterDeleteHook],
                    },
                };
            }
            return collection;
        }),
    };

    return config;
};