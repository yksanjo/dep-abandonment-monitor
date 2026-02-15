/**
 * Abandonment Monitor
 * Detects abandoned and unmaintained packages
 */

// Comprehensive abandoned packages database
const ABANDONED_PACKAGES = {
  'request': {
    status: 'deprecated',
    reason: 'Package deprecated in Feb 2020',
    lastUpdate: '2020-02-11',
    alternatives: ['axios', 'node-fetch', 'got'],
    severity: 'high'
  },
  'node-uuid': {
    status: 'renamed',
    reason: 'Package renamed to uuid',
    lastUpdate: '2017-10-20',
    alternatives: ['uuid'],
    severity: 'high'
  },
  'jade': {
    status: 'renamed',
    reason: 'Package renamed to pug',
    lastUpdate: '2016-05-18',
    alternatives: ['pug'],
    severity: 'high'
  },
  'left-pad': {
    status: 'deprecated',
    reason: 'String padding now available in native JavaScript',
    lastUpdate: '2016-03-08',
    alternatives: ['Native String.padStart()'],
    severity: 'medium'
  },
  'colors': {
    status: 'unmaintained',
    reason: 'Package has known security issues and is unmaintained',
    lastUpdate: '2021-12-21',
    alternatives: ['chalk', 'picocolors', 'kleur'],
    severity: 'critical'
  },
  'moment': {
    status: 'maintenance',
    reason: 'In maintenance mode, no new features',
    lastUpdate: '2022-09-15',
    alternatives: ['date-fns', 'dayjs', 'luxon'],
    severity: 'medium'
  },
  'node-sass': {
    status: 'discontinued',
    reason: 'Native implementation discontinued',
    lastUpdate: '2021-10-08',
    alternatives: ['sass (dart-sass)'],
    severity: 'high'
  },
  'phantomjs': {
    status: 'abandoned',
    reason: 'Project abandoned in 2017',
    lastUpdate: '2017-05-10',
    alternatives: ['puppeteer', 'playwright'],
    severity: 'critical'
  },
  'jsdom': {
    status: 'maintenance',
    reason: 'Limited maintenance, consider alternatives for new projects',
    lastUpdate: '2023-01-15',
    alternatives: ['happy-dom', 'linkedom'],
    severity: 'low'
  },
  'underscore': {
    status: 'maintenance',
    reason: 'In maintenance mode',
    lastUpdate: '2021-10-20',
    alternatives: ['lodash', 'native ES6+'],
    severity: 'low'
  },
  'mkdirp': {
    status: 'redundant',
    reason: 'Consider using native fs.mkdir with recursive option',
    lastUpdate: '2021-11-10',
    alternatives: ['fs.mkdir', 'fs.mkdirSync'],
    severity: 'low'
  },
  'needle': {
    status: 'maintenance',
    reason: 'Consider using native fetch or axios',
    lastUpdate: '2022-08-15',
    alternatives: ['axios', 'node-fetch', 'got'],
    severity: 'low'
  },
  'winston': {
    status: 'maintenance',
    reason: 'Consider using newer logging solutions',
    lastUpdate: '2023-02-10',
    alternatives: ['pino', 'loglevel'],
    severity: 'low'
  },
  'grunt': {
    status: 'declining',
    reason: 'Task runner market moved to newer tools',
    lastUpdate: '2020-04-08',
    alternatives: ['npm scripts', 'gulp', 'webpack'],
    severity: 'medium'
  },
  'bower': {
    status: 'deprecated',
    reason: 'Package manager deprecated',
    lastUpdate: '2018-02-17',
    alternatives: ['npm', 'yarn', 'pnpm'],
    severity: 'high'
  },
  'gulp-util': {
    status: 'deprecated',
    reason: 'Deprecated, part of gulp 4 removal',
    lastUpdate: '2016-01-22',
    alternatives: ['Other gulp plugins'],
    severity: 'high'
  },
  'coffee-script': {
    status: 'declining',
    reason: 'Language has declined in popularity',
    lastUpdate: '2020-12-22',
    alternatives: ['TypeScript', 'Modern JavaScript'],
    severity: 'medium'
  },
  'superagent': {
    status: 'maintenance',
    reason: 'Package in maintenance mode',
    lastUpdate: '2021-11-04',
    alternatives: ['axios', 'node-fetch', 'got'],
    severity: 'low'
  },
  'rimraf': {
    status: 'redundant',
    reason: 'Consider using native fs.rm with recursive option',
    lastUpdate: '2022-01-17',
    alternatives: ['fs.rm'],
    severity: 'low'
  },
  'reqwest': {
    status: 'niche',
    reason: 'Rust-based, consider HTTP clients in your language',
    lastUpdate: '2022-03-20',
    alternatives: ['axios (JS)', 'got (JS)', 'restic (Go)'],
    severity: 'low'
  },
  'q': {
    status: 'deprecated',
    reason: 'Use native Promises or async/await',
    lastUpdate: '2019-09-12',
    alternatives: ['Native Promises', 'async-await'],
    severity: 'medium'
  },
  'bluebird': {
    status: 'maintenance',
    reason: 'Native Promises are now sufficient for most use cases',
    lastUpdate: '2019-03-02',
    alternatives: ['Native Promises'],
    severity: 'low'
  },
  'node-uuid': {
    status: 'renamed',
    reason: 'Package renamed to uuid',
    lastUpdate: '2017-10-20',
    alternatives: ['uuid'],
    severity: 'high'
  },
  'gm': {
    status: 'abandoned',
    reason: 'GraphicsMagick/ImageMagick bindings, limited maintenance',
    lastUpdate: '2018-04-16',
    alternatives: ['sharp', 'jimp'],
    severity: 'medium'
  },
  'ldapjs': {
    status: 'abandoned',
    reason: 'LDAP library with limited maintenance',
    lastUpdate: '2020-06-15',
    alternatives: ['ldapts', 'active-directory'],
    severity: 'medium'
  },
  'mongoose': {
    status: 'active',
    reason: 'Still actively maintained but consider alternatives',
    lastUpdate: '2024-01-01',
    alternatives: ['prisma', 'drizzle'],
    severity: 'low'
  },
  'node-pty': {
    status: 'niche',
    reason: 'Terminal emulator binding, limited audience',
    lastUpdate: '2023-08-01',
    alternatives: ['xterm.js', ' blessed'],
    severity: 'low'
  },
  'mem': {
    status: 'redundant',
    reason: 'Native memoization available',
    lastUpdate: '2020-10-12',
    alternatives: ['Native Map/WeakMap'],
    severity: 'low'
  },
  'deep-extend': {
    status: 'redundant',
    reason: 'Native Object.assign or spread operator sufficient',
    lastUpdate: '2019-04-03',
    alternatives: ['Object.assign', 'spread operator'],
    severity: 'low'
  },
  'is-obj': {
    status: 'redundant',
    reason: 'Simple type check can be done natively',
    lastUpdate: '2018-05-02',
    alternatives: ['typeof'],
    severity: 'low'
  }
};

