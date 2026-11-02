import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {releaseVersion, assetURL} from '../src/lib/asset-version.js';
import {navigation} from '../src/components/shell.js';
import {icon} from '../src/components/icons.js';

const root = new URL('../', import.meta.url);
const html = fs.readFileSync(new URL('index.html', root), 'utf8');
const map = JSON.parse(html.match(/id="asset-imports">(.*?)<\/script>/)[1]).imports;

test('asset versions are current and precede module loading', () => {
  const result = spawnSync(process.execPath, [new URL('scripts/version-assets.mjs', root).pathname.replace(/^\/(\w:)/, '$1'), '--check'], {encoding: 'utf8'});
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.ok(html.indexOf('type="importmap"') < html.indexOf('type="module"'));
  assert.ok(html.includes('src="src/app.js?v=' + releaseVersion + '"'));
  assert.equal(assetURL('assets/ui/family.svg'), 'assets/ui/family.svg?v=' + releaseVersion);
});

test('nested imports use the same release at root and GitHub project paths', () => {
  for (const base of ['https://example.org/', 'https://example.org/terpenarc/']) {
    const resolved = new Map(Object.entries(map).map(([key,value]) => [new URL(key,base).href, new URL(value,base).href]));
    for (const [file, target] of Object.entries(map)) {
      const source = fs.readFileSync(new URL(file,root),'utf8');
      for (const match of source.matchAll(/(?:from\s*|import\s*\()\s*['"](\.[^'"]+)['"]/g)) {
        const canonical = new URL(match[1],new URL(target,base)).href;
        assert.ok(resolved.has(canonical), `${file}: unmapped ${match[1]}`);
        assert.equal(new URL(resolved.get(canonical)).search, '?v=' + releaseVersion);
      }
    }
  }
});

test('public navigation uses distinct, explicit icons', () => {
  assert.equal(navigation.find(([id]) => id === 'compare')[1], 'compare');
  assert.equal(navigation.find(([id]) => id === 'sources')[1], 'notes');
  assert.equal(new Set(navigation.map(([,name]) => icon(name))).size, navigation.length);
});
