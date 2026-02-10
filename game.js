// ======================================================
// ARCHON GAME CONFIGURATION
// ======================================================
//
// This section contains all high-level game tuning values
// and setup data that define how the game behaves.
// These values are safe to modify without changing engine logic.
//
// Sections:
// Sprite Asset Configuration
// Global Combat Scaling
// Combat Timing Constants
// Strategy Movement Tuning
// Initial Board Setup
// Melee Weapon and Icon attachment data
//
// Engine logic begins below in the ArchonGame class.
// ======================================================

// Archon Clone - Main Game File
// Vanilla JavaScript ES6 + HTML5 Canvas

// –– Sprite Asset Configuration ––
//
// All sprite image paths are defined here.
// Users can swap sprite sheets without touching engine logic.
//
const SPRITE_PATHS = {
    Knight: {
        walk: [
            'assets/Knight Walk Cycle.png'
        ],
        attack: [
            'assets/Knight Attack.png'
        ]
    },
    Goblin: {
        walk: [
            'assets/Goblin Walk Cycle.png'
        ],
        attack: [
            'assets/Goblin Attack.png'
        ]
    },
    Wizard: {
        walk: [
            'assets/Wizard Walk Cycle.png'
        ],
        projectile: [
            'assets/Wizard Projectile.png'
        ]
    },
    Archer: {
        walk: [
            'assets/Archer Walk Cycle.png'
        ],
        projectile: [
            'assets/Archer Projectile.png'
        ]
    },
    Troll: {
        walk: [
            'assets/Troll Walk Cycle.png'
        ],
        projectile: [
            'assets/Troll Projectile.png'
        ]
    },
    Golem: {
        walk: [
            'assets/Golem Walk Cycle.png'
        ],
        projectile: [
            'assets/Golem Projectile.png'
        ]
    },
    Valkyrie: {
        walk: [
            'assets/Valkyrie Walk Cycle.png'
        ],
        projectile: [
            'assets/Valkyrie Projectile.png'
        ]
    },
    Manticore: {
        walk: [
            'assets/Manticore Walk Cycle.png'
        ],
        projectile: [
            'assets/Manticore Projectile.png'
        ]
    },
    Dragon: {
        walk: [
            'assets/Dragon Walk Cycle.png'
        ],
        projectile: [
            'assets/Dragon Projectile.png'
        ]
    },
    Djinn: {
        walk: [
            'assets/Djinn Walk Cycle.png'
        ],
        projectile: [
            'assets/Djinn Projectile.png'
        ]
    },
    Phoenix: {
        walk: [
            'assets/Phoenix Walk Cycle.png'
        ],
        explosion: [
            'assets/Phoenix Explosion.png'
        ]
    },
    Banshee: {
        walk: [
            'assets/Banshee Walk Cycle.png'
        ]
    }
};

// ---- Global Combat Scaling ----
//
// GLOBAL_MAX_HP defines the maximum possible HP value
// used to scale all combat HP bars visually.
// Should match the highest maxHP in UNIT_STATS (currently Dragon).
//
const GLOBAL_MAX_HP = 23.5;

// ---- Combat Timing Constants ----
//
// These control animation timing for aura-based attacks.
// Adjusting these changes visual feel but not damage math.
//
const AURA_EXPAND_DURATION   = 0.20;
const AURA_HOLD_DURATION     = 1.40;
const AURA_CONTRACT_DURATION = 0.25;

// ---- Strategy Movement Tuning ----
//
// Controls how long each tile step takes on the Strategy board.
//
const STRATEGY_STEP_DURATION = 0.18;

// ---- Initial Board Setup ----
//
// Defines the starting piece positions for both sides.
// Positions are in chess-style notation (A1–I9).
// Engine converts these to row/col internally.
//
const INITIAL_LIGHT_SETUP = [
  { type: 'Valkyrie', pos: 'A1' },
  { type: 'Archer', pos: 'B1' },
  { type: 'Golem', pos: 'A2' },
  { type: 'Knight', pos: 'B2', facing: 'E' },
  { type: 'Unicorn', pos: 'A3' },
  { type: 'Knight', pos: 'B3', facing: 'E' },
  { type: 'Djinn', pos: 'A4' },
  { type: 'Knight', pos: 'B4', facing: 'E' },
  { type: 'Wizard', pos: 'A5' },
  { type: 'Knight', pos: 'B5', facing: 'E' },
  { type: 'Phoenix', pos: 'A6' },
  { type: 'Knight', pos: 'B6', facing: 'E' },
  { type: 'Unicorn', pos: 'A7' },
  { type: 'Knight', pos: 'B7', facing: 'E' },
  { type: 'Golem', pos: 'A8' },
  { type: 'Knight', pos: 'B8', facing: 'E' },
  { type: 'Valkyrie', pos: 'A9' },
  { type: 'Archer', pos: 'B9' }
];

const INITIAL_DARK_SETUP = [
  { type: 'Manticore', pos: 'H1' },
  { type: 'Banshee', pos: 'I1' },
  { type: 'Goblin', pos: 'H2' },
  { type: 'Troll', pos: 'I2' },
  { type: 'Goblin', pos: 'H3' },
  { type: 'Basilisk', pos: 'I3' },
  { type: 'Goblin', pos: 'H4' },
  { type: 'Shape Shifter', pos: 'I4' },
  { type: 'Goblin', pos: 'H5' },
  { type: 'Sorceress', pos: 'I5' },
  { type: 'Goblin', pos: 'H6' },
  { type: 'Dragon', pos: 'I6' },
  { type: 'Goblin', pos: 'H7' },
  { type: 'Basilisk', pos: 'I7' },
  { type: 'Goblin', pos: 'H8' },
  { type: 'Troll', pos: 'I8' },
  { type: 'Manticore', pos: 'H9' },
  { type: 'Banshee', pos: 'I9' }
];

// ---- Melee Weapon and Icon attachment data ----
//
// The 64x64 sprites was not large enough to contain the full attack with Icon and weapon so the weapons are in a 
// separate PNG file.  This file matches the hand coordinates to the weapon coordinates.
//

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

const GOBLIN_CLUB_ANCHORS = {
  N:  { body: { x: 50, y: 20 }, club: { x: 41, y: 33 } },
  NE: { body: { x: 59, y: 25 }, club: { x: 1, y: 38 } },
  E:  { body: { x: 49, y: 35 }, club: { x: 2, y: 30 } },
  SE: { body: { x: 51, y: 51 }, club: { x: 1, y: 29 } },
  S:  { body: { x: 32, y: 63 }, club: { x: 26, y: 24 } },
  SW: { body: { x: 12, y: 46 }, club: { x: 39, y: 36 } },
  W:  { body: { x: 13, y: 36 }, club: { x: 37, y: 35 } },
  NW: { body: { x: 9, y: 22 }, club: { x: 35, y: 24 } }
};

