const fs = require('node:fs');
const {spawnSync} = require('node:child_process');
const code = fs.readFileSync(`${__dirname}/02-tech-check.js`, 'utf8');
const result = spawnSync(process.execPath, ['E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js', '-s=tech02', 'run-code', code], {encoding: 'utf8'});
fs.writeFileSync(`${__dirname}/02-tech-results.log`, result.stdout + result.stderr);
const match = result.stdout.match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);
if (match) fs.writeFileSync(`${__dirname}/02-tech-results.json`, JSON.stringify(JSON.parse(match[1]), null, 2) + '\n');
process.stdout.write(result.stdout + result.stderr);
process.exit(result.status || (result.stdout.includes('### Error') ? 1 : 0));
