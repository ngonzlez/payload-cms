import * as migration_20260627_192205 from './20260627_192205';

export const migrations = [
  {
    up: migration_20260627_192205.up,
    down: migration_20260627_192205.down,
    name: '20260627_192205'
  },
];