const GOBLIN_CLUB_ANCHORS_FOR_OVERLAY = {
  N:  { body: GOBLIN_CLUB_ANCHORS.N.body,  sword: GOBLIN_CLUB_ANCHORS.N.club },
  NE: { body: GOBLIN_CLUB_ANCHORS.NE.body, sword: GOBLIN_CLUB_ANCHORS.NE.club },
  E:  { body: GOBLIN_CLUB_ANCHORS.E.body,  sword: GOBLIN_CLUB_ANCHORS.E.club },
  SE: { body: GOBLIN_CLUB_ANCHORS.SE.body, sword: GOBLIN_CLUB_ANCHORS.SE.club },
  S:  { body: GOBLIN_CLUB_ANCHORS.S.body,  sword: GOBLIN_CLUB_ANCHORS.S.club },
  SW: { body: GOBLIN_CLUB_ANCHORS.SW.body, sword: GOBLIN_CLUB_ANCHORS.SW.club },
  W:  { body: GOBLIN_CLUB_ANCHORS.W.body,  sword: GOBLIN_CLUB_ANCHORS.W.club },
  NW: { body: GOBLIN_CLUB_ANCHORS.NW.body, sword: GOBLIN_CLUB_ANCHORS.NW.club }
};

const BASE_PROJECTILE_SPEED = 1500;

const DEBUG_COLLISION = false;

// ---- Combat Stats for Each Icon ----
//
// Below are the comabt stats that can be changed for each Icon.  Melee is hand combat, Projectile is ranged attack, 
// Aura is area effect used by Banshee and Explosion is area damage used by the Phoenix
//

const UNIT_STATS = {
    Knight: {
        combatType: 'MELEE',
        maxHP: 11.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 240,
        attackDamage: 5,
        attackDuration: 0.35,
        attacksPerSecond: 1.5,
        meleeWidthH: 2,
        meleeWidthV: 4
    },
    Goblin: {
        combatType: 'MELEE',
        maxHP: 11.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 240,
        attackDamage: 5,
        attackDuration: 0.35,
        attacksPerSecond: 1.5,
        meleeWidthH: 2,
        meleeWidthV: 4
    },
    Wizard: {
        combatType: 'PROJECTILE',
        maxHP: 16.5,
        moveType: 'TELEPORT',
        moveRange: 3,
        speed: 240,
        attackDamage: 10,
        attackDuration: 0.35,
        attacksPerSecond: 0.75,
        shotSpeedMultiplier: 0.8,
        projectileWidthH: 6,
        projectileWidthV: 8
    },
    Archer: {
        combatType: 'PROJECTILE',
        maxHP: 11.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 240,
        attackDamage: 5,
        attackDuration: 0.35,
        attacksPerSecond: 1.2,
        shotSpeedMultiplier: 1.0,
        projectileWidthH: 6,
        projectileWidthV: 8
    },
    Banshee: {
        combatType: 'AURA',
        moveType: 'FLY',
        moveRange: 3,
        maxHP: 16.5,
        speed: 240,
        attackDamage: 0,
        attackDuration: 0.35,
        attacksPerSecond: 1,
        auraRadiusMultiplier: 0.85,
        auraDamagePerSecond: 5
    },
    Phoenix: {
        combatType: 'AURA',
        moveType: 'FLY',
        moveRange: 3,
        maxHP: 16.5,
        speed: 240,
        attackDamage: 0,
        attackDuration: 0.35,
        attacksPerSecond: 1,
        auraRadiusMultiplier: 0.85,
        auraDamagePerSecond: 5
    },
    Manticore: {
        combatType: 'PROJECTILE',
        maxHP: 14,
        moveType: 'WALK',
        moveRange: 3,
        speed: 220,
        attackDamage: 6,
        attackDuration: 0.35,
        attacksPerSecond: 1.0,
        shotSpeedMultiplier: 0.9,
        projectileWidthH: 8,
        projectileWidthV: 10
    },
    Golem: {
        combatType: 'PROJECTILE',
        maxHP: 10,
        moveType: 'WALK',
        moveRange: 3,
        speed: 200,
        attackDamage: 10,
        attackDuration: 0.35,
        attacksPerSecond: 1
    },
    Troll: {
        combatType: 'PROJECTILE',
        maxHP: 18.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 170,
        attackDamage: 8,
        attackDuration: 0.45,
        attacksPerSecond: 0.8,
        shotSpeedMultiplier: 0.7,
        projectileWidthH: 8,
        projectileWidthV: 10
    },
    Unicorn: {
        combatType: 'MELEE',
        maxHP: 10,
        moveType: 'WALK',
        moveRange: 3,
        speed: 200,
        attackDamage: 1,
        attackDuration: 0.35,
        attacksPerSecond: 1
    },
    Basilisk: {
        combatType: 'MELEE',
        maxHP: 10,
        moveType: 'WALK',
        moveRange: 3,
        speed: 200,
        attackDamage: 1,
        attackDuration: 0.35,
        attacksPerSecond: 1
    },
    Valkyrie: {
        combatType: 'PROJECTILE',
        maxHP: 10,
        moveType: 'FLY',
        moveRange: 3,
        speed: 220,
        attackDamage: 6,
        attackDuration: 0.35,
        attacksPerSecond: 1.0,
        shotSpeedMultiplier: 1.0,
        projectileWidthH: 6,
        projectileWidthV: 8
    },
    'Shape Shifter': {
        combatType: 'MELEE',
        maxHP: 10,
        moveType: 'FLY',
        moveRange: 3,
        speed: 200,
        attackDamage: 1,
        attackDuration: 0.35,
        attacksPerSecond: 1
    },
    Djinn: {
        combatType: 'PROJECTILE',
        maxHP: 12,
        moveType: 'FLY',
        moveRange: 3,
        speed: 230,
        attackDamage: 7,
        attackDuration: 0.35,
        attacksPerSecond: 1.0,
        shotSpeedMultiplier: 1.1,
        projectileWidthH: 6,
        projectileWidthV: 8
    },
    Dragon: {
        combatType: 'PROJECTILE',
        maxHP: 23.5,
        moveType: 'FLY',
        moveRange: 4,
        speed: 200,
        attackDamage: 8,
        attackDuration: 0.35,
        attacksPerSecond: 0.75,
        shotSpeedMultiplier: 1.0,
        projectileWidthH: 10,
        projectileWidthV: 14
    },
    Sorceress: {
        combatType: 'MELEE',
        maxHP: 10,
        moveType: 'TELEPORT',
        moveRange: 3,
        speed: 200,
        attackDamage: 1,
        attackDuration: 0.35,
        attacksPerSecond: 1
    }
};

class ArchonGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.auraCanvas = document.createElement('canvas');
        this.auraCtx = this.auraCanvas.getContext('2d');

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

        this.goblinClubSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 64,
            frameH: 64,
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

        this.phoenixSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.archerSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.archerProjectileSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.trollSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.trollProjectileSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.golemSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.golemProjectileSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.phoenixExplosionSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 3,
            frameW: 237,
            frameH: 128,
            directionOrder: []
        };

        this.bansheeSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.dragonSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.dragonProjectileSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.valkyrieSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.valkyrieProjectileSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.djinnSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.djinnProjectileSprite = {
            img: null,
            loaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.manticoreSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.manticoreProjectileSprite = {
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
        this.loadGoblinClubSprite();
        this.loadWizardSprite();
        this.loadWizardProjectileSprite();
        this.loadPhoenixSprite();
        this.loadArcherSprite();
        this.loadArcherProjectileSprite();
        this.loadTrollSprite();
        this.loadTrollProjectileSprite();
        this.loadGolemSprite();
        this.loadGolemProjectileSprite();
        this.loadPhoenixExplosionSprite();
        this.loadBansheeSprite();
        this.loadDragonSprite();
        this.loadDragonProjectileSprite();
        this.loadValkyrieSprite();
        this.loadValkyrieProjectileSprite();
        this.loadDjinnSprite();
        this.loadDjinnProjectileSprite();
        this.loadManticoreSprite();
        this.loadManticoreProjectileSprite();
        
        // Initialize
        this.init();
    }

    getCombatType(type) {
        return UNIT_STATS[type]?.combatType ?? 'MELEE';
    }

    getUnitStats(type) {
        return UNIT_STATS[type] ?? null;
    }

    calculateEffectiveMaxHP(piece) {
        const type = piece?.type;
        const baseHP = UNIT_STATS[type]?.maxHP;
        return baseHP;
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

        const arena = this.combat.arena ?? this.computeCombatArena();
        const spriteSize = this.combat.spriteSize ?? this.getCombatSpriteSize(arena.arenaW, arena.arenaH);
        const half = spriteSize / 2;

        this.combat.auraTime = (this.combat.auraTime ?? 0) + deltaTime;

        const lightActor = this.combat.lightActor;
        const darkActor = this.combat.darkActor;

        const lightPiece = this.getPieceById(this.combat.lightPieceId);
        const darkPiece = this.getPieceById(this.combat.darkPieceId);

        const lightCombatType = this.getCombatType(lightPiece?.type);
        const darkCombatType = this.getCombatType(darkPiece?.type);

        if (!this.combat.projectiles) this.combat.projectiles = [];

        const updateAttackTimer = (actor) => {
            if (!actor?.isAttacking) return;
            if (actor.auraPhase) return;
            if ((actor.auraState ?? 'idle') !== 'idle') return;
            actor.attackTimeLeft = (actor.attackTimeLeft ?? 0) - deltaTime;
            if (actor.attackTimeLeft <= 0) {
                actor.isAttacking = false;
                actor.attackTimeLeft = 0;
                actor.didDamageThisAttack = false;
            }
        };

        const updatePhoenixExplosion = (actor) => {
            if (!actor) return;
            if ((actor.auraState ?? 'idle') === 'idle') return;

            actor.auraTimer = (actor.auraTimer ?? 0) + deltaTime;
            const t = actor.auraTimer ?? 0;

            if (t < 0.17) {
                actor.auraState = 'expanding';
                actor.auraFrameIndex = 0;
            } else if (t < 0.34) {
                actor.auraState = 'expanding';
                actor.auraFrameIndex = 1;
            } else if (t < 0.50) {
                actor.auraState = 'expanding';
                actor.auraFrameIndex = 2;
            } else if (t < 0.80) {
                actor.auraState = 'hold';
                actor.auraFrameIndex = 2;
            } else if (t < 0.97) {
                actor.auraState = 'collapsing';
                actor.auraFrameIndex = 1;
            } else if (t < 1.14) {
                actor.auraState = 'collapsing';
                actor.auraFrameIndex = 0;
            } else {
                actor.auraState = 'idle';
                actor.auraTimer = 0;
                actor.auraFrameIndex = 0;
                actor.isAttacking = false;
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

        const startAttack = (actor, piece) => {
            if (!actor) return;
            if ((actor.attackCooldownLeft ?? 0) > 0) return;
            if (actor.isAttacking) return;

            const stats = UNIT_STATS[piece?.type];
            if (!stats) return;
            const attackDuration = stats.attackDuration;

            actor.isAttacking = true;
            actor.attackTimeLeft = attackDuration;
            actor.didDamageThisAttack = false;
            actor.isMoving = false;
            actor.walkAnimTime = 0;
            actor.attackCooldownLeft = 1 / stats.attacksPerSecond;
        };

        const startAuraAttack = (actor) => {
            if (!actor) return;
            if ((actor.attackCooldownLeft ?? 0) > 0) return;
            if (actor.isAttacking) return;

            actor.isAttacking = true;
            actor.isMoving = false;
            actor.walkAnimTime = 0;

            actor.auraTime = 0;
            actor.auraPhase = 'EXPAND';
            actor.auraPhaseTime = 0;
            actor.auraProgress = 0;

            actor.attackCooldownLeft = 0.5;
        };

        const startPhoenixExplosion = (actor) => {
            if (!actor) return;
            if ((actor.attackCooldownLeft ?? 0) > 0) return;
            if ((actor.auraState ?? 'idle') !== 'idle') return;

            actor.isAttacking = true;
            actor.isMoving = false;
            actor.walkAnimTime = 0;

            actor.auraState = 'expanding';
            actor.auraTimer = 0;
            actor.auraFrameIndex = 0;

            actor.attackCooldownLeft = 0.5;
        };

        const updateAuraAttack = (actor) => {
            if (!actor?.isAttacking) return;
            if (!actor.auraPhase) return;

            actor.auraTime = (actor.auraTime ?? 0) + deltaTime;
            actor.auraPhaseTime = (actor.auraPhaseTime ?? 0) + deltaTime;

            if (actor.auraPhase === 'EXPAND') {
                actor.auraProgress = (actor.auraPhaseTime ?? 0) / AURA_EXPAND_DURATION;
                if (actor.auraProgress >= 1) {
                    actor.auraProgress = 1;
                    actor.auraPhase = 'HOLD';
                    actor.auraPhaseTime = 0;
                }
            } else if (actor.auraPhase === 'HOLD') {
                actor.auraProgress = 1;
                if ((actor.auraPhaseTime ?? 0) >= AURA_HOLD_DURATION) {
                    actor.auraPhase = 'CONTRACT';
                    actor.auraPhaseTime = 0;
                }
            } else if (actor.auraPhase === 'CONTRACT') {
                actor.auraProgress = 1 - ((actor.auraPhaseTime ?? 0) / AURA_CONTRACT_DURATION);
                if (actor.auraProgress <= 0) {
                    actor.isAttacking = false;
                    actor.auraProgress = 0;
                    actor.auraPhase = null;
                    actor.auraPhaseTime = 0;
                }
            }
        };

        const trySpawnProjectile = (actor, ownerSide) => {
            if (!actor) return;

            const shooterPiece = ownerSide === 'light' ? lightPiece : darkPiece;
            const shooterStats = UNIT_STATS[shooterPiece?.type];
            if (!shooterStats) return;
            if ((shooterStats?.combatType ?? 'MELEE') !== 'PROJECTILE') return;
            const shotSpeedMultiplier = shooterStats?.shotSpeedMultiplier ?? 1.0;
            const projectileSpeed = BASE_PROJECTILE_SPEED * shotSpeedMultiplier;

            if ((actor.attackCooldownLeft ?? 0) > 0) return;
            startAttack(actor, shooterPiece);

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

            const wH = shooterStats?.projectileWidthH ?? 6;
            const wV = shooterStats?.projectileWidthV ?? 8;
            let w = Math.floor((wH + wV) / 2);
            let h = Math.floor((wH + wV) / 2);
            if (isHoriz) {
                w = wH;
                h = wV;
            } else if (isVert) {
                w = wV;
                h = wH;
            } else if (isDiag) {
                w = Math.floor((wH + wV) / 2);
                h = Math.floor((wH + wV) / 2);
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
                damage: shooterStats.attackDamage,
                shooterType: shooterPiece?.type,
                ownerSide
            });
        };

        if (this.keys['Space']) {
            this.keys['Space'] = false;
            if (lightCombatType === 'PROJECTILE') {
                trySpawnProjectile(lightActor, 'light');
            } else if (lightCombatType === 'AURA') {
                if (lightPiece?.type === 'Phoenix') {
                    startPhoenixExplosion(lightActor);
                } else {
                    startAuraAttack(lightActor);
                }
            } else {
                startAttack(lightActor, lightPiece);
            }
        }

        if (this.keys['Enter'] || this.keys['NumpadEnter']) {
            this.keys['Enter'] = false;
            this.keys['NumpadEnter'] = false;
            if (darkCombatType === 'PROJECTILE') {
                trySpawnProjectile(darkActor, 'dark');
            } else if (darkCombatType === 'AURA') {
                if (darkPiece?.type === 'Phoenix') {
                    startPhoenixExplosion(darkActor);
                } else {
                    startAuraAttack(darkActor);
                }
            } else {
                startAttack(darkActor, darkPiece);
            }
        }

        if (lightCombatType === 'AURA') {
            if (lightPiece?.type === 'Phoenix') updatePhoenixExplosion(lightActor);
            else updateAuraAttack(lightActor);
        }
        if (darkCombatType === 'AURA') {
            if (darkPiece?.type === 'Phoenix') updatePhoenixExplosion(darkActor);
            else updateAuraAttack(darkActor);
        }

        const clampToArena = (actor) => {
            if (!actor) return;
            actor.x = Math.max(arena.ax + half, Math.min(arena.ax + arena.arenaW - half, actor.x));
            actor.y = Math.max(arena.ay + half, Math.min(arena.ay + arena.arenaH - half, actor.y));
        };

        const moveActor = (actor, piece, dx, dy) => {
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
            const stats = UNIT_STATS[piece?.type];
            const speed = stats?.speed ?? 200;
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
            moveActor(l, lightPiece, dx, dy);
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
            moveActor(d, darkPiece, dx, dy);
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

        const tryApplyAttackDamage = (attackerActor, attackerPiece, defenderActor) => {
            if (!attackerActor?.isAttacking) return false;
            if (attackerActor.didDamageThisAttack) return false;
            if (!defenderActor) return false;

            const zone = attackZone(attackerActor);
            const defHB = actorHitbox(defenderActor);
            if (!rectsOverlap(zone, defHB)) return false;

            const stats = UNIT_STATS[attackerPiece?.type];
            if (!stats) return false;
            const damage = stats.attackDamage;

            defenderActor.currentHP = (defenderActor.currentHP ?? 0) - damage;
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

        {
            const applyAuraDps = (actor, actorPiece, opponentActor) => {
                if (!actor?.isAttacking) return;
                if (actorPiece?.type === 'Phoenix') return;
                const prog = actor.auraProgress ?? 0;
                if (prog <= 0.25) return;
                if (!opponentActor) return;

                const rx = ((spriteSize * 3.5) / 2) * prog;
                const ry = ((spriteSize * 1.75) / 2) * prog;
                if (rx <= 0 || ry <= 0) return;

                const dx = opponentActor.x - actor.x;
                const dy = opponentActor.y - actor.y;
                const inside = ((dx * dx) / (rx * rx)) + ((dy * dy) / (ry * ry)) <= 1;
                if (!inside) return;

                const stats = UNIT_STATS[actorPiece?.type];
                const DPS = stats?.auraDamagePerSecond ?? 12;
                opponentActor.currentHP = (opponentActor.currentHP ?? 0) - (DPS * deltaTime);
            };

            if (lightCombatType === 'AURA') applyAuraDps(lightActor, lightPiece, darkActor);
            if (darkCombatType === 'AURA') applyAuraDps(darkActor, darkPiece, lightActor);
        }

        {
            const applyPhoenixExplosionDps = (actor, actorPiece, opponentActor) => {
                if (actorPiece?.type !== 'Phoenix') return;
                if (!actor) return;
                if ((actor.auraState ?? 'idle') === 'idle') return;
                if (!opponentActor) return;

                const intScale = Math.max(1, Math.floor(spriteSize / 64));
                const radius = (237 / 2) * intScale * 0.9;
                const dx = opponentActor.x - actor.x;
                const dy = opponentActor.y - actor.y;
                const dist = Math.hypot(dx, dy);
                if (dist >= radius) return;

                const stats = UNIT_STATS[actorPiece?.type];
                const DPS = stats?.auraDamagePerSecond ?? 12;
                opponentActor.currentHP = (opponentActor.currentHP ?? 0) - (DPS * deltaTime);
            };

            applyPhoenixExplosionDps(lightActor, lightPiece, darkActor);
            applyPhoenixExplosionDps(darkActor, darkPiece, lightActor);
        }

        if (lightActor && darkActor) {
            if (lightCombatType === 'MELEE') {
                const darkKilled = tryApplyAttackDamage(lightActor, lightPiece, darkActor);
                if (darkKilled) {
                    this.resolveCombat({ winnerId: this.combat.lightPieceId, loserId: this.combat.darkPieceId });
                    return;
                }
            }

            if (darkCombatType === 'MELEE') {
                const lightKilled = tryApplyAttackDamage(darkActor, darkPiece, lightActor);
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

        if (lightPiece && lightPiece.type === 'Phoenix' && (combatLight?.auraState ?? 'idle') !== 'idle') {
            this.drawPhoenixExplosion(combatLight, spriteSize);
        } else if (lightPiece && this.getCombatType(lightPiece.type) === 'AURA' && combatLight?.isAttacking) {
            this.drawAuraShimmer(combatLight, lightPiece, spriteSize);
        }

        if (darkPiece && darkPiece.type === 'Phoenix' && (combatDark?.auraState ?? 'idle') !== 'idle') {
            this.drawPhoenixExplosion(combatDark, spriteSize);
        } else if (darkPiece && this.getCombatType(darkPiece.type) === 'AURA' && combatDark?.isAttacking) {
            this.drawAuraShimmer(combatDark, darkPiece, spriteSize);
        }

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

        if (this.combat.projectiles && this.combat.projectiles.length > 0) {
            const projDrawSize = Math.max(8, Math.floor(spriteSize * 0.55));
            for (const p of this.combat.projectiles) {
                const shooterType = p.shooterType;
                const sprite = shooterType === 'Archer'
                    ? this.archerProjectileSprite
                    : shooterType === 'Wizard'
                        ? this.wizardProjectileSprite
                        : shooterType === 'Troll'
                            ? this.trollProjectileSprite
                        : shooterType === 'Golem'
                            ? this.golemProjectileSprite
                        : shooterType === 'Manticore'
                            ? this.manticoreProjectileSprite
                        : shooterType === 'Dragon'
                            ? this.dragonProjectileSprite
                            : shooterType === 'Valkyrie'
                                ? this.valkyrieProjectileSprite
                                : shooterType === 'Djinn'
                                    ? this.djinnProjectileSprite
                            : null;

                if (sprite?.loaded) {
                    this.drawWalkCycleSprite(sprite, p.x, p.y, projDrawSize, p.direction ?? 'E', 0);
                } else {
                    const r = Math.max(3, Math.floor(projDrawSize * 0.18));
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                    this.ctx.fill();
                }
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
            const maxHP = Math.max(0, actor.maxHP ?? 0);
            const curHP = Math.max(0, Math.min(maxHP, actor.currentHP ?? maxHP));

            const totalHeight = Math.max(0, Math.min(barH, Math.floor(barH * (maxHP / GLOBAL_MAX_HP))));
            const hpRatio = maxHP > 0 ? Math.max(0, Math.min(1, curHP / maxHP)) : 0;
            const fillH = Math.floor(totalHeight * hpRatio);

            const barTopY = bottom - totalHeight;
            const fillY = bottom - fillH;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
            this.ctx.fillRect(x, barTopY, barW, totalHeight);

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
        if (piece.type === 'Phoenix' && this.phoenixSprite.loaded) {
            this.drawWalkCycleSprite(this.phoenixSprite, cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Archer' && this.archerSprite.loaded) {
            this.drawArcherSprite(cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Golem' && this.golemSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            this.drawWalkCycleSprite(this.golemSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Troll' && this.trollSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            this.drawWalkCycleSprite(this.trollSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Banshee' && this.bansheeSprite.loaded) {
            this.drawWalkCycleSprite(this.bansheeSprite, cx, cy, spriteSize, facing ?? 'W', frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Dragon' && this.dragonSprite.loaded) {
            this.drawWalkCycleSprite(this.dragonSprite, cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Valkyrie' && this.valkyrieSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            this.drawWalkCycleSprite(this.valkyrieSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Djinn' && this.djinnSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            this.drawWalkCycleSprite(this.djinnSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0);
            return;
        }
        if (piece.type === 'Manticore' && this.manticoreSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            this.drawWalkCycleSprite(this.manticoreSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0);
            return;
        }

        const radius = Math.max(18, Math.floor(spriteSize * 0.35));
        this.drawCombatMarker(piece, cx, cy, radius);
    }

    drawAuraShimmer(actor, piece, spriteSize) {
        const prog = Math.max(0, Math.min(1, actor?.auraProgress ?? 0));
        if (!actor?.isAttacking) return;
        if (prog <= 0) return;

        const maxW = spriteSize * 3.5;
        const maxH = spriteSize * 1.75;
        const curW = maxW * prog;
        const curH = maxH * prog;

        const halfW = curW / 2;

        const bandProfile = [
            0.15, 0.35, 0.55, 0.75, 0.95, 1.00, 0.95, 0.75, 0.55, 0.35, 0.15
        ];
        const bandCount = bandProfile.length;
        const bandSpacing = bandCount > 1 ? (curH / (bandCount - 1)) : 0;
        const lineThickness = Math.max(2, Math.floor(spriteSize * 0.04));

        const color = 'rgb(102,169,229)';

        const pad = 16;
        const wCanvas = Math.ceil(maxW) + pad * 2;
        const hCanvas = Math.ceil(maxH) + pad * 2;
        this.auraCanvas.width = wCanvas;
        this.auraCanvas.height = hCanvas;

        const aCtx = this.auraCtx;
        aCtx.clearRect(0, 0, wCanvas, hCanvas);

        const cx = Math.floor(wCanvas / 2);
        const cy = Math.floor(hCanvas / 2);

        const shimmerPhase = Math.floor((this.combat?.auraTime ?? 0) * 24) % 2;
        const rects = [];

        for (let i = 0; i < bandCount; i++) {
            const ratio = bandProfile[i];
            const bandHalfWidth = halfW * ratio;
            const y = cy + (i - (bandCount - 1) / 2) * bandSpacing;
            let x = Math.floor(cx - bandHalfWidth);
            let w = Math.floor(bandHalfWidth * 2);
            const yInt = Math.floor(y);
            const h = lineThickness;

            if (shimmerPhase === 1 && ratio >= 0.75) {
                x -= 4;
                w += 8;
            }

            if (w <= 0) continue;
            rects.push({ x, y: yInt, w, h });
        }

        aCtx.save();
        const prevSmoothing = aCtx.imageSmoothingEnabled;
        aCtx.imageSmoothingEnabled = false;
        aCtx.fillStyle = color;

        const bloomOffsets = [-3, -2, -1, 1, 2, 3];
        aCtx.globalAlpha = 0.08;
        for (const ox of bloomOffsets) {
            for (const r of rects) {
                aCtx.fillRect(r.x + ox, r.y, r.w, r.h);
            }
        }

        aCtx.globalAlpha = 1.0;
        for (const r of rects) {
            aCtx.fillRect(r.x, r.y, r.w, r.h);
        }

        aCtx.globalCompositeOperation = 'destination-out';
        {
            const type = piece?.type;
            let sprite = null;
            if (type === 'Banshee' && this.bansheeSprite?.loaded) sprite = this.bansheeSprite;
            if (type === 'Wizard' && this.wizardSprite?.loaded) sprite = this.wizardSprite;
            if (type === 'Archer' && this.archerSprite?.loaded) sprite = this.archerSprite;
            if (type === 'Knight' && this.knightSprite?.loaded) sprite = this.knightSprite;
            if (type === 'Goblin' && this.goblinSprite?.loaded) sprite = this.goblinSprite;

            if (sprite?.loaded && sprite.frameW > 0 && sprite.frameH > 0) {
                const facing = actor.facing ?? (piece?.side === 'dark' ? 'W' : 'E');
                const dirIndex = sprite.directionOrder.indexOf(facing);
                const row = dirIndex >= 0 ? dirIndex : 0;
                const frameIndex = actor?.isAttacking ? 3 : 0;

                const sw = sprite.frameW;
                const sh = sprite.frameH;
                const sx = frameIndex * sw;
                const sy = row * sh;

                const intScale = Math.max(1, Math.floor(Math.min(spriteSize / sw, spriteSize / sh)));
                const dw = sw * intScale;
                const dh = sh * intScale;
                const dx = Math.floor(cx - dw / 2);
                const dy = Math.floor(cy - dh / 2);

                aCtx.drawImage(sprite.img, sx, sy, sw, sh, dx, dy, dw, dh);
            } else {
                const r = Math.max(6, Math.floor(spriteSize * 0.32));
                aCtx.beginPath();
                aCtx.arc(cx, cy, r, 0, Math.PI * 2);
                aCtx.fill();
            }
        }
        aCtx.globalCompositeOperation = 'source-over';

        aCtx.globalCompositeOperation = 'source-atop';
        aCtx.fillStyle = 'rgba(0,0,0,0.10)';
        for (let y = 0; y < hCanvas; y += 2) {
            aCtx.fillRect(0, y, wCanvas, 1);
        }
        aCtx.globalCompositeOperation = 'source-over';

        aCtx.imageSmoothingEnabled = prevSmoothing;
        aCtx.restore();

        this.ctx.save();
        const prevMainSmoothing = this.ctx.imageSmoothingEnabled;
        this.ctx.imageSmoothingEnabled = false;
        const drawX = Math.floor(actor.x - wCanvas / 2);
        const drawY = Math.floor(actor.y - hCanvas / 2);
        this.ctx.drawImage(this.auraCanvas, drawX, drawY);
        this.ctx.imageSmoothingEnabled = prevMainSmoothing;
        this.ctx.restore();
    }

    drawCombatOverlayForPiece(piece, actor, spriteSize) {
        if (!piece || !actor) return;
        if (!actor.isAttacking) return;

        if (piece.type === 'Knight') {
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

        if (piece.type === 'Goblin') {
            if (!this.goblinSprite.loaded) return;
            if (!this.goblinClubSprite.loaded) return;
            this.drawAnchoredOverlay(
                this.goblinSprite,
                this.goblinClubSprite,
                GOBLIN_CLUB_ANCHORS_FOR_OVERLAY,
                actor.x,
                actor.y,
                spriteSize,
                actor.facing ?? 'E'
            );
        }
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

        const lightPiece = attackerPiece?.side === 'light' ? attackerPiece : defenderPiece;
        const darkPiece = attackerPiece?.side === 'dark' ? attackerPiece : defenderPiece;

        const lightPieceId = lightPiece?.id;
        const darkPieceId = darkPiece?.id;

        const lightHP = this.calculateEffectiveMaxHP(lightPiece);
        const darkHP = this.calculateEffectiveMaxHP(darkPiece);

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
            lightActor: { x: leftX, y: midY, facing: 'E', side: 'light', maxHP: lightHP ?? 0, currentHP: lightHP ?? 0, walkAnimTime: 0, isMoving: false, isAttacking: false, attackTimeLeft: 0, didDamageThisAttack: false, attackCooldownLeft: 0, auraState: 'idle', auraTimer: 0, auraFrameIndex: 0 },
            darkActor: { x: rightX, y: midY, facing: 'W', side: 'dark', maxHP: darkHP ?? 0, currentHP: darkHP ?? 0, walkAnimTime: 0, isMoving: false, isAttacking: false, attackTimeLeft: 0, didDamageThisAttack: false, attackCooldownLeft: 0, auraState: 'idle', auraTimer: 0, auraFrameIndex: 0 }
        };
    }

    drawPhoenixExplosion(actor, spriteSize) {
        if (!actor) return;
        if (!this.phoenixExplosionSprite?.loaded) return;
        const frameIndex = Math.max(0, Math.min(2, actor.auraFrameIndex ?? 0));

        const intScale = Math.max(1, Math.floor(spriteSize / 64));
        const drawW = 237 * intScale;
        const drawH = 128 * intScale;
        const dx = Math.floor(actor.x - drawW / 2);
        const dy = Math.floor(actor.y - drawH / 2);

        const sx = 0;
        const sy = frameIndex * 128;

        this.ctx.save();
        const prevSmoothing = this.ctx.imageSmoothingEnabled;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(this.phoenixExplosionSprite.img, sx, sy, 237, 128, dx, dy, drawW, drawH);
        this.ctx.imageSmoothingEnabled = prevSmoothing;
        this.ctx.restore();
    }

    loadPhoenixExplosionSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Phoenix.explosion;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.phoenixExplosionSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 3;
            if (!Number.isInteger(frameH)) {
                this.phoenixExplosionSprite.loaded = false;
                return;
            }

            this.phoenixExplosionSprite.img = img;
            this.phoenixExplosionSprite.cols = 1;
            this.phoenixExplosionSprite.rows = 3;
            this.phoenixExplosionSprite.frameW = img.width;
            this.phoenixExplosionSprite.frameH = frameH;
            this.phoenixExplosionSprite.loaded = this.phoenixExplosionSprite.frameW > 0 && this.phoenixExplosionSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadDjinnSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Djinn.walk;

        this.loadWalkCycleSpriteSheet(
            this.djinnSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadDjinnProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Djinn.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.djinnProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.djinnProjectileSprite.loaded = false;
                return;
            }

            this.djinnProjectileSprite.img = img;
            this.djinnProjectileSprite.cols = 1;
            this.djinnProjectileSprite.rows = 8;
            this.djinnProjectileSprite.frameW = img.width;
            this.djinnProjectileSprite.frameH = frameH;
            this.djinnProjectileSprite.loaded = this.djinnProjectileSprite.frameW > 0 && this.djinnProjectileSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadManticoreSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Manticore.walk;

        this.loadWalkCycleSpriteSheet(
            this.manticoreSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadManticoreProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Manticore.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.manticoreProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.manticoreProjectileSprite.loaded = false;
                return;
            }

            this.manticoreProjectileSprite.img = img;
            this.manticoreProjectileSprite.cols = 1;
            this.manticoreProjectileSprite.rows = 8;
            this.manticoreProjectileSprite.frameW = img.width;
            this.manticoreProjectileSprite.frameH = frameH;
            this.manticoreProjectileSprite.loaded = this.manticoreProjectileSprite.frameW > 0 && this.manticoreProjectileSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadValkyrieSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Valkyrie.walk;

        this.loadWalkCycleSpriteSheet(
            this.valkyrieSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadValkyrieProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Valkyrie.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.valkyrieProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.valkyrieProjectileSprite.loaded = false;
                return;
            }

            this.valkyrieProjectileSprite.img = img;
            this.valkyrieProjectileSprite.cols = 1;
            this.valkyrieProjectileSprite.rows = 8;
            this.valkyrieProjectileSprite.frameW = img.width;
            this.valkyrieProjectileSprite.frameH = frameH;
            this.valkyrieProjectileSprite.loaded = this.valkyrieProjectileSprite.frameW > 0 && this.valkyrieProjectileSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadDragonSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Dragon.walk;

        this.loadWalkCycleSpriteSheet(
            this.dragonSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadDragonProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Dragon.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.dragonProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.dragonProjectileSprite.loaded = false;
                return;
            }

            this.dragonProjectileSprite.img = img;
            this.dragonProjectileSprite.cols = 1;
            this.dragonProjectileSprite.rows = 8;
            this.dragonProjectileSprite.frameW = img.width;
            this.dragonProjectileSprite.frameH = frameH;
            this.dragonProjectileSprite.loaded = this.dragonProjectileSprite.frameW > 0 && this.dragonProjectileSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
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

                if (winner.side === 'light') {
                    winner.facing = 'E';
                } else if (winner.side === 'dark') {
                    winner.facing = 'W';
                }

                winner.state = 'IDLE';
                winner.walkAnimTime = 0;
                winner.renderX = undefined;
                winner.renderY = undefined;
                winner.remainingMove = 0;

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
        return INITIAL_LIGHT_SETUP.map((p, index) => ({
            id: `p${index}`,
            facing: 'E',
            state: 'IDLE',
            remainingMove: 0,
            walkAnimTime: 0,
            side: 'light',
            ...p,
            ...this.gridPosToRowCol(p.pos)
        }));
    }

    createInitialPiecesDark() {
        return INITIAL_DARK_SETUP.map((p, index) => ({
            id: `d${index}`,
            facing: 'W',
            state: 'IDLE',
            remainingMove: 0,
            walkAnimTime: 0,
            side: 'dark',
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

            if (piece.type === 'Phoenix' && this.phoenixSprite.loaded) {
                let walkFrame = 0;
                if (piece.state === 'MOVING') {
                    const stats = this.getUnitStats(piece?.type);
                    if (stats?.moveType === 'FLY' && piece.move) {
                        walkFrame = Math.floor(((piece.move.stepT ?? 0) * 6)) % 3;
                    } else {
                        walkFrame = Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3));
                    }
                }
                this.drawWalkCycleSprite(this.phoenixSprite, cx, cy, tileSize, piece.facing ?? 'E', walkFrame);
                continue;
            }

            if (piece.type === 'Archer' && this.archerSprite.loaded) {
                const walkFrame = piece.state === 'MOVING'
                    ? Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3))
                    : 0;
                this.drawArcherSprite(cx, cy, tileSize, piece.facing ?? 'E', walkFrame);
                continue;
            }

            if (piece.type === 'Golem' && this.golemSprite.loaded) {
                const walkFrame = piece.state === 'MOVING'
                    ? Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3))
                    : 0;
                const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
                this.drawWalkCycleSprite(this.golemSprite, cx, cy, tileSize, piece.facing ?? defaultFacing, walkFrame);
                continue;
            }

            if (piece.type === 'Troll' && this.trollSprite.loaded) {
                const walkFrame = piece.state === 'MOVING'
                    ? Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3))
                    : 0;
                const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
                this.drawWalkCycleSprite(this.trollSprite, cx, cy, tileSize, piece.facing ?? defaultFacing, walkFrame);
                continue;
            }

            if (piece.type === 'Manticore' && this.manticoreSprite.loaded) {
                const walkFrame = piece.state === 'MOVING'
                    ? Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3))
                    : 0;
                const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
                this.drawWalkCycleSprite(this.manticoreSprite, cx, cy, tileSize, piece.facing ?? defaultFacing, walkFrame);
                continue;
            }

            if (piece.type === 'Banshee' && this.bansheeSprite.loaded) {
                let walkFrame = 0;
                if (piece.state === 'MOVING') {
                    const stats = this.getUnitStats(piece?.type);
                    if (stats?.moveType === 'FLY' && piece.move) {
                        walkFrame = Math.floor(((piece.move.stepT ?? 0) * 6)) % 3;
                    } else {
                        walkFrame = Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3));
                    }
                }
                this.drawWalkCycleSprite(this.bansheeSprite, cx, cy, tileSize, piece.facing ?? 'W', walkFrame);
                continue;
            }

            if (piece.type === 'Dragon' && this.dragonSprite.loaded) {
                let walkFrame = 0;
                if (piece.state === 'MOVING') {
                    const stats = this.getUnitStats(piece?.type);
                    if (stats?.moveType === 'FLY' && piece.move) {
                        walkFrame = Math.floor(((piece.move.stepT ?? 0) * 6)) % 3;
                    } else {
                        walkFrame = Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3));
                    }
                }
                const facing = piece.facing ?? (piece.side === 'dark' ? 'W' : 'E');
                this.drawWalkCycleSprite(this.dragonSprite, cx, cy, tileSize, facing, walkFrame);
                continue;
            }

            if (piece.type === 'Valkyrie' && this.valkyrieSprite.loaded) {
                let walkFrame = 0;
                if (piece.state === 'MOVING') {
                    const stats = this.getUnitStats(piece?.type);
                    if (stats?.moveType === 'FLY' && piece.move) {
                        walkFrame = Math.floor(((piece.move.stepT ?? 0) * 6)) % 3;
                    } else {
                        walkFrame = Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3));
                    }
                }
                const facing = piece.facing ?? (piece.side === 'dark' ? 'W' : 'E');
                this.drawWalkCycleSprite(this.valkyrieSprite, cx, cy, tileSize, facing, walkFrame);
                continue;
            }

            if (piece.type === 'Djinn' && this.djinnSprite.loaded) {
                let walkFrame = 0;
                if (piece.state === 'MOVING') {
                    const stats = this.getUnitStats(piece?.type);
                    if (stats?.moveType === 'FLY' && piece.move) {
                        walkFrame = Math.floor(((piece.move.stepT ?? 0) * 6)) % 3;
                    } else {
                        walkFrame = Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3));
                    }
                }
                const facing = piece.facing ?? (piece.side === 'dark' ? 'W' : 'E');
                this.drawWalkCycleSprite(this.djinnSprite, cx, cy, tileSize, facing, walkFrame);
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
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Knight.walk;

        this.loadWalkCycleSpriteSheet(
            this.knightSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadKnightSwordSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Knight.attack;

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

    loadTrollSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Troll.walk;

        this.loadWalkCycleSpriteSheet(
            this.trollSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadTrollProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Troll.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.trollProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.trollProjectileSprite.loaded = false;
                return;
            }

            this.trollProjectileSprite.img = img;
            this.trollProjectileSprite.cols = 1;
            this.trollProjectileSprite.rows = 8;
            this.trollProjectileSprite.frameW = img.width;
            this.trollProjectileSprite.frameH = frameH;
            this.trollProjectileSprite.loaded = this.trollProjectileSprite.frameW > 0 && this.trollProjectileSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadGolemSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Golem.walk;

        this.loadWalkCycleSpriteSheet(
            this.golemSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadGolemProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Golem.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.golemProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.golemProjectileSprite.loaded = false;
                return;
            }

            this.golemProjectileSprite.img = img;
            this.golemProjectileSprite.cols = 1;
            this.golemProjectileSprite.rows = 8;
            this.golemProjectileSprite.frameW = img.width;
            this.golemProjectileSprite.frameH = frameH;
            this.golemProjectileSprite.loaded = this.golemProjectileSprite.frameW > 0 && this.golemProjectileSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadGoblinClubSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Goblin.attack;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.goblinClubSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.goblinClubSprite.loaded = false;
                return;
            }

            this.goblinClubSprite.img = img;
            this.goblinClubSprite.cols = 1;
            this.goblinClubSprite.rows = 8;
            this.goblinClubSprite.frameW = img.width;
            this.goblinClubSprite.frameH = frameH;
            this.goblinClubSprite.loaded = this.goblinClubSprite.frameW > 0 && this.goblinClubSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadBansheeSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Banshee.walk;

        this.loadWalkCycleSpriteSheet(
            this.bansheeSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadPhoenixSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Phoenix.walk;

        this.loadWalkCycleSpriteSheet(
            this.phoenixSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadArcherSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Archer.walk;

        this.loadWalkCycleSpriteSheet(
            this.archerSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadArcherProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Archer.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.archerProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.archerProjectileSprite.loaded = false;
                return;
            }

            this.archerProjectileSprite.img = img;
            this.archerProjectileSprite.cols = 1;
            this.archerProjectileSprite.rows = 8;
            this.archerProjectileSprite.frameW = img.width;
            this.archerProjectileSprite.frameH = frameH;
            this.archerProjectileSprite.loaded = this.archerProjectileSprite.frameW > 0 && this.archerProjectileSprite.frameH > 0;
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadGoblinSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Goblin.walk;

        this.loadWalkCycleSpriteSheet(
            this.goblinSprite,
            candidates,
            [4],
            [8]
        );
    }

    loadWizardSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Wizard.walk;

        this.loadWalkCycleSpriteSheet(
            this.wizardSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadWizardProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Wizard.projectile;

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
                    return s?.moveType && (s.moveRange ?? 0) > 0;
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
        if (!stats) return false;
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
        if (!stats) return false;
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
            stepDuration: STRATEGY_STEP_DURATION,
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
        if (!stats) return false;
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

        const path = [];
        {
            let cx = startX;
            let cy = startY;
            while (cx !== destX || cy !== destY) {
                if (cx !== destX) cx += Math.sign(destX - cx);
                if (cy !== destY) cy += Math.sign(destY - cy);
                path.push({ x: cx, y: cy });
            }
        }

        piece.state = 'MOVING';
        piece.remainingMove = path.length;
        piece.move = {
            path,
            stepIndex: 0,
            stepT: 0,
            stepDuration: STRATEGY_STEP_DURATION,
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
        piece.facing = this.directionFromDelta(path[0].x - startX, path[0].y - startY);

        if (captureResult) return captureResult;
        return { type: 'move', pieceId: piece.id, square: { x: destX, y: destY } };
    }

    tryStartTeleportMove(piece, destX, destY) {
        if (!this.isInBounds(destX, destY)) return false;
        const stats = this.getUnitStats(piece?.type);
        if (!stats) return false;
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

        const path = [];
        {
            let cx = startX;
            let cy = startY;
            while (cx !== destX || cy !== destY) {
                if (cx !== destX) cx += Math.sign(destX - cx);
                if (cy !== destY) cy += Math.sign(destY - cy);
                path.push({ x: cx, y: cy });
            }
        }

        piece.state = 'MOVING';
        piece.remainingMove = path.length;
        piece.move = {
            path,
            stepIndex: 0,
            stepT: 0,
            stepDuration: STRATEGY_STEP_DURATION,
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
        piece.facing = this.directionFromDelta(path[0].x - startX, path[0].y - startY);

        if (captureResult) return captureResult;
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

            m.stepT += deltaTime / STRATEGY_STEP_DURATION;
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
                        if (piece.side === 'light') {
                            piece.facing = 'E';
                        } else if (piece.side === 'dark') {
                            piece.facing = 'W';
                        }
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

    drawArcherSprite(cx, cy, tileSize, facing, frameIndex) {
        this.drawWalkCycleSprite(this.archerSprite, cx, cy, tileSize, facing, frameIndex);
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
