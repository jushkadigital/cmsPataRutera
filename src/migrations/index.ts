import * as migration_20250525_205220 from './20250525_205220';

export const migrations = [
  {
    up: migration_20250525_205220.up,
    down: migration_20250525_205220.down,
    name: '20250525_205220'
  },
];
