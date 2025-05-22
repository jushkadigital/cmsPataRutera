import * as migration_20250519_175336 from './20250519_175336';
import * as migration_20250522_210802 from './20250522_210802';

export const migrations = [
  {
    up: migration_20250519_175336.up,
    down: migration_20250519_175336.down,
    name: '20250519_175336',
  },
  {
    up: migration_20250522_210802.up,
    down: migration_20250522_210802.down,
    name: '20250522_210802'
  },
];
