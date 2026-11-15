// DEADSIGNAL — entry program for the make.fun threejs-fps bounty (Node 22, standard library only).
//
// The repository is the game: game/ holds plain static files (ES modules plus the vendored
// three.js 0.187.0 build) and screenshots/ holds the maker's own renders of it. This program
// hands the entry in: it copies both folders into the output directory and writes
// dossier.json there with buildDossier from the kit's library (vendor/makefun-threejs.ts,
// unchanged), which is the text-and-images summary the judge reads.
//
// Run it the way the grader does, with the output directory standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Play the game locally with: node serve.ts  (then open http://localhost:8080)

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-threejs.ts';

const repoDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate's caps, mirrored so a local run refuses what the scorer would refuse:
// at most 993 files and 48 MiB under game/, at most 4 screenshots of 256 KiB each,
// and the dossier's source text capped at 160 KiB.
const GATE = {
  text_max_bytes: 163_840,
  screenshots: { max: 4, max_bytes: 262_144 },
  game_max_files: 993,
  game_max_bytes: 50_331_648,
};

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoDir, 'game'), join(outputDir, 'game'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoDir, 'screenshots'))) {
  cpSync(join(repoDir, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

writeFileSync(join(outputDir, 'dossier.json'), buildDossier(outputDir, GATE));
