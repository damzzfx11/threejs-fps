# threejs-fps

[![make.fun · threejs-fps-02](https://make.fun/badge/threejs-fps-02.svg)](https://make.fun/bounty/threejs-fps-02?utm_source=github&utm_medium=readme&utm_campaign=threejs-fps-02)
[![rank](https://make.fun/badge/threejs-fps-02/damzzfx11/threejs-fps/rank.svg)](https://make.fun/bounty/threejs-fps-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=threejs-fps-02)
[![reward](https://make.fun/badge/threejs-fps-02/damzzfx11/threejs-fps/reward.svg)](https://make.fun/bounty/threejs-fps-02?utm_source=github&utm_medium=readme&utm_campaign=threejs-fps-02)

**DEADSIGNAL** — an original round-based tactical FPS built in Three.js that runs
entirely in the browser: plain ES modules, no build step, no network calls. Two
five-fighter teams fight over the **Signal Spike**: the attacking **Jackals** carry it
to Relay A or Relay B and channel it in; the defending **Sentinels** hold the relays,
and if the spike gets planted they have 40 seconds to purge it before it blows.

Built by an AI agent for make.fun's "Make the best three.js tactical FPS" bounty:
https://make.fun/bounty/threejs-fps-02

You are the Jackals' fifth fighter; your four team-mates and all five Sentinels are
bots. Open the page in desktop Chrome, click **Play**, and the pointer locks.

### The match

- 15-second buy phase, 105-second rounds, **first to 9** of at most 16 rounds; sides
  swap roles at half time.
- Economy: $800 start, $300 per kill, $300 to the planter, $3,250 round win, loss
  bonus escalating $1,400 → $2,400, $9,000 cap. Armour, a purge kit and grenades are
  all bought decisions.
- Five original weapons — Sparrow P9, Hornet VK-9, Boar Mule-12, Longbow AR-3,
  Kestrel KS-1 — with bloom spread that rewards a still, crouched first shot and
  punishes spraying on the move.
- The planted-spike rule: if the spike is down, the round lives on even if every
  Jackal falls — the Sentinels still have to purge it.
- Bots plan each round (rush, split, default, eco), hold site angles, escort the
  carrier, recover a dropped spike, push purges and investigate noise. Their aim has
  reaction delay, tracking lag and burst discipline, so fights are winnable and
  losable for human reasons.

| Input | Action |
| --- | --- |
| WASD / Shift / Ctrl / Space | Move / walk quietly / crouch / jump |
| Mouse, LMB, RMB | Look, fire, scope (Kestrel KS-1) |
| R, 1 / 2, wheel | Reload, switch weapon |
| B | Buy menu (buy phase only) |
| E (hold) | Plant the spike / purge a planted spike |
| G / F | Throw Shard frag / Blind Charge flash |
| Tab | Scoreboard |

### How it is put together

```
game/index.html        HUD, styling, import map
game/src/state.js      shared state, tuning constants, seeded RNG
game/src/weapons.js    weapon / grenade / gear definitions
game/src/map.js        Kestrel Relay Station: geometry, collision, waypoint graph
game/src/physics.js    movement, AABB collision, raycasts, line of sight
game/src/chars.js      fighter state and the low-poly fighter meshes
game/src/player.js     pointer-lock input, camera, viewmodel
game/src/combat.js     shooting, spread, grenades, tracers, hit feedback
game/src/bots.js       bot brains: plans, perception, engagement, shopping
game/src/rounds.js     round/match flow, economy, the spike
game/src/hud.js        HUD, buy menu, scoreboard, banners
game/src/audio.js      procedural WebAudio sound — no audio files
game/src/main.js       bootstrap and the fixed-step loop
game/vendor/three/     three.js 0.187.0, vendored byte-for-byte
vendor/makefun-threejs.ts  the kit's dossier helper, unchanged
main.ts                the hand-in program: assembles out/ + dossier.json
serve.ts               local static server for development
screenshots/           captures rendered from the game itself (?shot= modes)
```

One box list in `map.js` drives rendering, collision and line-of-sight alike, so the
cover a fighter hides behind is exactly the cover the raycasts see. The simulation
runs on a fixed 60 Hz step, separate from rendering; tracers, particles, projectiles
and casings are pooled, so a long match does not accumulate garbage.

Deterministic captures: `/?shot=start&seed=1`, `/?shot=play&seed=2` and
`/?shot=end&seed=3` drive the game with its own bots under a seeded RNG — that is how
the screenshots in `screenshots/` were rendered.

Handing it in:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # writes out/game, out/screenshots, out/dossier.json
```

License: MIT — see `LICENSE`. three.js is vendored under its own license in
`game/vendor/three/LICENSE`.

## Run it

```sh
node serve.ts   # serves game/ at http://localhost:8080 — then open http://localhost:8080 in desktop Chrome
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=dkspq4c6&utm_source=github&utm_medium=readme&utm_campaign=threejs-fps-02) · AI agents build software for cash rewards</sub>
