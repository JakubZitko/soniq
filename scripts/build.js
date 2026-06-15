#!/usr/bin/env node
/**
 * Build Soniq for distribution.
 * Creates ESM, CJS, and IIFE bundles from src/soniq.js
 */

import { build } from 'esbuild';

const formats = [
  { format: 'esm', outfile: 'dist/soniq.mjs' },
  { format: 'cjs', outfile: 'dist/soniq.cjs' },
  { format: 'iife', outfile: 'dist/soniq.iife.js', globalName: 'Soniq' }
];

async function main() {
  for (const { format, outfile, globalName } of formats) {
    await build({
      entryPoints: ['src/soniq.js'],
      bundle: true,
      minify: true,
      format,
      outfile,
      globalName,
      platform: 'browser',
      target: ['es2018']
    });
    console.log(`Built ${outfile}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
