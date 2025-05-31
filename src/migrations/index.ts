import * as migration_20250531_190132 from './20250531_190132';

export const migrations = [
  {
    up: migration_20250531_190132.up,
    down: migration_20250531_190132.down,
    name: '20250531_190132'
  },
];
