import * as migration_20250617_220426 from './20250617_220426';

export const migrations = [
  {
    up: migration_20250617_220426.up,
    down: migration_20250617_220426.down,
    name: '20250617_220426'
  },
];
