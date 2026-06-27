import * as migration_20260627_192205 from './20260627_192205';
import * as migration_20260627_194757 from './20260627_194757';
import * as migration_20260627_202607 from './20260627_202607';

export const migrations = [
  {
    up: migration_20260627_192205.up,
    down: migration_20260627_192205.down,
    name: '20260627_192205',
  },
  {
    up: migration_20260627_194757.up,
    down: migration_20260627_194757.down,
    name: '20260627_194757',
  },
  {
    up: migration_20260627_202607.up,
    down: migration_20260627_202607.down,
    name: '20260627_202607'
  },
];
