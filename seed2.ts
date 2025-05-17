import path, { dirname } from 'path';
import { access, readFile } from 'fs/promises'; // Import promise-based functions
import { getPayload } from 'payload';
import config from '@payload-config';

const assetsDir = path.resolve('assets'); // Resolve assets dir relative to CWD

/**
 * Asynchronously reads an asset file into a Buffer.
 * Throws an error if the file doesn't exist or cannot be accessed.
 * @param filename - The name of the file within the assets directory.
 * @returns A Promise resolving to a Buffer containing the file data.
 */
const readAssetAsBuffer = async (filename: string): Promise<{ buffer: Buffer, filename: string }> => {
    const filePath = path.join(assetsDir, filename);
    console.log(`[readAssetAsBuffer] Attempting to access asset at: ${filePath}`);

    try {
        // Check if file exists and is accessible (async)
        await access(filePath); // Throws error if fails

        console.log(`[readAssetAsBuffer] Reading asset into buffer from: ${filePath}`);
        // Read file asynchronously
        const buffer = await readFile(filePath);
        return { buffer, filename };

    } catch (error: any) {
        // Log specific error details
        if (error.code === 'ENOENT') {
            console.error(`[readAssetAsBuffer] Asset file not found at path: ${filePath}`);
            console.error(`[readAssetAsBuffer] Assets directory resolved relative to CWD: ${assetsDir}`);
            throw new Error(`Asset file not found: ${filename}`);
        } else {
            console.error(`[readAssetAsBuffer] Error accessing or reading file ${filePath}:`, error);
            throw new Error(`Failed to read asset file ${filename}: ${error.message}`);
        }
    }
};


export const seed = async () => {
    const payload = await getPayload({ config })
    payload.logger.info(`— Seeding Test...`)

    payload.logger.info(`— Seeding Categories...`)
    const categories = await Promise.all(
        [
            payload.create({
                collection: 'tourCategory',
                data: {
                    name: 'Cultural',
                },
            }),
            payload.create({
                collection: 'tourCategory',
                data: {
                    name: 'Gastronómico',
                },
            }),

        ]
    )

    payload.logger.info(`— Categories seeded...`)



    payload.logger.info(`— Seeding Destinations...`)

    const [iconCusco, backgroundCusco] = await Promise.all([
        readAssetAsBuffer('cuscoFeature.png'),
        readAssetAsBuffer('cuscoBackground.png'),
    ])


    const [cuscoMedia, cuscoBackgroundMedia] = await Promise.all([
        payload.create({
            collection: 'media',
            data: {
                alt: 'Cusco',
            },
            file: {
                data: iconCusco.buffer,
                mimetype: 'image/png',
                name: iconCusco.filename,
                size: iconCusco.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Fondo Cusco',
            },
            file: {
                data: backgroundCusco.buffer,
                mimetype: 'image/png',
                name: backgroundCusco.filename,
                size: backgroundCusco.buffer.length,
            },
        }),
    ])
    const cuscoDoc = await Promise.all([
        payload.create({
            collection: 'destinations',
            data: {
                name: 'Cusco',
                imageDestination: cuscoMedia,
                backgroundDestination: cuscoBackgroundMedia,
            },
        }),
    ])
    const [iconIca, backgroundIca] = await Promise.all([
        readAssetAsBuffer('icaFeature.png'),
        readAssetAsBuffer('icaBackground.png'),
    ])
    const [icaMedia, icaBackgroundMedia] = await Promise.all([
        payload.create({
            collection: 'media',
            data: {
                alt: 'Ica',
            },
            file: {
                data: iconIca.buffer,
                mimetype: 'image/png',
                name: iconIca.filename,
                size: iconIca.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Fondo Ica',
            },
            file: {
                data: backgroundIca.buffer,
                mimetype: 'image/png',
                name: backgroundIca.filename,
                size: backgroundIca.buffer.length,
            },
        }),
    ])

    const icaDoc = await Promise.all([
        payload.create({
            collection: 'destinations',
            data: {
                name: 'Ica',
                imageDestination: icaMedia,
                backgroundDestination: icaBackgroundMedia,
            },
        }),
    ])

    const [iconPmaldonado] = await Promise.all([
        readAssetAsBuffer('pmaldonadoFeature.png'),
    ])
    const [pmaldonadoMedia, pmaldonadoBackgroundMedia] = await Promise.all([
        payload.create({
            collection: 'media',
            data: {
                alt: 'P Maldonado',
            },
            file: {
                data: iconPmaldonado.buffer,
                mimetype: 'image/png',
                name: iconPmaldonado.filename,
                size: iconPmaldonado.buffer.length,
            },
        }),
        payload.create({
            collection: 'media',
            data: {
                alt: 'Fondo Punta Maldonado',
            },
            file: {
                data: backgroundIca.buffer,
                mimetype: 'image/png',
                name: backgroundIca.filename,
                size: backgroundIca.buffer.length,
            },
        }),
    ])

    const pmaldonadoDoc = await Promise.all([
        payload.create({
            collection: 'destinations',
            data: {
                name: 'Punta Maldonado',
                imageDestination: pmaldonadoMedia,
                backgroundDestination: pmaldonadoBackgroundMedia,
            },
        }),
    ])

    payload.logger.info(`— Destinations seeded...`)

}

await seed()
