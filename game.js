// Archon Clone - Main Game File
// Vanilla JavaScript ES6 + HTML5 Canvas

const KNIGHT_SWORD_ANCHORS = {
  N:  { body: { x: 47, y: 14 }, sword: { x: 44, y: 64 } },
  NE: { body: { x: 54, y: 22 }, sword: { x: 8,  y: 31 } },
  E:  { body: { x: 43, y: 37 }, sword: { x: 0,  y: 32 } },
  SE: { body: { x: 46, y: 42 }, sword: { x: 20, y: 31 } },
  S:  { body: { x: 28, y: 60 }, sword: { x: 38, y: 0  } },
  SW: { body: { x: 7,  y: 56 }, sword: { x: 62, y: 32 } },
  W:  { body: { x: 21, y: 39 }, sword: { x: 64, y: 32 } },
  NW: { body: { x: 19, y: 28 }, sword: { x: 64, y: 32 } }
};

const BASE_PROJECTILE_SPEED = 1500;

const DEBUG_COLLISION = false;

class ArchonGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.strategyCanvasWidth = this.canvas.width;
        this.strategyCanvasHeight = this.canvas.height;
        this.strategyCanvasStyleWidth = this.canvas.style.width;
        this.strategyCanvasStyleHeight = this.canvas.style.height;
        
        // Game state
        this.running = false;
        this.lastTime = 0;
        this.fps = 0;
        this.frameCount = 0;
        this.fpsTime = 0;

        this.currentSide = 'light';
        this.illegalFlash = null;
        this.gameState = 'STRATEGY';
        this.strategyInputLocked = false;
        this.combat = null;
        
        // Input state
        this.keys = {};
        this.gamepad = null;
        this.gamepadState = {};

        this.boardSize = 9;
        this.boardColorCodes = this.createInitialBoardColorCodesLightFirst();
        this.squareHexColors = {
            A: '#FFFFFF',
            B: '#CCCCCC',
            C: '#999999',
            D: '#666666',
            E: '#333333',
            F: '#000000'
        };

        this.pieces = [
            ...this.createInitialPiecesLight(),
            ...this.createInitialPiecesDark()
        ];

        // board[x][y] where x = column (0..8), y = row (0..8), value is an array of pieces (stack)
        this.board = this.createEmptyBoard();
        this.placePiecesOnBoard();
        this.selectedPiece = null;
        this.lastCaptureAttempt = null;
        this.boardLayout = null;

        this.knightSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.knightSwordSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 64,
            frameH: 64,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.goblinSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.wizardSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.wizardProjectileSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.loadKnightSprite();
        this.loadKnightSwordSprite();
        this.loadGoblinSprite();
        this.loadWizardSprite();
        this.loadWizardProjectileSprite();
        
        // Initialize
        this.init();
    }

    getCombatType(type) {
        if (type === 'Wizard') return 'PROJECTILE';
        return 'MELEE';
    }

    getUnitStats(type) {
        const moveRange = 3;

        if (type === 'Archer') return { moveType: 'WALK', moveRange };
        if (type === 'Manticore') return { moveType: 'WALK', moveRange };
        if (type === 'Golem') return { moveType: 'WALK', moveRange };
        if (type === 'Troll') return { moveType: 'WALK', moveRange };
        if (type === 'Unicorn') return { moveType: 'WALK', moveRange };
        if (type === 'Basilisk') return { moveType: 'WALK', moveRange };
        if (type === 'Knight') return { moveType: 'WALK', moveRange };
        if (type === 'Goblin') return { moveType: 'WALK', moveRange };

        if (type === 'Valkyrie') return { moveType: 'FLY', moveRange };
        if (type === 'Banshee') return { moveType: 'FLY', moveRange };
        if (type === 'Phoenix') return { moveType: 'FLY', moveRange };
        if (type === 'Shape Shifter') return { moveType: 'FLY', moveRange };
        if (type === 'Djinn') return { moveType: 'FLY', moveRange };
        if (type === 'Dragon') return { moveType: 'FLY', moveRange };

        if (type === 'Wizard') return { moveType: 'TELEPORT', moveRange, shotSpeedMultiplier: 0.8 };
        if (type === 'Sorceress') return { moveType: 'TELEPORT', moveRange };

        return { moveType: null, moveRange: 0 };
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.start();
    }
    
    setupEventListeners() {
        // Keyboard events
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyT') {
                this.selectedPiece = null;
                this.currentSide = this.currentSide === 'light' ? 'dark' : 'light';
            }
            this.keys[e.code] = true;
            e.preventDefault();
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            e.preventDefault();
        });
        
        // Gamepad events
        window.addEventListener('gamepadconnected', (e) => {
            this.gamepad = e.gamepad;
            this.updateGamepadStatus('Connected: ' + this.gamepad.id);
        });
        
        window.addEventListener('gamepaddisconnected', (e) => {
            this.gamepad = null;
            this.updateGamepadStatus('Not connected');
        });

        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => {
            this.handleCanvasMouseDown(e);
        });
    }
    
    updateGamepadStatus(status) {
        document.getElementById('gamepadStatus').textContent = 'Gamepad: ' + status;
    }
    
    start() {
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    gameLoop() {
        if (!this.running) return;
        
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;
        
        // Update FPS counter
        this.updateFPS(currentTime);
        
        // Update gamepad state
        this.updateGamepad();
        
        // Update game logic
        this.update(deltaTime);
        
        // Render
        this.render();
        
        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    updateFPS(currentTime) {
        this.frameCount++;
        if (currentTime - this.fpsTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.fpsTime = currentTime;
            document.getElementById('fps').textContent = 'FPS: ' + this.fps;
        }
    }
    
    updateGamepad() {
        if (this.gamepad) {
            const gamepads = navigator.getGamepads();
            this.gamepad = gamepads[this.gamepad.index];
            
            if (this.gamepad) {
                // Store button states
                for (let i = 0; i < this.gamepad.buttons.length; i++) {
                    this.gamepadState['button' + i] = this.gamepad.buttons[i].pressed;
                }
                
                // Store axis states
                for (let i = 0; i < this.gamepad.axes.length; i++) {
                    this.gamepadState['axis' + i] = this.gamepad.axes[i];
                }
            }
        }
    }
    
    update(deltaTime) {
        if (this.gameState === 'COMBAT') {
            this.updateCombat(deltaTime);
        } else {
            this.updateStrategy(deltaTime);
        }
        
        // Check for exit
        if (this.keys['Escape']) {
            this.running = false;
        }
    }

    updateStrategy(deltaTime) {
        this.updateIllegalFlash(deltaTime);
        this.updatePieceMovement(deltaTime);
    }

    updateCombat(deltaTime) {
        if (!this.combat) return;

        const ATTACK_DURATION = 0.35;
        const ATTACK_DAMAGE = 5;

        const arena = this.combat.arena ?? this.computeCombatArena();
        const spriteSize = this.combat.spriteSize ?? this.getCombatSpriteSize(arena.arenaW, arena.arenaH);
        const half = spriteSize / 2;

        const lightActor = this.combat.lightActor;
        const darkActor = this.combat.darkActor;

        const lightPiece = this.getPieceById(this.combat.lightPieceId);
        const darkPiece = this.getPieceById(this.combat.darkPieceId);

        const lightCombatType = this.getCombatType(lightPiece?.type);
        const darkCombatType = this.getCombatType(darkPiece?.type);

        if (!this.combat.projectiles) this.combat.projectiles = [];

        const updateAttackTimer = (actor) => {
            if (!actor?.isAttacking) return;
            actor.attackTimeLeft = (actor.attackTimeLeft ?? 0) - deltaTime;
            if (actor.attackTimeLeft <= 0) {
                actor.isAttacking = false;
                actor.attackTimeLeft = 0;
                actor.didDamageThisAttack = false;
            }
        };

        const updateAttackCooldown = (actor) => {
            if (!actor) return;
            actor.attackCooldownLeft = Math.max(0, (actor.attackCooldownLeft ?? 0) - deltaTime);
        };

        updateAttackTimer(lightActor);
        updateAttackTimer(darkActor);
        updateAttackCooldown(lightActor);
        updateAttackCooldown(darkActor);

        const startAttack = (actor) => {
            if (!actor) return;
            if (actor.isAttacking) return;
            actor.isAttacking = true;
            actor.attackTimeLeft = ATTACK_DURATION;
            actor.didDamageThisAttack = false;
            actor.isMoving = false;
            actor.walkAnimTime = 0;
        };

        const trySpawnWizardProjectile = (actor, ownerSide) => {
            if (!actor) return;
            if ((actor.attackCooldownLeft ?? 0) > 0) return;

            startAttack(actor);

            const shooterPiece = ownerSide === 'light' ? lightPiece : darkPiece;
            const shooterStats = this.getUnitStats(shooterPiece?.type);
            const shotSpeedMultiplier = shooterStats?.shotSpeedMultiplier ?? 1.0;
            const projectileSpeed = BASE_PROJECTILE_SPEED * shotSpeedMultiplier;

            const facing = actor.facing ?? (ownerSide === 'dark' ? 'W' : 'E');
            const v = dirToVec(facing);
            const len = Math.hypot(v.dx, v.dy) || 1;
            const ndx = v.dx / len;
            const ndy = v.dy / len;

            const spawnOff = Math.floor(spriteSize * 0.45);
            const px = actor.x + ndx * spawnOff;
            const py = actor.y + ndy * spawnOff;

            const isDiag = v.dx !== 0 && v.dy !== 0;
            const isHoriz = v.dx !== 0 && v.dy === 0;
            const isVert = v.dx === 0 && v.dy !== 0;

            let w = 8;
            let h = 8;
            if (isHoriz) {
                w = 6;
                h = 10;
            } else if (isVert) {
                w = 10;
                h = 6;
            } else if (isDiag) {
                w = 8;
                h = 8;
            }

            this.combat.projectiles.push({
                x: px,
                y: py,
                vx: ndx,
                vy: ndy,
                speed: projectileSpeed,
                direction: facing,
                width: w,
                height: h,
                damage: 10,
                ownerSide
            });

            actor.attackCooldownLeft = 1 / 0.75;
        };

        if (this.keys['Space']) {
            this.keys['Space'] = false;
            if (lightCombatType === 'PROJECTILE') {
                trySpawnWizardProjectile(lightActor, 'light');
            } else {
                startAttack(lightActor);
            }
        }

        if (this.keys['Enter'] || this.keys['NumpadEnter']) {
            this.keys['Enter'] = false;
            this.keys['NumpadEnter'] = false;
            if (darkCombatType === 'PROJECTILE') {
                trySpawnWizardProjectile(darkActor, 'dark');
            } else {
                startAttack(darkActor);
            }
        }

        const clampToArena = (actor) => {
            if (!actor) return;
            actor.x = Math.max(arena.ax + half, Math.min(arena.ax + arena.arenaW - half, actor.x));
            actor.y = Math.max(arena.ay + half, Math.min(arena.ay + arena.arenaH - half, actor.y));
        };

        const moveActor = (actor, dx, dy) => {
            if (!actor) return;
            if (dx === 0 && dy === 0) {
                actor.isMoving = false;
                actor.walkAnimTime = 0;
                return;
            }

            actor.isMoving = true;
            actor.walkAnimTime = (actor.walkAnimTime ?? 0) + deltaTime;

            const len = Math.hypot(dx, dy);
            const ndx = dx / len;
            const ndy = dy / len;
            const speed = 240;
            actor.x += ndx * speed * deltaTime;
            actor.y += ndy * speed * deltaTime;
            actor.facing = this.directionFromDelta(ndx, ndy);
            clampToArena(actor);
        };

        {
            const l = lightActor;
            let dx = 0;
            let dy = 0;
            if (!l?.isAttacking) {
                if (this.keys['KeyA']) dx -= 1;
                if (this.keys['KeyD']) dx += 1;
                if (this.keys['KeyW']) dy -= 1;
                if (this.keys['KeyS']) dy += 1;
            }
            moveActor(l, dx, dy);
        }

        {
            const d = darkActor;
            let dx = 0;
            let dy = 0;
            if (!d?.isAttacking) {
                if (this.keys['ArrowLeft']) dx -= 1;
                if (this.keys['ArrowRight']) dx += 1;
                if (this.keys['ArrowUp']) dy -= 1;
                if (this.keys['ArrowDown']) dy += 1;
            }
            moveActor(d, dx, dy);
        }

        const rectsOverlap = (r1, r2) => {
            return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
        };

        const actorHitbox = (actor) => {
            const s = Math.floor(spriteSize * 0.7);
            const hs = s / 2;
            return { x: Math.floor(actor.x - hs), y: Math.floor(actor.y - hs), w: s, h: s };
        };

        function dirToVec(dir) {
            if (dir === 'N') return { dx: 0, dy: -1 };
            if (dir === 'NE') return { dx: 1, dy: -1 };
            if (dir === 'E') return { dx: 1, dy: 0 };
            if (dir === 'SE') return { dx: 1, dy: 1 };
            if (dir === 'S') return { dx: 0, dy: 1 };
            if (dir === 'SW') return { dx: -1, dy: 1 };
            if (dir === 'W') return { dx: -1, dy: 0 };
            return { dx: -1, dy: -1 };
        }

        const attackZone = (attackerActor) => {
            const { dx, dy } = dirToVec(attackerActor.facing ?? 'E');
            const isDiag = dx !== 0 && dy !== 0;
            const zoneW = isDiag ? Math.floor(spriteSize * 0.7 * 0.8) : (dx !== 0 ? Math.floor(spriteSize * 0.85 * 0.8) : Math.floor(spriteSize * 0.7 * 0.8));
            const zoneH = isDiag ? Math.floor(spriteSize * 0.7 * 0.8) : (dy !== 0 ? Math.floor(spriteSize * 0.85 * 0.8) : Math.floor(spriteSize * 0.7 * 0.8));

            const off = Math.floor(spriteSize * 0.65);
            const cx = Math.floor(attackerActor.x + dx * off);
            const cy = Math.floor(attackerActor.y + dy * off);

            return { x: Math.floor(cx - zoneW / 2), y: Math.floor(cy - zoneH / 2), w: zoneW, h: zoneH };
        };

        const tryApplyAttackDamage = (attackerActor, defenderActor) => {
            if (!attackerActor?.isAttacking) return false;
            if (attackerActor.didDamageThisAttack) return false;
            if (!defenderActor) return false;

            const zone = attackZone(attackerActor);
            const defHB = actorHitbox(defenderActor);
            if (!rectsOverlap(zone, defHB)) return false;

            defenderActor.currentHP = (defenderActor.currentHP ?? 0) - ATTACK_DAMAGE;
            attackerActor.didDamageThisAttack = true;
            return defenderActor.currentHP <= 0;
        };

        const projectileHitRadius = spriteSize * 0.35;
        for (let i = this.combat.projectiles.length - 1; i >= 0; i--) {
            const p = this.combat.projectiles[i];
            const s = p.speed ?? BASE_PROJECTILE_SPEED;
            p.x += p.vx * s * deltaTime;
            p.y += p.vy * s * deltaTime;

            const pad = 20;
            if (p.x < arena.ax - pad || p.x > arena.ax + arena.arenaW + pad || p.y < arena.ay - pad || p.y > arena.ay + arena.arenaH + pad) {
                this.combat.projectiles.splice(i, 1);
                continue;
            }

            const targetActor = p.ownerSide === 'light' ? darkActor : lightActor;
            if (!targetActor) continue;

            const dx = p.x - targetActor.x;
            const dy = p.y - targetActor.y;
            const dist = Math.hypot(dx, dy);
            if (dist > projectileHitRadius) continue;

            targetActor.currentHP = (targetActor.currentHP ?? 0) - (p.damage ?? 0);
            this.combat.projectiles.splice(i, 1);
        }

        if (lightActor && darkActor) {
            if (lightCombatType === 'MELEE') {
                const darkKilled = tryApplyAttackDamage(lightActor, darkActor);
                if (darkKilled) {
                    this.resolveCombat({ winnerId: this.combat.lightPieceId, loserId: this.combat.darkPieceId });
                    return;
                }
            }

            if (darkCombatType === 'MELEE') {
                const lightKilled = tryApplyAttackDamage(darkActor, lightActor);
                if (lightKilled) {
                    this.resolveCombat({ winnerId: this.combat.darkPieceId, loserId: this.combat.lightPieceId });
                    return;
                }
            }

            const lightHP = lightActor.currentHP ?? 0;
            const darkHP = darkActor.currentHP ?? 0;
            if (lightHP <= 0) {
                this.resolveCombat({ winnerId: this.combat.darkPieceId, loserId: this.combat.lightPieceId });
                return;
            }
            if (darkHP <= 0) {
                this.resolveCombat({ winnerId: this.combat.lightPieceId, loserId: this.combat.darkPieceId });
                return;
            }
        }

        if (this.keys['Digit1']) {
            this.keys['Digit1'] = false;
            this.resolveCombat({ winnerId: this.combat.lightPieceId, loserId: this.combat.darkPieceId });
            return;
        }
        if (this.keys['Digit2']) {
            this.keys['Digit2'] = false;
            this.resolveCombat({ winnerId: this.combat.darkPieceId, loserId: this.combat.lightPieceId });
            return;
        }
        if (this.keys['Digit3']) {
            this.keys['Digit3'] = false;
            this.resolveCombat({ mutualDestruction: true });
            return;
        }
    }
    
    render() {
        // Clear canvas with black background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (this.gameState === 'COMBAT') {
            this.renderCombat();
        } else {
            // Draw a simple test pattern to verify rendering works
            this.drawTestPattern();
        }
        
        // Draw gamepad debug info
        this.drawGamepadDebug();
    }

    renderCombat() {
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.width, this.height);

        const { arenaW, arenaH, ax, ay } = this.computeCombatArena();

        this.ctx.fillStyle = 'rgba(40, 40, 40, 0.9)';
        this.ctx.fillRect(ax, ay, arenaW, arenaH);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(ax + 0.5, ay + 0.5, arenaW - 1, arenaH - 1);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = '20px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('COMBAT SCREEN (PLACEHOLDER)', this.width / 2, ay + 28);

        if (!this.combat) return;

        this.drawCombatHPBars();

        const lightPiece = this.getPieceById(this.combat.lightPieceId);
        const darkPiece = this.getPieceById(this.combat.darkPieceId);
        const squareLabel = this.xyToGridPos(this.combat.square.x, this.combat.square.y);

        const spriteSize = this.combat.spriteSize ?? this.getCombatSpriteSize(arenaW, arenaH);

        this.ctx.font = '14px Courier New';
        this.ctx.fillText(`Square: ${squareLabel}`, this.width / 2, ay + 52);

        this.ctx.font = '14px Courier New';
        this.ctx.fillText('Press 1: Light wins   2: Dark wins   3: mutual destruction', this.width / 2, ay + arenaH - 34);
        this.ctx.fillText('WASD: move Light (hold 2 keys for diagonals)   Arrows: move Dark (hold 2 keys for diagonals)', this.width / 2, ay + arenaH - 16);

        const leftX = ax + Math.floor(arenaW * 0.25);
        const rightX = ax + Math.floor(arenaW * 0.75);
        const midY = ay + Math.floor(arenaH * 0.55);

        const combatLight = this.combat.lightActor ?? { x: leftX, y: midY, facing: lightPiece?.facing ?? 'E' };
        const combatDark = this.combat.darkActor ?? { x: rightX, y: midY, facing: darkPiece?.facing ?? 'W' };

        if (DEBUG_COLLISION) {
            const r = spriteSize * 0.35;
            this.ctx.save();
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            this.ctx.lineWidth = 2;

            if (lightPiece) {
                this.ctx.beginPath();
                this.ctx.arc(combatLight.x, combatLight.y, r, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            if (darkPiece) {
                this.ctx.beginPath();
                this.ctx.arc(combatDark.x, combatDark.y, r, 0, Math.PI * 2);
                this.ctx.stroke();
            }

            this.ctx.restore();
        }

        const frameFromActor = (actor) => {
            if (actor?.isAttacking) return 3;
            if (!actor?.isMoving) return 0;
            const t = actor.walkAnimTime ?? 0;
            return Math.min(2, Math.floor((t * 10) % 3));
        };

        if (lightPiece) {
            this.drawCombatPiece(lightPiece, combatLight.x, combatLight.y, spriteSize, combatLight.facing, frameFromActor(combatLight));
            this.drawCombatOverlayForPiece(lightPiece, combatLight, spriteSize);
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(`Light: ${lightPiece.type}`, combatLight.x, combatLight.y + spriteSize / 2 + 22);
        }
        if (darkPiece) {
            this.drawCombatPiece(darkPiece, combatDark.x, combatDark.y, spriteSize, combatDark.facing, frameFromActor(combatDark));
            this.drawCombatOverlayForPiece(darkPiece, combatDark, spriteSize);
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(`Dark: ${darkPiece.type}`, combatDark.x, combatDark.y + spriteSize / 2 + 22);
        }

        if (this.combat.projectiles && this.wizardProjectileSprite.loaded) {
            const projDrawSize = Math.max(8, Math.floor(spriteSize * 0.55));
            for (const p of this.combat.projectiles) {
                this.drawWalkCycleSprite(this.wizardProjectileSprite, p.x, p.y, projDrawSize, p.direction ?? 'E', 0);
            }
        }
    }

    computeCombatArena() {
        const arenaW = this.width;
        const arenaH = this.height;
        const ax = 0;
        const ay = 0;
        return { arenaW, arenaH, ax, ay };
    }

    getCombatSpriteSize(arenaW, arenaH) {
        const baseW = this.combat?.canvasRestore?.width ?? this.strategyCanvasWidth;
        const baseH = this.combat?.canvasRestore?.height ?? this.strategyCanvasHeight;
        const maxBoardPixels = Math.floor(Math.min(baseW, baseH) * 0.8);
        return Math.floor(maxBoardPixels / this.boardSize);
    }

    drawCombatHPBars() {
        if (!this.combat) return;

        const lightActor = this.combat.lightActor;
        const darkActor = this.combat.darkActor;

        const pad = 15;
        const barW = 18;
        const top = 72;
        const bottom = this.height;
        const barH = Math.max(0, bottom - top);

        const drawBar = (x, color, actor) => {
            if (!actor) return;
            const maxHP = Math.max(1, actor.maxHP ?? 1);
            const curHP = Math.max(0, Math.min(maxHP, actor.currentHP ?? maxHP));
            const ratio = curHP / maxHP;
            const fillH = Math.floor(barH * ratio);
            const fillY = bottom - fillH;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
            this.ctx.fillRect(x, top, barW, barH);

            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, fillY, barW, fillH);
        };

        drawBar(pad, 'rgb(255, 180, 70)', lightActor);
        drawBar(this.width - pad - barW, 'rgb(0, 43, 115)', darkActor);
    }

    setCanvasSize(width, height, setStyleToPixels) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        if (setStyleToPixels) {
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
        }
        this.boardLayout = null;
    }

    drawCombatPiece(piece, cx, cy, spriteSize, facing, frameIndex) {
        if (piece.type === 'Knight' && this.knightSprite.loaded) {
            this.drawKnightSprite(cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Goblin' && this.goblinSprite.loaded) {
            this.drawGoblinSprite(cx, cy, spriteSize, facing ?? 'W', frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Wizard' && this.wizardSprite.loaded) {
            this.drawWizardSprite(cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0);
            return;
        }

        const radius = Math.max(18, Math.floor(spriteSize * 0.35));
        this.drawCombatMarker(piece, cx, cy, radius);
    }

    drawCombatOverlayForPiece(piece, actor, spriteSize) {
        if (!piece || !actor) return;
        if (!actor.isAttacking) return;
        if (piece.type !== 'Knight') return;
        if (!this.knightSprite.loaded) return;
        if (!this.knightSwordSprite.loaded) return;

        this.drawAnchoredOverlay(
            this.knightSprite,
            this.knightSwordSprite,
            KNIGHT_SWORD_ANCHORS,
            actor.x,
            actor.y,
            spriteSize,
            actor.facing ?? 'E'
        );
    }

    drawAnchoredOverlay(bodySprite, overlaySprite, anchors, cx, cy, tileSize, facing) {
        const bodySw = bodySprite.frameW;
        const bodySh = bodySprite.frameH;
        const overlaySw = overlaySprite.frameW;
        const overlaySh = overlaySprite.frameH;

        const intScale = Math.max(1, Math.floor(Math.min(tileSize / bodySw, tileSize / bodySh)));

        const bodyDw = bodySw * intScale;
        const bodyDh = bodySh * intScale;
        const bodyDx = Math.floor(cx - bodyDw / 2);
        const bodyDy = Math.floor(cy - bodyDh / 2);

        const dirIndex = overlaySprite.directionOrder.indexOf(facing);
        const row = dirIndex >= 0 ? dirIndex : 0;

        const a = anchors?.[facing] ?? anchors?.E;
        if (!a) return;

        const bodyAnchor = a.body ?? { x: 0, y: 0 };
        const swordAnchor = a.sword ?? { x: 0, y: 0 };

        // Offset aligns the overlay anchor point (swordAnchor) to the body anchor point (bodyAnchor).
        // The offset is measured in source pixels (64×64), then scaled by the same integer scale used
        // to draw the body, ensuring nearest-neighbor alignment without subpixel blur.
        const offsetX = bodyAnchor.x - swordAnchor.x;
        const offsetY = bodyAnchor.y - swordAnchor.y;

        const dx = bodyDx + offsetX * intScale;
        const dy = bodyDy + offsetY * intScale;

        const sx = 0;
        const sy = row * overlaySh;

        const prevSmoothing = this.ctx.imageSmoothingEnabled;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(overlaySprite.img, sx, sy, overlaySw, overlaySh, dx, dy, overlaySw * intScale, overlaySh * intScale);
        this.ctx.imageSmoothingEnabled = prevSmoothing;
    }

    drawCombatMarker(piece, cx, cy, radius) {
        this.ctx.fillStyle = piece.side === 'dark'
            ? 'rgba(35, 75, 160, 0.95)'
            : 'rgba(255, 180, 70, 0.95)';
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        const label = piece.type.slice(0, 2).toUpperCase();
        this.ctx.fillStyle = piece.side === 'dark' ? '#fff' : '#000';
        this.ctx.font = `${Math.max(12, Math.floor(radius * 0.8))}px Courier New`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(label, cx, cy);
        this.ctx.textBaseline = 'alphabetic';
    }

    startCombat(capture) {
        this.gameState = 'COMBAT';

        const canvasRestore = {
            width: this.canvas.width,
            height: this.canvas.height,
            styleWidth: this.canvas.style.width,
            styleHeight: this.canvas.style.height
        };

        const spriteSize = this.getCombatSpriteSize(0, 0);

        const combatW = Math.floor(canvasRestore.width * 1.3);
        const combatH = Math.floor(canvasRestore.height * 1.3);
        this.setCanvasSize(combatW, combatH, true);

        const arena = this.computeCombatArena();
        const leftX = arena.ax + Math.floor(arena.arenaW * 0.25);
        const rightX = arena.ax + Math.floor(arena.arenaW * 0.75);
        const midY = arena.ay + Math.floor(arena.arenaH * 0.55);

        const attackerPiece = this.getPieceById(capture.attackerId);
        const defenderPiece = this.getPieceById(capture.defenderId);
        const defaultHP = 20;

        const lightPiece = attackerPiece?.side === 'light' ? attackerPiece : defenderPiece;
        const darkPiece = attackerPiece?.side === 'dark' ? attackerPiece : defenderPiece;

        const lightPieceId = lightPiece?.id;
        const darkPieceId = darkPiece?.id;

        const hpForPiece = (piece) => {
            if (piece?.type === 'Wizard') return 17;
            return defaultHP;
        };

        const lightHP = hpForPiece(lightPiece);
        const darkHP = hpForPiece(darkPiece);

        this.combat = {
            attackerId: capture.attackerId,
            defenderId: capture.defenderId,
            lightPieceId,
            darkPieceId,
            square: capture.square,
            canvasRestore,
            arena,
            spriteSize,
            projectiles: [],
            lightActor: { x: leftX, y: midY, facing: 'E', side: 'light', maxHP: lightHP, currentHP: lightHP, walkAnimTime: 0, isMoving: false, isAttacking: false, attackTimeLeft: 0, didDamageThisAttack: false, attackCooldownLeft: 0 },
            darkActor: { x: rightX, y: midY, facing: 'W', side: 'dark', maxHP: darkHP, currentHP: darkHP, walkAnimTime: 0, isMoving: false, isAttacking: false, attackTimeLeft: 0, didDamageThisAttack: false, attackCooldownLeft: 0 }
        };
    }

    resolveCombat(result) {
        if (!this.combat) return;

        const canvasRestore = this.combat.canvasRestore;

        const { x, y } = this.combat.square;

        if (result.mutualDestruction) {
            this.removePieceById(this.combat.attackerId);
            this.removePieceById(this.combat.defenderId);
        } else {
            this.removePieceById(result.loserId);

            const winner = this.getPieceById(result.winnerId);
            if (winner) {
                winner.col = x;
                winner.row = y;

                if (winner.side === 'dark') {
                    winner.facing = 'W';
                    winner.walkAnimTime = 0;
                }

                const stack = this.board[x][y];
                if (!stack.includes(winner)) stack.push(winner);
            }
        }

        this.combat = null;
        if (canvasRestore) {
            this.setCanvasSize(canvasRestore.width, canvasRestore.height, false);
            this.canvas.style.width = canvasRestore.styleWidth;
            this.canvas.style.height = canvasRestore.styleHeight;
            this.strategyCanvasWidth = this.canvas.width;
            this.strategyCanvasHeight = this.canvas.height;
            this.strategyCanvasStyleWidth = this.canvas.style.width;
            this.strategyCanvasStyleHeight = this.canvas.style.height;
        }
        this.gameState = 'STRATEGY';
        this.strategyInputLocked = false;
        this.selectedPiece = null;
        this.endTurn();
    }

    removePieceById(pieceId) {
        const piece = this.getPieceById(pieceId);
        if (!piece) return;

        this.pieces = this.pieces.filter(p => p.id !== pieceId);

        for (let x = 0; x < this.boardSize; x++) {
            for (let y = 0; y < this.boardSize; y++) {
                const stack = this.board[x][y];
                const idx = stack.findIndex(p => p.id === pieceId);
                if (idx >= 0) stack.splice(idx, 1);
            }
        }
    }

    getPieceById(pieceId) {
        return this.pieces.find(p => p.id === pieceId) ?? null;
    }

    xyToGridPos(x, y) {
        const colChar = String.fromCharCode('A'.charCodeAt(0) + x);
        return `${colChar}${y + 1}`;
    }
    
    drawTestPattern() {
        // Draw a simple checkerboard pattern to verify canvas is working
        const boardSize = this.boardSize;
        const { tileSize, boardPixelSize, offsetX, offsetY } = this.computeBoardLayout();

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const x = offsetX + col * tileSize;
                const y = offsetY + row * tileSize;

                const colorCode = this.boardColorCodes?.[row]?.[col] ?? 'D';
                this.ctx.fillStyle = this.squareHexColors[colorCode] ?? '#666666';
                this.ctx.fillRect(x, y, tileSize, tileSize);
            }
        }

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= boardSize; i++) {
            const x = offsetX + i * tileSize + 0.5;
            const y = offsetY + i * tileSize + 0.5;

            this.ctx.beginPath();
            this.ctx.moveTo(x, offsetY + 0.5);
            this.ctx.lineTo(x, offsetY + boardPixelSize + 0.5);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(offsetX + 0.5, y);
            this.ctx.lineTo(offsetX + boardPixelSize + 0.5, y);
            this.ctx.stroke();
        }

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(offsetX + 0.5, offsetY + 0.5, boardPixelSize, boardPixelSize);

        this.drawSelection(offsetX, offsetY, tileSize);
        this.drawIllegalFlash(offsetX, offsetY, tileSize);

        this.drawPieces(offsetX, offsetY, tileSize);

        // Draw center text
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '18px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('STRATEGY SCREEN (GRID ONLY)', this.width / 2, offsetY - 14);

        this.drawTurnIndicator(offsetX, offsetY);
    }

    createInitialBoardColorCodesLightFirst() {
        return [
            ['F', 'A', 'F', 'D', 'D', 'D', 'A', 'F', 'A'],
            ['A', 'F', 'D', 'A', 'D', 'D', 'D', 'A', 'F'],
            ['F', 'D', 'A', 'F', 'D', 'A', 'F', 'D', 'A'],
            ['D', 'A', 'F', 'A', 'D', 'F', 'A', 'F', 'D'],
            ['A', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'F'],
            ['D', 'A', 'F', 'A', 'D', 'F', 'A', 'D', 'D'],
            ['F', 'D', 'A', 'F', 'D', 'A', 'F', 'D', 'A'],
            ['A', 'F', 'D', 'A', 'D', 'F', 'D', 'A', 'F'],
            ['F', 'A', 'F', 'D', 'D', 'D', 'A', 'F', 'A']
        ];
    }

    createInitialPiecesLight() {
        return [
            { side: 'light', type: 'Valkyrie', pos: 'A1' },
            { side: 'light', type: 'Archer', pos: 'B1' },
            { side: 'light', type: 'Golem', pos: 'A2' },
            { side: 'light', type: 'Knight', pos: 'B2', facing: 'E' },
            { side: 'light', type: 'Unicorn', pos: 'A3' },
            { side: 'light', type: 'Knight', pos: 'B3', facing: 'E' },
            { side: 'light', type: 'Djinn', pos: 'A4' },
            { side: 'light', type: 'Knight', pos: 'B4', facing: 'E' },
            { side: 'light', type: 'Wizard', pos: 'A5' },
            { side: 'light', type: 'Knight', pos: 'B5', facing: 'E' },
            { side: 'light', type: 'Phoenix', pos: 'A6' },
            { side: 'light', type: 'Knight', pos: 'B6', facing: 'E' },
            { side: 'light', type: 'Unicorn', pos: 'A7' },
            { side: 'light', type: 'Knight', pos: 'B7', facing: 'E' },
            { side: 'light', type: 'Golem', pos: 'A8' },
            { side: 'light', type: 'Knight', pos: 'B8', facing: 'E' },
            { side: 'light', type: 'Valkyrie', pos: 'A9' },
            { side: 'light', type: 'Archer', pos: 'B9' }
        ].map((p, index) => ({
            id: `p${index}`,
            facing: 'E',
            state: 'IDLE',
            remainingMove: 0,
            walkAnimTime: 0,
            ...p,
            ...this.gridPosToRowCol(p.pos)
        }));
    }

    createInitialPiecesDark() {
        return [
            { side: 'dark', type: 'Manticore', pos: 'H1' },
            { side: 'dark', type: 'Banshee', pos: 'I1' },
            { side: 'dark', type: 'Goblin', pos: 'H2' },
            { side: 'dark', type: 'Troll', pos: 'I2' },
            { side: 'dark', type: 'Goblin', pos: 'H3' },
            { side: 'dark', type: 'Basilisk', pos: 'I3' },
            { side: 'dark', type: 'Goblin', pos: 'H4' },
            { side: 'dark', type: 'Shape Shifter', pos: 'I4' },
            { side: 'dark', type: 'Goblin', pos: 'H5' },
            { side: 'dark', type: 'Sorceress', pos: 'I5' },
            { side: 'dark', type: 'Goblin', pos: 'H6' },
            { side: 'dark', type: 'Dragon', pos: 'I6' },
            { side: 'dark', type: 'Goblin', pos: 'H7' },
            { side: 'dark', type: 'Basilisk', pos: 'I7' },
            { side: 'dark', type: 'Goblin', pos: 'H8' },
            { side: 'dark', type: 'Troll', pos: 'I8' },
            { side: 'dark', type: 'Manticore', pos: 'H9' },
            { side: 'dark', type: 'Banshee', pos: 'I9' }
        ].map((p, index) => ({
            id: `d${index}`,
            facing: 'W',
            state: 'IDLE',
            remainingMove: 0,
            walkAnimTime: 0,
            ...p,
            ...this.gridPosToRowCol(p.pos)
        }));
    }

    gridPosToRowCol(pos) {
        const colChar = String(pos).trim().toUpperCase().slice(0, 1);
        const rowStr = String(pos).trim().slice(1);
        const col = colChar.charCodeAt(0) - 'A'.charCodeAt(0);
        const row = Number.parseInt(rowStr, 10) - 1;
        return { row, col };
    }

    drawPieces(offsetX, offsetY, tileSize) {
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (const piece of this.pieces) {
            if (piece.row < 0 || piece.row >= this.boardSize || piece.col < 0 || piece.col >= this.boardSize) continue;

            const defaultCx = offsetX + piece.col * tileSize + tileSize / 2;
            const defaultCy = offsetY + piece.row * tileSize + tileSize / 2;
            const cx = piece.state === 'MOVING' ? piece.renderX : defaultCx;
            const cy = piece.state === 'MOVING' ? piece.renderY : defaultCy;

            if (piece.type === 'Knight' && this.knightSprite.loaded) {
                const walkFrame = piece.state === 'MOVING'
                    ? Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3))
                    : 0;
                this.drawKnightSprite(cx, cy, tileSize, piece.facing ?? 'E', walkFrame);
                continue;
            }

            if (piece.type === 'Goblin' && this.goblinSprite.loaded) {
                this.drawGoblinSprite(cx, cy, tileSize, piece.facing ?? 'W', 0);
                continue;
            }

            if (piece.type === 'Wizard' && this.wizardSprite.loaded) {
                this.drawWizardSprite(cx, cy, tileSize, piece.facing ?? 'E', 0);
                continue;
            }

            const radius = Math.max(10, Math.floor(tileSize * 0.32));

            this.ctx.fillStyle = piece.side === 'dark'
                ? 'rgba(35, 75, 160, 0.95)'
                : 'rgba(255, 180, 70, 0.95)';
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            const label = piece.type.slice(0, 2).toUpperCase();
            this.ctx.fillStyle = piece.side === 'dark' ? '#fff' : '#000';
            this.ctx.font = `${Math.max(10, Math.floor(tileSize * 0.22))}px Courier New`;
            this.ctx.fillText(label, cx, cy);
        }

        this.ctx.textBaseline = 'alphabetic';
    }

    loadKnightSprite() {
        const candidates = [
            'assets/Knight%20Walk%20Cycle.png',
            'assets/knight_walk.png'
        ];

        this.loadWalkCycleSpriteSheet(
            this.knightSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadKnightSwordSprite() {
        const candidates = [
            'assets/Knight%20Attack.png',
            'assets/Knight Attack.png',
            'assets/knight_attack.png'
        ];

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.knightSwordSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            this.knightSwordSprite.img = img;
            this.knightSwordSprite.loaded = true;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadGoblinSprite() {
        const candidates = [
            'assets/Goblin%20Walk%20Cycle.png',
            'assets/Goblin Walk Cycle.png',
            'assets/Goblin%20Walking%20Cycle.png',
            'assets/Goblin Walking Cycle.png'
        ];

        this.loadWalkCycleSpriteSheet(
            this.goblinSprite,
            candidates,
            [4],
            [8]
        );
    }

    loadWizardSprite() {
        const candidates = [
            'assets/Wizard%20Walk%20Cycle.png',
            'assets/Wizard Walk Cycle.png'
        ];

        this.loadWalkCycleSpriteSheet(
            this.wizardSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadWizardProjectileSprite() {
        const candidates = [
            'assets/Wizard%20Projectile.png',
            'assets/Wizard Projectile.png'
        ];

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.wizardProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.wizardProjectileSprite.loaded = false;
                return;
            }

            this.wizardProjectileSprite.img = img;
            this.wizardProjectileSprite.cols = 1;
            this.wizardProjectileSprite.rows = 8;
            this.wizardProjectileSprite.frameW = img.width;
            this.wizardProjectileSprite.frameH = frameH;
            this.wizardProjectileSprite.loaded = this.wizardProjectileSprite.frameW > 0 && this.wizardProjectileSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadWalkCycleSpriteSheet(sprite, candidates, possibleCols, possibleRows) {
        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                sprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            sprite.img = img;

            let best = null;

            for (const cols of possibleCols) {
                for (const rows of possibleRows) {
                    const frameW = img.width / cols;
                    const frameH = img.height / rows;
                    if (!Number.isInteger(frameW) || !Number.isInteger(frameH)) continue;

                    const score = Math.abs(frameW - frameH);
                    if (!best || score < best.score) {
                        best = { cols, rows, frameW, frameH, score };
                    }
                }
            }

            if (!best) {
                sprite.loaded = false;
                return;
            }

            sprite.cols = best.cols;
            sprite.rows = best.rows;
            sprite.frameW = best.frameW;
            sprite.frameH = best.frameH;
            sprite.loaded = sprite.frameW > 0 && sprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    computeBoardLayout() {
        const maxBoardPixels = Math.floor(Math.min(this.width, this.height) * 0.8);
        const tileSize = Math.floor(maxBoardPixels / this.boardSize);
        const boardPixelSize = tileSize * this.boardSize;
        const offsetX = Math.floor((this.width - boardPixelSize) / 2);
        const offsetY = Math.floor((this.height - boardPixelSize) / 2);

        this.boardLayout = { tileSize, boardPixelSize, offsetX, offsetY };
        return this.boardLayout;
    }

    // --- Selection + movement (Strategy Screen)

    handleCanvasMouseDown(e) {
        if (this.gameState !== 'STRATEGY') return;
        if (this.strategyInputLocked) return;
        const tile = this.getTileFromMouseEvent(e);
        if (!tile) {
            this.selectedPiece = null;
            return;
        }

        const { x, y } = tile;
        const stack = this.board[x][y];
        const hasAny = stack.length > 0;

        if (hasAny) {
            const friendly = stack.find(p => p.side === this.currentSide);
            if (friendly) {
                const friendlyMovable = stack.find(p => {
                    if (p.side !== this.currentSide) return false;
                    const s = this.getUnitStats(p.type);
                    return s.moveType && (s.moveRange ?? 0) > 0;
                });
                this.selectedPiece = friendlyMovable ?? friendly;
                return;
            }

            if (!this.selectedPiece) {
                this.flashIllegal(x, y);
                return;
            }
        }

        if (!this.selectedPiece) return;
        if (this.selectedPiece.state !== 'IDLE') return;
        if (this.selectedPiece.side !== this.currentSide) {
            this.flashIllegal(x, y);
            return;
        }

        const result = this.tryStartMove(this.selectedPiece, x, y);
        if (!result) {
            this.flashIllegal(x, y);
            return;
        }

        if (result.type === 'capture') {
            this.lastCaptureAttempt = result;
            this.strategyInputLocked = true;
            console.log('Capture attempt', result);
        }
    }

    getTileFromMouseEvent(e) {
        const layout = this.boardLayout ?? this.computeBoardLayout();
        const rect = this.canvas.getBoundingClientRect();

        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const canvasX = (e.clientX - rect.left) * scaleX;
        const canvasY = (e.clientY - rect.top) * scaleY;

        const localX = canvasX - layout.offsetX;
        const localY = canvasY - layout.offsetY;

        if (localX < 0 || localY < 0 || localX >= layout.boardPixelSize || localY >= layout.boardPixelSize) {
            return null;
        }

        const x = Math.floor(localX / layout.tileSize);
        const y = Math.floor(localY / layout.tileSize);
        if (!this.isInBounds(x, y)) return null;
        return { x, y };
    }

    drawSelection(offsetX, offsetY, tileSize) {
        if (!this.selectedPiece) return;

        if (this.selectedPiece.side !== this.currentSide) return;

        const x = this.selectedPiece.col;
        const y = this.selectedPiece.row;
        if (!this.isInBounds(x, y)) return;

        this.ctx.strokeStyle = this.selectedPiece.side === 'dark'
            ? 'rgb(98, 169, 236)'
            : 'rgba(255, 180, 70, 0.95)';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(
            offsetX + x * tileSize + 2,
            offsetY + y * tileSize + 2,
            tileSize - 4,
            tileSize - 4
        );
    }

    tryStartMove(piece, destX, destY) {
        const stats = this.getUnitStats(piece?.type);
        const moveType = stats.moveType;
        if (!moveType) return false;

        if (moveType === 'WALK') return this.tryStartWalkMove(piece, destX, destY);
        if (moveType === 'FLY') return this.tryStartFlyMove(piece, destX, destY);
        if (moveType === 'TELEPORT') return this.tryStartTeleportMove(piece, destX, destY);
        return false;
    }

    tryStartWalkMove(piece, destX, destY) {
        if (!this.isInBounds(destX, destY)) return false;
        const stats = this.getUnitStats(piece?.type);
        if (stats.moveType !== 'WALK') return false;
        const moveRange = stats.moveRange ?? 0;
        if (moveRange <= 0) return false;

        const destStack = this.board[destX][destY];
        const friendlyOnDest = destStack.find(p => p.side === piece.side);
        if (friendlyOnDest) return false;

        const defender = destStack.find(p => p.side !== piece.side);

        const captureResult = defender
            ? {
                type: 'capture',
                attackerId: piece.id,
                defenderId: defender.id,
                square: { x: destX, y: destY }
            }
            : null;

        const startX = piece.col;
        const startY = piece.row;

        const dx = destX - startX;
        const dy = destY - startY;
        const manhattan = Math.abs(dx) + Math.abs(dy);
        if (manhattan > moveRange) return false;

        const path = this.buildKnightPath(startX, startY, destX, destY, moveRange);
        if (!path) return false;

        // Remove from occupancy grid during movement.
        const startStack = this.board[startX][startY];
        const startIndex = startStack.indexOf(piece);
        if (startIndex >= 0) startStack.splice(startIndex, 1);

        piece.state = 'MOVING';
        piece.remainingMove = path.length;
        piece.move = {
            path,
            stepIndex: 0,
            stepT: 0,
            stepDuration: 0.18,
            capture: captureResult,
            from: { x: startX, y: startY },
            to: { x: path[0].x, y: path[0].y }
        };

        // Initialize render position at the current grid center.
        const layout = this.boardLayout ?? this.computeBoardLayout();
        const startCenter = this.gridToCanvasCenter(startX, startY, layout);
        piece.renderX = startCenter.x;
        piece.renderY = startCenter.y;
        piece.walkAnimTime = 0;
        const firstStep = path[0];
        piece.facing = this.directionFromDelta(firstStep.x - startX, firstStep.y - startY);

        if (captureResult) return captureResult;
        return { type: 'move', pieceId: piece.id, square: { x: destX, y: destY } };
    }

    tryStartFlyMove(piece, destX, destY) {
        if (!this.isInBounds(destX, destY)) return false;
        const stats = this.getUnitStats(piece?.type);
        if (stats.moveType !== 'FLY') return false;
        const moveRange = stats.moveRange ?? 0;
        if (moveRange <= 0) return false;

        const startX = piece.col;
        const startY = piece.row;

        const dx = destX - startX;
        const dy = destY - startY;
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        if (dist <= 0 || dist > moveRange) return false;

        const destStack = this.board[destX][destY];
        const friendlyOnDest = destStack.find(p => p.side === piece.side);
        if (friendlyOnDest) return false;

        const defender = destStack.find(p => p.side !== piece.side);
        const captureResult = defender
            ? {
                type: 'capture',
                attackerId: piece.id,
                defenderId: defender.id,
                square: { x: destX, y: destY }
            }
            : null;

        // Remove from occupancy grid during movement.
        const startStack = this.board[startX][startY];
        const startIndex = startStack.indexOf(piece);
        if (startIndex >= 0) startStack.splice(startIndex, 1);

        piece.state = 'MOVING';
        piece.remainingMove = 1;
        piece.move = {
            path: [{ x: destX, y: destY }],
            stepIndex: 0,
            stepT: 0,
            stepDuration: 0.18,
            capture: captureResult,
            from: { x: startX, y: startY },
            to: { x: destX, y: destY }
        };

        // Initialize render position at the current grid center.
        const layout = this.boardLayout ?? this.computeBoardLayout();
        const startCenter = this.gridToCanvasCenter(startX, startY, layout);
        piece.renderX = startCenter.x;
        piece.renderY = startCenter.y;
        piece.walkAnimTime = 0;
        piece.facing = this.directionFromDelta(dx, dy);

        if (captureResult) return captureResult;
        return { type: 'move', pieceId: piece.id, square: { x: destX, y: destY } };
    }

    tryStartTeleportMove(piece, destX, destY) {
        if (!this.isInBounds(destX, destY)) return false;
        const stats = this.getUnitStats(piece?.type);
        if (stats.moveType !== 'TELEPORT') return false;
        const moveRange = stats.moveRange ?? 0;
        if (moveRange <= 0) return false;

        const startX = piece.col;
        const startY = piece.row;

        const dx = destX - startX;
        const dy = destY - startY;
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        if (dist <= 0 || dist > moveRange) return false;

        const destStack = this.board[destX][destY];
        const friendlyOnDest = destStack.find(p => p.side === piece.side);
        if (friendlyOnDest) return false;

        const defender = destStack.find(p => p.side !== piece.side);
        const captureResult = defender
            ? {
                type: 'capture',
                attackerId: piece.id,
                defenderId: defender.id,
                square: { x: destX, y: destY }
            }
            : null;

        // Remove from start square occupancy.
        const startStack = this.board[startX][startY];
        const startIndex = startStack.indexOf(piece);
        if (startIndex >= 0) startStack.splice(startIndex, 1);

        // Instant move (no movement animation).
        piece.col = destX;
        piece.row = destY;
        piece.state = 'IDLE';
        piece.move = null;
        piece.renderX = undefined;
        piece.renderY = undefined;
        piece.walkAnimTime = 0;
        piece.remainingMove = 0;
        piece.facing = this.directionFromDelta(dx, dy);
        if (piece.type === 'Wizard') piece.facing = 'E';

        if (!destStack.includes(piece)) destStack.push(piece);

        if (captureResult) {
            this.startCombat(captureResult);
            return captureResult;
        }

        this.endTurn();
        return { type: 'move', pieceId: piece.id, square: { x: destX, y: destY } };
    }

    tryStartGroundMove(piece, destX, destY) {
        return this.tryStartWalkMove(piece, destX, destY);
    }

    tryStartKnightMove(knight, destX, destY) {
        return this.tryStartMove(knight, destX, destY);
    }

    flashIllegal(x, y) {
        this.illegalFlash = { x, y, t: 0.2 };
    }

    updateIllegalFlash(deltaTime) {
        if (!this.illegalFlash) return;
        this.illegalFlash.t -= deltaTime;
        if (this.illegalFlash.t <= 0) this.illegalFlash = null;
    }

    drawIllegalFlash(offsetX, offsetY, tileSize) {
        if (!this.illegalFlash) return;
        const { x, y } = this.illegalFlash;
        if (!this.isInBounds(x, y)) return;

        this.ctx.strokeStyle = 'rgba(255, 50, 50, 0.95)';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(
            offsetX + x * tileSize + 2,
            offsetY + y * tileSize + 2,
            tileSize - 4,
            tileSize - 4
        );
    }

    drawTurnIndicator(offsetX, offsetY) {
        const label = this.currentSide === 'light' ? 'LIGHT' : 'DARK';
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = this.currentSide === 'light' ? 'rgba(255, 180, 70, 0.95)' : 'rgba(100, 180, 255, 0.95)';
        this.ctx.font = '14px Courier New';
        this.ctx.fillText(`TURN: ${label}`, offsetX, offsetY - 14);
    }

    endTurn() {
        this.selectedPiece = null;
        this.currentSide = this.currentSide === 'light' ? 'dark' : 'light';
    }

    // Returns an array of steps excluding start, including dest, or null.
    // Searches up to maxSteps, avoiding occupied squares.
    // Chooses the best path by fewest steps, then fewest turns.
    buildKnightPath(startX, startY, destX, destY, maxSteps) {
        if (startX === destX && startY === destY) return null;

        const dirs = [
            { dx: 0, dy: -1, dir: 'N' },
            { dx: 1, dy: 0, dir: 'E' },
            { dx: 0, dy: 1, dir: 'S' },
            { dx: -1, dy: 0, dir: 'W' }
        ];

        const stateKey = (x, y, prevDir) => `${x},${y},${prevDir ?? ''}`;
        const better = (a, b) => a.steps < b.steps || (a.steps === b.steps && a.turns < b.turns);

        const open = [{ x: startX, y: startY, prevDir: null, steps: 0, turns: 0 }];
        const best = new Map();
        const parent = new Map();

        best.set(stateKey(startX, startY, null), { steps: 0, turns: 0 });

        while (open.length) {
            let bestIndex = 0;
            for (let i = 1; i < open.length; i++) {
                if (better(open[i], open[bestIndex])) bestIndex = i;
            }
            const cur = open.splice(bestIndex, 1)[0];

            if (cur.x === destX && cur.y === destY) {
                return this.reconstructStatePath(parent, stateKey, startX, startY, destX, destY, cur.prevDir);
            }

            if (cur.steps >= maxSteps) continue;

            for (const d of dirs) {
                const nx = cur.x + d.dx;
                const ny = cur.y + d.dy;
                if (!this.isInBounds(nx, ny)) continue;

                if (this.board[nx][ny].length > 0 && !(nx === destX && ny === destY)) continue;

                const nextSteps = cur.steps + 1;
                const nextTurns = cur.prevDir && cur.prevDir !== d.dir ? cur.turns + 1 : cur.turns;

                const nKey = stateKey(nx, ny, d.dir);
                const candidate = { steps: nextSteps, turns: nextTurns };
                const existing = best.get(nKey);
                if (existing && !better(candidate, existing)) continue;

                best.set(nKey, candidate);
                parent.set(nKey, stateKey(cur.x, cur.y, cur.prevDir));
                open.push({ x: nx, y: ny, prevDir: d.dir, steps: nextSteps, turns: nextTurns });
            }
        }

        return null;
    }

    reconstructStatePath(parent, stateKey, startX, startY, destX, destY, endPrevDir) {
        const startKeys = new Set([
            stateKey(startX, startY, null),
            stateKey(startX, startY, 'N'),
            stateKey(startX, startY, 'NE'),
            stateKey(startX, startY, 'E'),
            stateKey(startX, startY, 'SE'),
            stateKey(startX, startY, 'S'),
            stateKey(startX, startY, 'SW'),
            stateKey(startX, startY, 'W'),
            stateKey(startX, startY, 'NW')
        ]);

        let curKey = stateKey(destX, destY, endPrevDir);
        const steps = [];

        while (!startKeys.has(curKey)) {
            const [xStr, yStr] = curKey.split(',');
            steps.push({ x: Number(xStr), y: Number(yStr) });

            curKey = parent.get(curKey);
            if (!curKey) return null;
        }

        steps.reverse();
        return steps;
    }

    updatePieceMovement(deltaTime) {
        for (const piece of this.pieces) {
            if (piece.state !== 'MOVING') continue;

            piece.walkAnimTime += deltaTime;

            const m = piece.move;
            if (!m) {
                piece.state = 'IDLE';
                continue;
            }

            m.stepT += deltaTime / m.stepDuration;
            if (m.stepT > 1) m.stepT = 1;

            const layout = this.boardLayout ?? this.computeBoardLayout();
            const fromPx = this.gridToCanvasCenter(m.from.x, m.from.y, layout);
            const toPx = this.gridToCanvasCenter(m.to.x, m.to.y, layout);

            piece.renderX = fromPx.x + (toPx.x - fromPx.x) * m.stepT;
            piece.renderY = fromPx.y + (toPx.y - fromPx.y) * m.stepT;

            const stepDx = m.to.x - m.from.x;
            const stepDy = m.to.y - m.from.y;
            piece.facing = this.directionFromDelta(stepDx, stepDy);

            if (m.stepT >= 1) {
                // Snap to tile center
                piece.col = m.to.x;
                piece.row = m.to.y;
                piece.remainingMove = Math.max(0, piece.remainingMove - 1);

                const nextIndex = m.stepIndex + 1;
                if (nextIndex >= m.path.length) {
                    const capture = m.capture;
                    // Finish movement
                    piece.state = 'IDLE';
                    piece.move = null;
                    piece.renderX = undefined;
                    piece.renderY = undefined;
                    piece.walkAnimTime = 0;

                    // Re-occupy the destination square.
                    this.board[piece.col][piece.row].push(piece);

                    if (capture) {
                        this.startCombat(capture);
                    } else {
                        this.endTurn();
                    }
                    continue;
                }

                // Continue to next step
                m.stepIndex = nextIndex;
                m.stepT = 0;
                m.from = { ...m.to };
                m.to = { x: m.path[nextIndex].x, y: m.path[nextIndex].y };
            }
        }
    }

    // Returns an array of tiles to step through (excluding start, including dest), or null.
    findPathWithinSteps(startX, startY, destX, destY, maxSteps, movingPiece) {
        const dirs = [
            { dx: 1, dy: 0 },
            { dx: 1, dy: 1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: -1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: -1 }
        ];

        const key = (x, y) => `${x},${y}`;
        const queue = [{ x: startX, y: startY }];
        const parent = new Map();
        const depth = new Map();
        depth.set(key(startX, startY), 0);

        while (queue.length) {
            const cur = queue.shift();
            const curKey = key(cur.x, cur.y);
            const curDepth = depth.get(curKey);
            if (curDepth >= maxSteps) continue;

            for (const d of dirs) {
                const nx = cur.x + d.dx;
                const ny = cur.y + d.dy;
                if (!this.isInBounds(nx, ny)) continue;

                // Cannot move through or land on occupied squares.
                const occStack = this.board[nx][ny];
                if (occStack.length > 0) continue;

                const nKey = key(nx, ny);
                if (depth.has(nKey)) continue;

                parent.set(nKey, curKey);
                depth.set(nKey, curDepth + 1);

                if (nx === destX && ny === destY) {
                    return this.reconstructPath(parent, startX, startY, destX, destY);
                }

                queue.push({ x: nx, y: ny });
            }
        }

        return null;
    }

    reconstructPath(parent, startX, startY, destX, destY) {
        const key = (x, y) => `${x},${y}`;

        const result = [];
        let curKey = key(destX, destY);

        while (curKey !== key(startX, startY)) {
            const [xStr, yStr] = curKey.split(',');
            result.push({ x: Number(xStr), y: Number(yStr) });
            curKey = parent.get(curKey);
            if (!curKey) return null;
        }

        result.reverse();
        return result;
    }

    directionFromDelta(dx, dy) {
        const sx = Math.sign(dx);
        const sy = Math.sign(dy);
        if (sx === 0 && sy === 0) return 'E';
        if (sx === 1 && sy === 0) return 'E';
        if (sx === 1 && sy === 1) return 'SE';
        if (sx === 0 && sy === 1) return 'S';
        if (sx === -1 && sy === 1) return 'SW';
        if (sx === -1 && sy === 0) return 'W';
        if (sx === -1 && sy === -1) return 'NW';
        if (sx === 0 && sy === -1) return 'N';
        return 'NE';
    }

    gridToCanvasCenter(x, y, layout) {
        return {
            x: layout.offsetX + x * layout.tileSize + layout.tileSize / 2,
            y: layout.offsetY + y * layout.tileSize + layout.tileSize / 2
        };
    }

    createEmptyBoard() {
        const board = [];
        for (let x = 0; x < this.boardSize; x++) {
            const col = [];
            for (let y = 0; y < this.boardSize; y++) {
                col.push([]);
            }
            board.push(col);
        }
        return board;
    }

    placePiecesOnBoard() {
        for (const p of this.pieces) {
            if (!this.isInBounds(p.col, p.row)) continue;
            this.board[p.col][p.row].push(p);
        }
    }

    isInBounds(x, y) {
        return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
    }

    drawKnightSprite(cx, cy, tileSize, facing, frameIndex) {
        this.drawWalkCycleSprite(this.knightSprite, cx, cy, tileSize, facing, frameIndex);
    }

    drawGoblinSprite(cx, cy, tileSize, facing, frameIndex) {
        this.drawWalkCycleSprite(this.goblinSprite, cx, cy, tileSize, facing, frameIndex);
    }

    drawWizardSprite(cx, cy, tileSize, facing, frameIndex) {
        this.drawWalkCycleSprite(this.wizardSprite, cx, cy, tileSize, facing, frameIndex);
    }

    drawWalkCycleSprite(sprite, cx, cy, tileSize, facing, frameIndex) {
        const dirIndex = sprite.directionOrder.indexOf(facing);
        const row = dirIndex >= 0 ? dirIndex : 0;
        const col = Math.max(0, Math.min(sprite.cols - 1, frameIndex));

        const sw = sprite.frameW;
        const sh = sprite.frameH;
        const sx = col * sw;
        const sy = row * sh;

        const intScale = Math.max(1, Math.floor(Math.min(tileSize / sw, tileSize / sh)));
        const dw = sw * intScale;
        const dh = sh * intScale;
        const dx = Math.floor(cx - dw / 2);
        const dy = Math.floor(cy - dh / 2);

        const prevSmoothing = this.ctx.imageSmoothingEnabled;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(sprite.img, sx, sy, sw, sh, dx, dy, dw, dh);
        this.ctx.imageSmoothingEnabled = prevSmoothing;
    }
    
    drawGamepadDebug() {
        if (this.gamepad) {
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '10px Courier New';
            this.ctx.textAlign = 'left';
            
            let y = 20;
            this.ctx.fillText('Gamepad Debug:', 10, y);
            y += 15;
            
            // Show button states
            for (let i = 0; i < Math.min(this.gamepad.buttons.length, 4); i++) {
                const pressed = this.gamepad.buttons[i].pressed ? 'ON' : 'OFF';
                this.ctx.fillText(`Button ${i}: ${pressed}`, 10, y);
                y += 12;
            }
            
            // Show axis states
            for (let i = 0; i < Math.min(this.gamepad.axes.length, 2); i++) {
                const value = this.gamepad.axes[i].toFixed(2);
                this.ctx.fillText(`Axis ${i}: ${value}`, 10, y);
                y += 12;
            }
        }
    }
    
    stop() {
        this.running = false;
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    const game = new ArchonGame();
});
