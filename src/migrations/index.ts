import * as migration_20250709_233506 from './20250709_233506';
import * as migration_20250710_180821 from './20250710_180821';
import * as migration_20250715_020552 from './20250715_020552';
import * as migration_20250716_024204 from './20250716_024204';
import * as migration_20250805_222316 from './20250805_222316';
import * as migration_20250807_193306 from './20250807_193306';
import * as migration_20250807_193510 from './20250807_193510';

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
    name: '20250715_020552',
  },
  {
    up: migration_20250716_024204.up,
    down: migration_20250716_024204.down,
    name: '20250716_024204',
  },
  {
    up: migration_20250805_222316.up,
    down: migration_20250805_222316.down,
    name: '20250805_222316',
  },
  {
    up: migration_20250807_193306.up,
    down: migration_20250807_193306.down,
    name: '20250807_193306',
  },
  {
    up: migration_20250807_193510.up,
    down: migration_20250807_193510.down,
    name: '20250807_193510'
  },
];
