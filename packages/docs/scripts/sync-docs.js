import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const packagesDir = resolve('../../packages');
const docsSrcDir = resolve('./src/packages');
const docsEnSrcDir = resolve('./src/en/packages');

if (!existsSync(docsSrcDir)) mkdirSync(docsSrcDir, { recursive: true });
if (!existsSync(docsEnSrcDir)) mkdirSync(docsEnSrcDir, { recursive: true });

const packages = readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'docs')
  .map(dirent => dirent.name);

for (const pkg of packages) {
  const readmePath = join(packagesDir, pkg, 'README.md');
  if (existsSync(readmePath)) {
    const content = readFileSync(readmePath, 'utf-8');
    
    // Split content by `---` to separate zh and en
    // The structure is:
    // # title
    // [English](#english) | [中文](#中文)
    // ---
    // ## 中文
    // ...
    // ---
    // ## English
    // ...

    const parts = content.split('\n---\n');
    let zhContent = content;
    let enContent = content;

    if (parts.length >= 3) {
      const header = parts[0].split('\n').filter(line => !line.includes('[English]')).join('\n');
      zhContent = header + '\n' + parts[1].replace('## 中文\n', '');
      enContent = header + '\n' + parts[2].replace('## English\n', '');
    }

    writeFileSync(join(docsSrcDir, `${pkg}.md`), zhContent);
    writeFileSync(join(docsEnSrcDir, `${pkg}.md`), enContent);
    console.log(`Synced ${pkg} documentation.`);
  }
}
