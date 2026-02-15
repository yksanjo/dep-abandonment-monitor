/**
 * Abandonment Monitor - Main Entry Point
 */

import { AbandonmentMonitor } from './monitor.js';

export { AbandonmentMonitor };

const isMain = process.argv[1]?.includes('index.js');
if (isMain) {
  console.log('Abandonment Monitor v1.0.0');
  console.log('Use: node src/cli.js <command>');
}
