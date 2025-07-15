import * as migration_20250709_233506 from './20250709_233506';
import * as migration_20250710_180821 from './20250710_180821';
import * as migration_20250715_020552 from './20250715_020552';

export const migrations = [
  {
    up: migration_20250709_233506.up,
    down: migration_20250709_233506.down,
    name: '20250709_233506',
  },
  {
    up: migration_20250710_180821.up,
    down: migration_20250710_180821.down,
    name: '20250710_180821',
  },
  {
    up: migration_20250715_020552.up,
    down: migration_20250715_020552.down,
    name: '20250715_020552'
  },
];
