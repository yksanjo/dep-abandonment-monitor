import test from 'node:test';
import assert from 'node:assert/strict';
import { AbandonmentMonitor } from '../src/monitor.js';

test('monitor exposes scan method', () => {
  const monitor = new AbandonmentMonitor();
  assert.equal(typeof monitor.monitor, 'function');
});
