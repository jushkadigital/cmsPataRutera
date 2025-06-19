import * as migration_20250619_162803 from './20250619_162803';
import * as migration_20250619_204803 from './20250619_204803';

export const migrations = [
  {
    up: migration_20250619_162803.up,
    down: migration_20250619_162803.down,
    name: '20250619_162803',
  },
  {
    up: migration_20250619_204803.up,
    down: migration_20250619_204803.down,
    name: '20250619_204803'
  },
];