export class AbandonmentMonitor {
  constructor(options = {}) {
    this.options = {
      workspacePath: options.workspacePath || process.cwd(),
      excludeDirs: options.excludeDirs || ['node_modules', '.git', 'dist'],
      ...options
    };
    
    this.results = {
      abandoned: [],
      deprecated: [],
      maintenance: [],
      alternatives: [],
      summary: {
        totalScanned: 0,
        abandonedFound: 0,
        deprecatedFound: 0,
        maintenanceFound: 0
      }
    };
  }

  async monitor() {
    console.log('🔍 Scanning for abandoned packages...\n');
    
    const projects = this.findProjects();
    console.log(`📦 Found ${projects.length} projects\n`);
    
    for (const project of projects) {
      const dependencies = this.parseDependencies(project);
      
      for (const [pkg, version] of Object.entries(dependencies)) {
        this.results.summary.totalScanned++;
        
        const status = this.checkAbandonment(pkg);
        if (status) {
          const result = {
            package: pkg,
            version: version,
            ...status
          };
          
          if (status.status === 'abandoned' || status.status === 'discontinued') {
            this.results.abandoned.push(result);
            this.results.summary.abandonedFound++;
          } else if (status.status === 'deprecated' || status.status === 'renamed') {
            this.results.deprecated.push(result);
            this.results.summary.deprecatedFound++;
          } else {
            this.results.maintenance.push(result);
            this.results.summary.maintenanceFound++;
          }
          
          this.results.alternatives.push({
            package: pkg,
            alternatives: status.alternatives
          });
        }
      }
    }
    
    return this.results;
  }

  findProjects() {
    const { readFileSync, existsSync, readdirSync, statSync } = require('fs');
    const { join, resolve } = require('path');
    
    const projects = [];
    const workspacePath = resolve(this.options.workspacePath);
    
    try {
      const entries = readdirSync(workspacePath);
      
      for (const entry of entries) {
        const fullPath = join(workspacePath, entry);
        
        if (!statSync(fullPath).isDirectory()) continue;
        if (this.options.excludeDirs.includes(entry)) continue;
        if (entry.startsWith('.')) continue;
        
        if (existsSync(join(fullPath, 'package.json'))) {
          projects.push({ name: entry, path: fullPath });
        }
      }
    } catch (error) {
      console.error('Error finding projects:', error.message);
    }
    
    return projects;
  }

  parseDependencies(project) {
    const { readFileSync, existsSync } = require('fs');
    const { join } = require('path');
    
    const pkgPath = join(project.path, 'package.json');
    if (!existsSync(pkgPath)) return {};
    
    try {
      const content = readFileSync(pkgPath, 'utf-8');
      const pkg = JSON.parse(content);
      
      return {
        ...pkg.dependencies,
        ...pkg.devDependencies
      };
    } catch {
      return {};
    }
  }

  checkAbandonment(packageName) {
    return ABANDONED_PACKAGES[packageName.toLowerCase()] || null;
  }
}

export async function monitor(options = {}) {
  const monitorInstance = new AbandonmentMonitor(options);
  return await monitorInstance.monitor();
}
