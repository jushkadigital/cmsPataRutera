import * as migration_20250709_233506 from './20250709_233506';
import * as migration_20250710_180821 from './20250710_180821';
import * as migration_20250715_020552 from './20250715_020552';
import * as migration_20250716_024204 from './20250716_024204';
import * as migration_20250805_222316 from './20250805_222316';
import * as migration_20250807_193306 from './20250807_193306';
import * as migration_20250807_193510 from './20250807_193510';
import * as migration_20250825_194647 from './20250825_194647';
import * as migration_20250825_211022 from './20250825_211022';
import * as migration_20250825_211103 from './20250825_211103';
import * as migration_20250826_212145 from './20250826_212145';
import * as migration_20250827_143102 from './20250827_143102';
import * as migration_20250827_154647 from './20250827_154647';

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
    name: '20250807_193510',
  },
  {
    up: migration_20250825_194647.up,
    down: migration_20250825_194647.down,
    name: '20250825_194647',
  },
  {
    up: migration_20250825_211022.up,
    down: migration_20250825_211022.down,
    name: '20250825_211022',
  },
  {
    up: migration_20250825_211103.up,
    down: migration_20250825_211103.down,
    name: '20250825_211103',
  },
  {
    up: migration_20250826_212145.up,
    down: migration_20250826_212145.down,
    name: '20250826_212145',
  },
  {
    up: migration_20250827_143102.up,
    down: migration_20250827_143102.down,
    name: '20250827_143102',
  },
  {
    up: migration_20250827_154647.up,
    down: migration_20250827_154647.down,
    name: '20250827_154647'
  },
];
