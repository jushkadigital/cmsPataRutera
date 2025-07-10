import * as migration_20250709_233506 from './20250709_233506';
import * as migration_20250710_180821 from './20250710_180821';

export const migrations = [
  {
    up: migration_20250709_233506.up,
    down: migration_20250709_233506.down,
    name: '20250709_233506',
  },
  {
    up: migration_20250710_180821.up,
    down: migration_20250710_180821.down,
    name: '20250710_180821'
  },
];
