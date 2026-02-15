/**
 * Abandonment Monitor CLI
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { monitor } from './monitor.js';

const red = chalk.red;
const green = chalk.green;
const yellow = chalk.yellow;
const blue = chalk.blue;
const bold = chalk.bold;
const orange = chalk.hex('#f97316');

const program = new Command();

program
  .name('dep-abandonment-monitor')
  .description('Detect abandoned and unmaintained dependencies')
  .version('1.0.0');

program
  .command('scan')
  .description('Scan for abandoned packages')
  .option('-p, --path <path>', 'Workspace path', process.cwd())
  .action(async (options) => {
    const spinner = ora('Scanning for abandoned packages...').start();
    
    try {
      const results = await monitor({ workspacePath: options.path });
      spinner.succeed('Scan complete!');
      
      console.log('\n' + '='.repeat(60));
      console.log(bold('🟡 ABANDONMENT MONITOR SUMMARY'));
      console.log('='.repeat(60));
      console.log(`Total Dependencies:   ${results.summary.totalScanned}`);
      console.log(`Abandoned/Deprecated: ${results.summary.abandonedFound + results.summary.deprecatedFound}`);
      console.log(`In Maintenance:       ${results.summary.maintenanceFound}`);
      console.log('='.repeat(60));
      
      if (results.abandoned.length > 0) {
        console.log(bold('\n🔴 ABANDONED PACKAGES:\n'));
        
        for (const a of results.abandoned.slice(0, 10)) {
          console.log(red(`🔴 ${a.package}@${a.version}`));
          console.log(`   Reason: ${a.reason}`);
          console.log(`   Last Update: ${a.lastUpdate}`);
          console.log(`   Alternatives: ${a.alternatives.join(', ')}`);
          console.log('');
        }
      }
      
      if (results.deprecated.length > 0) {
        console.log(bold('\n🟠 DEPRECATED PACKAGES:\n'));
        
        for (const d of results.deprecated.slice(0, 10)) {
          console.log(orange(`🟠 ${d.package}@${d.version}`));
          console.log(`   Reason: ${d.reason}`);
          console.log(`   Alternatives: ${d.alternatives.join(', ')}`);
          console.log('');
        }
      }
      
      if (results.maintenance.length > 0) {
        console.log(bold('\n🟡 MAINTENANCE MODE PACKAGES:\n'));
        
        for (const m of results.maintenance.slice(0, 10)) {
          console.log(yellow(`🟡 ${m.package}@${m.version}`));
          console.log(`   Reason: ${m.reason}`);
          console.log(`   Alternatives: ${m.alternatives.join(', ')}`);
          console.log('');
        }
      }
      
      if (results.abandoned.length === 0 && results.deprecated.length === 0 && results.maintenance.length === 0) {
        console.log(green('\n✅ No abandoned packages found!'));
      }
      
    } catch (error) {
      spinner.fail('Scan failed!');
      console.error(red('Error:'), error.message);
    }
  });

program.parse();
