import { getPayload, RequiredDataFromCollectionSlug } from 'payload';
import config from '@payload-config';

const seed = async () => {
    const payload = await getPayload({ config });
    console.log("GAAAA")
}

await seed()
