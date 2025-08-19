
import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import path from 'path'
import sharp from 'sharp'

/**
 * Este hook se ejecuta después de que Payload genera los 'imageSizes' en memoria,
 * pero antes de que se guarden en la base de datos y se suban a S3.
 * Convierte ÚNICAMENTE los tamaños generados al formato WebP.
 */
export const convertSizesToWebP: CollectionBeforeChangeHook = async ({ req, data }) => {
    // Nos aseguramos de que haya un archivo y que sea una imagen
    if (req.file && req.file.mimetype.startsWith('image/')) {

        const { sizes } = data; // Metadatos de los tamaños (ej: { thumbnail: { filename: '...jpg' } })

        // Procesamos todas las conversiones en paralelo para mayor eficiencia
        await Promise.all(
            Object.keys(sizes).map(async (sizeKey) => {
                try {
                    // Los buffers de los archivos redimensionados están en `req.payloadUploadSizes`
                    const uploadSizes = req.payloadUploadSizes;
                    console.log(uploadSizes)
                    if (uploadSizes && uploadSizes[sizeKey]) {

                        // 1. Tomar el buffer del tamaño generado por Payload
                        const originalSizeBuffer = uploadSizes[sizeKey];

                        // 2. Convertir ese buffer a WebP con 'sharp'
                        const webpBuffer = await sharp(originalSizeBuffer)
                            .webp({ quality: 80 }) // Puedes ajustar la calidad de 1 a 100
                            .toBuffer();

                        // 3. Generar el nuevo nombre de archivo con la extensión .webp
                        const originalFilename = path.parse(sizes[sizeKey].filename).name;
                        const webpFilename = `${originalFilename}.webp`;

                        console.log(originalFilename)
                        console.log(webpFilename)

                        // 4. ACTUALIZAR EL BUFFER: Esto asegura que el adaptador de S3 suba el archivo WebP
                        //req.payloadUploadSizes![sizeKey] = webpBuffer;

                        // 5. ACTUALIZAR LOS METADATOS: Esto asegura que la base de datos guarde la info correcta
                        /*data.sizes[sizeKey] = {
                          ...data.sizes[sizeKey], // Mantenemos width y height
                          filename: webpFilename,
                          mimeType: 'image/webp',
                          filesize: webpBuffer.length,
                        };
                        */
                    }
                } catch (error) {
                    console.error(`Error convirtiendo el tamaño '${sizeKey}' a WebP:`, error);
                }
            })
        );
    }
    return data
}