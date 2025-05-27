import path, { dirname } from 'path';
import { access, readFile } from 'fs/promises'; // Import promise-based functions
import { getPayload, RequiredDataFromCollectionSlug } from 'payload';
import config from '@payload-config';
import type { Media, TourCategory, Destination } from '@/payload-types'
// Assuming 'assets' is relative to the Current Working Directory (CWD)
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
    const payload = await getPayload({ config });
    await payload.logger.info('Seeding data...');
    payload.logger.info(`— Creating admin user...`)
    // Create admin user
    const admin = await payload.create({
        collection: 'users',
        data: {
            email: 'urgosxd@gmail.com',
            password: '123',
            roles: ['admin'],
        },
    })
}