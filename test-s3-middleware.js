import { S3 } from '@aws-sdk/client-s3';
const s3 = new S3({ region: 'us-east-1' });
s3.middlewareStack.add(
  (next, context) => async (args) => {
    if (context.commandName === 'PutObjectCommand') {
        if (!args.input.CacheControl) {
            args.input.CacheControl = 'public, max-age=31536000, immutable';
        }
    }
    return next(args);
  },
  {
    step: 'initialize',
    name: 'addCacheControl',
  }
);
console.log('middleware added');
