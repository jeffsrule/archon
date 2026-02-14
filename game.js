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

// Turns on/off the pulsing of the Powerpoints on the screen
//
const ENABLE_POWER_POINT_SHIMMER = true;

const HP_BONUS_BY_COLOR = {
    A: { light: 7, dark: 0 },
    B: { light: 6, dark: 1 },
    C: { light: 4, dark: 3 },
    D: { light: 3, dark: 4 },
    E: { light: 1, dark: 6 },
    F: { light: 0, dark: 7 }
};

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
    Unicorn: {
        walk: [
            'assets/Unicorn Walk Cycle.png'
        ],
        projectile: [
            'assets/Unicorn Projectile.png'
        ]
    },
    Basilisk: {
        walk: [
            'assets/Basilisk Walk Cycle.png'
        ],
        projectile: [
            'assets/Basilisk Projectile.png'
        ]
    },
    Sorceress: {
        walk: [
            'assets/Sorceress Walk Cycle.png'
        ],
        projectile: [
            'assets/Sorceress Projectile.png'
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
    'Shape Shifter': {
        walk: [
            'assets/Shapeshifter Walk Cycle.png'
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
        baseHP: 4.5,
        maxHP: 11.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 240,
        attackDamage: 5,
        attackDuration: 0.35,
        attacksPerSecond: 1.5,
        canMoveWhileAttacking: false
    },
    Goblin: {
        combatType: 'MELEE',
        baseHP: 4.5,
        maxHP: 11.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 240,
        attackDamage: 5,
        attackDuration: 0.35,
        attacksPerSecond: 1.5,
        canMoveWhileAttacking: false
    },
    Wizard: {
        combatType: 'PROJECTILE',
        baseHP: 9.5,
        maxHP: 16.5,
        moveType: 'TELEPORT',
        moveRange: 3,
        speed: 240,
        attackDamage: 10,
        attackDuration: 0.35,
        attacksPerSecond: 0.75,
        shotSpeedMultiplier: 1.0,
        canMoveWhileAttacking: false
    },
    Archer: {
        combatType: 'PROJECTILE',
        baseHP: 4.5,
        maxHP: 11.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 240,
        attackDamage: 5,
        attackDuration: 0.35,
        attacksPerSecond: 1.2,
        shotSpeedMultiplier: 1.0,
        canMoveWhileAttacking: false
    },
    Banshee: {
        combatType: 'AURA',
        moveType: 'FLY',
        moveRange: 3,
        baseHP: 7.5,
        maxHP: 14.5,
        speed: 240,
        attackDamage: 0,
        attackDuration: 0.35,
        attacksPerSecond: 1,
        auraRadiusMultiplier: 0.85,
        auraDamagePerSecond: 5,
        canMoveWhileAttacking: true
    },
    Phoenix: {
        combatType: 'AURA',
        moveType: 'FLY',
        moveRange: 3,
        baseHP: 11.5,
        maxHP: 16.5,
        speed: 240,
        attackDamage: 0,
        attackDuration: 0.35,
        attacksPerSecond: .6,
        auraRadiusMultiplier: 0.85,
        auraDamagePerSecond: 5,
        canMoveWhileAttacking: false
    },
    Manticore: {
        combatType: 'PROJECTILE',
        baseHP: 7.5,
        maxHP: 14.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 220,
        attackDamage: 4,
        attackDuration: 0.35,
        attacksPerSecond: 1.0,
        shotSpeedMultiplier: 0.9,
        canMoveWhileAttacking: false
    },
    Golem: {
        combatType: 'PROJECTILE',
        baseHP: 14.5,
        maxHP: 21.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 170,
        attackDamage: 10,
        attackDuration: 0.35,
        attacksPerSecond: .6,
        canMoveWhileAttacking: false
    },
    Troll: {
        combatType: 'PROJECTILE',
        baseHP: 13.5,
        maxHP: 20.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 170,
        attackDamage: 8,
        attackDuration: 0.45,
        attacksPerSecond: 0.6,
        shotSpeedMultiplier: 0.7,
        canMoveWhileAttacking: false
    },
    Unicorn: {
        combatType: 'PROJECTILE',
        baseHP: 8.5,
        maxHP: 15.5,
        moveType: 'WALK',
        moveRange: 4,
        speed: 300,
        attackDamage: 8,
        attackDuration: 0.2,
        attacksPerSecond: 1.0,
        shotSpeedMultiplier: 1.7,
        canMoveWhileAttacking: false
    },
    Basilisk: {
        combatType: 'PROJECTILE',
        baseHP: 5.5,
        maxHP: 12.5,
        moveType: 'WALK',
        moveRange: 3,
        speed: 310,
        attackDamage: 9,
        attackDuration: 0.15,
        attacksPerSecond: 1.0,
        shotSpeedMultiplier: 1.9,
        canMoveWhileAttacking: false
    },
    Valkyrie: {
        combatType: 'PROJECTILE',
        baseHP: 7.5,
        maxHP: 14.5,
        moveType: 'FLY',
        moveRange: 3,
        speed: 220,
        attackDamage: 6,
        attackDuration: 0.35,
        attacksPerSecond: 1.0,
        shotSpeedMultiplier: 1.0,
        canMoveWhileAttacking: false
    },
    'Shape Shifter': {
        combatType: 'MELEE',
        baseHP: 0,
        maxHP: 10,
        moveType: 'FLY',
        moveRange: 5,
        speed: 200,
        attackDamage: 1,
        attackDuration: 0.35,
        attacksPerSecond: 1,
        canMoveWhileAttacking: false
    },
    Djinn: {
        combatType: 'PROJECTILE',
        baseHP: 14.5,
        maxHP: 21.5,
        moveType: 'FLY',
        moveRange: 4,
        speed: 250,
        attackDamage: 6,
        attackDuration: 0.35,
        attacksPerSecond: 1.0,
        shotSpeedMultiplier: 1.3,
        canMoveWhileAttacking: false
    },
    Dragon: {
        combatType: 'PROJECTILE',
        baseHP: 16.5,
        maxHP: 23.5,
        moveType: 'FLY',
        moveRange: 4,
        speed: 230,
        attackDamage: 11,
        attackDuration: 0.35,
        attacksPerSecond: 0.5,
        shotSpeedMultiplier: 1.1,
        canMoveWhileAttacking: false
    },
    Sorceress: {
        combatType: 'PROJECTILE',
        baseHP: 9.5,
        maxHP: 16.5,
        moveType: 'TELEPORT',
        moveRange: 3,
        speed: 240,
        attackDamage: 8,
        attackDuration: 0.25,
        attacksPerSecond: 0.75,
        shotSpeedMultiplier: 1.3,
        canMoveWhileAttacking: false
    }
};

class ArchonGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.appleFontLoaded = false;
        (async () => {
            try {
                const font = new FontFace('AppleII', 'url(assets/splashconfig/apple-ii.otf.woff2)');
                await font.load();
                document.fonts.add(font);
                this.appleFontLoaded = true;
            } catch (e) {
                this.appleFontLoaded = false;
            }
        })();

        this.splashImage = new Image();
        this.splashLoaded = false;
        this.splashImage.onload = () => {
            this.splashLoaded = true;
        };
        this.splashImage.src = 'assets/splashconfig/Splash Screen.png';
        this.splashStartTime = performance.now();

        this.handPointerImage = new Image();
        this.handPointerLoaded = false;
        this.handPointerImage.onload = () => {
            this.handPointerLoaded = true;
        };
        this.handPointerImage.src = 'assets/splashconfig/Hand Pointer.png';

        this.bluePowerPointImage = new Image();
        this.bluePowerPointLoaded = false;
        this.bluePowerPointImage.onload = () => {
            this.bluePowerPointLoaded = true;
        };
        this.bluePowerPointImage.src = 'assets/graphics/blue powerpoint.png';

        this.redPowerPointImage = new Image();
        this.redPowerPointLoaded = false;
        this.redPowerPointImage.onload = () => {
            this.redPowerPointLoaded = true;
        };
        this.redPowerPointImage.src = 'assets/graphics/red powerpoint.png';

        this.bushImage = new Image();
        this.bushLoaded = false;
        this.bushImage.onload = () => { this.bushLoaded = true; };
        this.bushImage.src = 'assets/bush.png';

        this.bushFadeImage = new Image();
        this.bushFadeLoaded = false;
        this.bushFadeImage.onload = () => { this.bushFadeLoaded = true; };
        this.bushFadeImage.src = 'assets/bush_fade.png';

        this.mouseX = 0;
        this.mouseY = 0;
        this.clickZones = [];
        this.configState = null;

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
        this.gameState = 'SPLASH';
        this.strategyInputLocked = false;
        this.combat = null;
        this.showHPDebugOverlay = false;

        this.worldShiftMessage = null;
        this.worldShiftTimer = 0;
        this.worldShiftDuration = 4.0;
        this.worldShiftFadeDuration = 0.6;

        this.squareFadeDuration = 1.0;
        this.squareFadeTime = 0;
        this.squareFadeActive = false;
        this.squareFadeFrom = null;
        this.squareFadeTo = null;

        this.turnCounter = 0;

        this.boardCursor = {
            x: 4,
            y: 4,
            moveCooldown: 0
        };
        this.gamepadAPressed = false;
        this.combatGamepadAPressed = false;
        this.splashGamepadAPressed = false;
        this.configGamepadAPressed = false;
        this.configPointerX = 400;
        this.configPointerY = 300;

        this.touchState = {
            light: { active: false, id: null, startX: 0, startY: 0, dx: 0, dy: 0, snappedDx: 0, snappedDy: 0, startTime: 0, fireId: null, fireTime: 0 },
            dark: { active: false, id: null, startX: 0, startY: 0, dx: 0, dy: 0, snappedDx: 0, snappedDy: 0, startTime: 0, fireId: null, fireTime: 0 }
        };
        
        // Input state
        this.keys = {};
        this.gamepad = null;
        this.gamepadState = {};

        this.boardSize = 9;
        this.boardColorCodes = this.createInitialBoardColorCodesLightFirst();
        this.boardRotates = this.createInitialBoardRotates();
        this.boardColorDirection = +1;
        this.boardFirstMover = 'light';
        this.squareHexColors = {
            A: '#FFFFFF',
            B: '#CCCCCC',
            C: '#999999',
            D: '#666666',
            E: '#333333',
            F: '#000000'
        };

        this.powerPoints = [
            { grid: 'E1', type: 'ROTATE' },
            { grid: 'E5', type: 'ROTATE' },
            { grid: 'E9', type: 'ROTATE' },
            { grid: 'A5', type: 'STATIC_WIZARD' },
            { grid: 'I5', type: 'STATIC_SORCERESS' }
        ];

        this.powerPointFlickerTime = 0;

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
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.knightSwordSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 64,
            frameH: 64,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.goblinSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.unicornSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.unicornProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.basiliskSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.basiliskProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.sorceressSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.sorceressProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.goblinClubSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 64,
            frameH: 64,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.wizardSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.wizardProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.phoenixSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.archerSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.archerProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.trollSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.trollProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.golemSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.golemProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.phoenixExplosionSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 3,
            frameW: 237,
            frameH: 128,
            directionOrder: []
        };

        this.bansheeSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.dragonSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.dragonProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.valkyrieSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.valkyrieProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.djinnSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.djinnProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.manticoreSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.manticoreProjectileSprite = {
            img: null,
            loaded: false,
            blueImg: null,
            blueLoaded: false,
            cols: 1,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.shapeshifterSprite = {
            img: null,
            loaded: false,
            cols: 4,
            rows: 8,
            frameW: 0,
            frameH: 0,
            directionOrder: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
        };

        this.loadKnightSprite();
        this.loadKnightSwordSprite();
        this.loadGoblinSprite();
        this.loadGoblinClubSprite();
        this.loadUnicornSprite();
        this.loadUnicornProjectileSprite();
        this.loadBasiliskSprite();
        this.loadBasiliskProjectileSprite();
        this.loadSorceressSprite();
        this.loadSorceressProjectileSprite();
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
        this.loadShapeshifterSprite();
        
        // Initialize
        this.init();
    }

    getCombatType(type, pieceId) {
        const baseType = type;
        if (this.combat && pieceId != null && baseType === 'Shape Shifter') {
            if (pieceId === this.combat.lightPieceId && this.combat.lightCopiedType) {
                return UNIT_STATS[this.combat.lightCopiedType]?.combatType ?? 'MELEE';
            }
            if (pieceId === this.combat.darkPieceId && this.combat.darkCopiedType) {
                return UNIT_STATS[this.combat.darkCopiedType]?.combatType ?? 'MELEE';
            }
        }
        return UNIT_STATS[baseType]?.combatType ?? 'MELEE';
    }

    getUnitStats(type, pieceId) {
        const baseType = type;
        if (this.combat && pieceId != null && baseType === 'Shape Shifter') {
            if (pieceId === this.combat.lightPieceId && this.combat.lightCopiedType) {
                return UNIT_STATS[this.combat.lightCopiedType] ?? null;
            }
            if (pieceId === this.combat.darkPieceId && this.combat.darkCopiedType) {
                return UNIT_STATS[this.combat.darkCopiedType] ?? null;
            }
        }
        return UNIT_STATS[baseType] ?? null;
    }

    getEffectiveCombatTypeForPiece(piece) {
        if (!piece) return null;
        if (piece.type !== 'Shape Shifter') return piece.type;
        if (piece.type === 'Shape Shifter' && this.gameState === 'COMBAT') {
            if (piece.side === 'light' && this.combat?.lightCopiedType) return this.combat.lightCopiedType;
            if (piece.side === 'dark' && this.combat?.darkCopiedType) return this.combat.darkCopiedType;
        }
        return piece.type;
    }

    isActorInvulnerable(actor, piece) {
        if (!actor || !piece) return false;
        const effectiveType = this.getEffectiveCombatTypeForPiece(piece);
        if (effectiveType === 'Phoenix' && (actor.auraState ?? 'idle') !== 'idle') return true;
        if (effectiveType === 'Banshee' && actor.isAttacking) return true;
        return false;
    }

    getSpriteImageForPiece(spriteObj, piece, preferBlue) {
        if (preferBlue && spriteObj?.blueLoaded && spriteObj?.blueImg) return spriteObj.blueImg;
        return spriteObj?.img ?? null;
    }

    recolorImageToDarkBlue(originalImage) {
        if (!originalImage) return null;

        const w = originalImage.naturalWidth || originalImage.width;
        const h = originalImage.naturalHeight || originalImage.height;
        if (!w || !h) return null;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return null;

        ctx.drawImage(originalImage, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a === 0) continue;
            if (r < 15 && g < 15 && b < 15) continue;

            const { h: hh, s, l } = this.rgbToHsl(r, g, b);
            const newH = 210;
            const newS = Math.max(s, 0.6);
            const rgb = this.hslToRgb(newH, newS, l);

            data[i] = rgb.r;
            data[i + 1] = rgb.g;
            data[i + 2] = rgb.b;
            data[i + 3] = a;
        }

        ctx.putImageData(imageData, 0, 0);

        const out = new Image();
        out.src = canvas.toDataURL();
        return out;
    }

    rgbToHsl(r, g, b) {
        const rr = r / 255;
        const gg = g / 255;
        const bb = b / 255;

        const max = Math.max(rr, gg, bb);
        const min = Math.min(rr, gg, bb);
        const delta = max - min;

        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (delta !== 0) {
            s = delta / (1 - Math.abs(2 * l - 1));

            if (max === rr) {
                h = ((gg - bb) / delta) % 6;
            } else if (max === gg) {
                h = (bb - rr) / delta + 2;
            } else {
                h = (rr - gg) / delta + 4;
            }

            h *= 60;
            if (h < 0) h += 360;
        }

        return { h, s, l };
    }

    hslToRgb(h, s, l) {
        const hh = ((h % 360) + 360) % 360;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
        const m = l - c / 2;

        let r1 = 0;
        let g1 = 0;
        let b1 = 0;

        if (hh < 60) {
            r1 = c; g1 = x; b1 = 0;
        } else if (hh < 120) {
            r1 = x; g1 = c; b1 = 0;
        } else if (hh < 180) {
            r1 = 0; g1 = c; b1 = x;
        } else if (hh < 240) {
            r1 = 0; g1 = x; b1 = c;
        } else if (hh < 300) {
            r1 = x; g1 = 0; b1 = c;
        } else {
            r1 = c; g1 = 0; b1 = x;
        }

        const r = Math.round((r1 + m) * 255);
        const g = Math.round((g1 + m) * 255);
        const b = Math.round((b1 + m) * 255);

        return {
            r: Math.max(0, Math.min(255, r)),
            g: Math.max(0, Math.min(255, g)),
            b: Math.max(0, Math.min(255, b))
        };
    }

    getMoveTypeForPiece(piece) {
        if (!piece) return 'WALK';
        return (UNIT_STATS[piece.type]?.moveType) || piece.moveType || 'WALK';
    }

    isTeleportMover(piece) {
        return this.getMoveTypeForPiece(piece) === 'TELEPORT';
    }

    calculateEffectiveMaxHP(piece) {
        if (!piece) return null;
        const stats = UNIT_STATS[piece.type];
        return stats ? stats.baseHP : null;
    }

    getSquareHPBonus(piece, squareColorCode) {
        if (!piece || !squareColorCode) return 0;
        const entry = HP_BONUS_BY_COLOR[String(squareColorCode).toUpperCase()];
        if (!entry) return 0;
        if (piece.side === 'light') return entry.light ?? 0;
        if (piece.side === 'dark') return entry.dark ?? 0;
        return 0;
    }

    getPowerPointColorAt(gridPos) {
        if (gridPos === 'A5') return 'red';
        if (gridPos === 'I5') return 'blue';
        const rotateGrids = ['E1', 'E5', 'E9'];
        if (rotateGrids.includes(gridPos)) {
            const xy = this.gridToXY(gridPos);
            const code = (this.boardColorCodes?.[xy.y]?.[xy.x] ?? 'D').toUpperCase();
            if ('ABC'.includes(code)) return 'blue';
            return 'red';
        }
        return null;
    }

    applyPowerPointHP(piece) {
        if (!piece) return;

        const gridPos = this.xyToGridPos(piece.col, piece.row);
        const ppColor = this.getPowerPointColorAt(gridPos);
        if (!ppColor) return;
        console.log('[PowerPoint] landed on PP:', piece.type, piece.side, gridPos, 'ppColor:', ppColor, 'persistentDmg:', piece.persistentDamage ?? 0);

        if (piece.lastPowerPointTriggerTurn === this.turnCounter) return;

        const stats = UNIT_STATS[piece.type];
        if (!stats) return;
        const maxHP = stats.maxHP ?? stats.baseHP ?? 0;
        const prevDamage = piece.persistentDamage ?? 0;

        let delta = 0;
        if (ppColor === 'red') {
            delta = piece.side === 'light' ? +1 : -1;
        } else if (ppColor === 'blue') {
            delta = piece.side === 'dark' ? +1 : -1;
        }
        if (delta === 0) return;

        if (delta > 0) {
            piece.persistentDamage = prevDamage - 1;
        } else {
            piece.persistentDamage = prevDamage + 1;
        }

        if (piece.persistentDamage > maxHP) {
            piece.persistentDamage = maxHP;
        }

        piece.lastPowerPointTriggerTurn = this.turnCounter;

        console.log('[PowerPoint]', piece.type, piece.side, gridPos, ppColor,
            'persistentDmg:', prevDamage, '→', piece.persistentDamage,
            'delta:', delta > 0 ? '+1' : '-1');
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
            if (this.gameState === 'SPLASH') {
                this.enterStrategyFromSplash();
                e.preventDefault();
                return;
            }
            if (this.gameState === 'CONFIG') {
                if (e.code === 'Space') {
                    this.enterStrategyFromConfig();
                    e.preventDefault();
                    return;
                }
                if (e.code === 'Escape') {
                    this.keys[e.code] = true;
                }
                e.preventDefault();
                return;
            }
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

        this.canvas.addEventListener('mousemove', (e) => {
            const pos = this.getCanvasCoordsFromMouseEvent(e);
            if (!pos) return;
            this.mouseX = pos.x;
            this.mouseY = pos.y;
            if (this.gameState === 'CONFIG') {
                this.configPointerX = pos.x;
                this.configPointerY = pos.y;
            }
        });

        const getTouchCanvasPos = (touch) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            return {
                x: (touch.clientX - rect.left) * scaleX,
                y: (touch.clientY - rect.top) * scaleY
            };
        };

        const getSideForTouch = (canvasX) => {
            return canvasX < this.canvas.width / 2 ? 'light' : 'dark';
        };

        const findSideByTouchId = (id) => {
            if (this.touchState.light.active && this.touchState.light.id === id) return 'light';
            if (this.touchState.dark.active && this.touchState.dark.id === id) return 'dark';
            return null;
        };

        const findFireSideByTouchId = (id) => {
            if (this.touchState.light.fireId === id) return 'light';
            if (this.touchState.dark.fireId === id) return 'dark';
            return null;
        };

        const snapTo8Dir = (dx, dy) => {
            const angle = Math.atan2(dy, dx);
            const sector = Math.round(angle / (Math.PI / 4));
            switch (sector) {
                case 0:  return { dx: 1, dy: 0 };
                case 1:  return { dx: 1, dy: 1 };
                case 2:  return { dx: 0, dy: 1 };
                case 3:  return { dx: -1, dy: 1 };
                case 4: case -4: return { dx: -1, dy: 0 };
                case -3: return { dx: -1, dy: -1 };
                case -2: return { dx: 0, dy: -1 };
                case -1: return { dx: 1, dy: -1 };
                default: return { dx: 0, dy: 0 };
            }
        };

        this.canvas.addEventListener('touchstart', (e) => {
            if (this.gameState !== 'COMBAT') return;
            e.preventDefault();
            for (const touch of e.changedTouches) {
                const pos = getTouchCanvasPos(touch);
                const side = getSideForTouch(pos.x);
                const ts = this.touchState[side];
                if (ts.active) {
                    if (ts.fireId === null) {
                        ts.fireId = touch.identifier;
                        ts.fireTime = performance.now();
                    }
                    continue;
                }
                ts.active = true;
                ts.id = touch.identifier;
                ts.startX = pos.x;
                ts.startY = pos.y;
                ts.dx = 0;
                ts.dy = 0;
                ts.snappedDx = 0;
                ts.snappedDy = 0;
                ts.startTime = performance.now();
            }
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            if (this.gameState !== 'COMBAT') return;
            e.preventDefault();
            for (const touch of e.changedTouches) {
                const side = findSideByTouchId(touch.identifier);
                if (!side) continue;
                const pos = getTouchCanvasPos(touch);
                const ts = this.touchState[side];
                ts.dx = pos.x - ts.startX;
                ts.dy = pos.y - ts.startY;
                const dist = Math.hypot(ts.dx, ts.dy);
                if (dist >= 20) {
                    const snapped = snapTo8Dir(ts.dx, ts.dy);
                    ts.snappedDx = snapped.dx;
                    ts.snappedDy = snapped.dy;
                }
            }
        }, { passive: false });

        const handleTouchEnd = (e) => {
            if (this.gameState !== 'COMBAT') return;
            e.preventDefault();
            for (const touch of e.changedTouches) {
                const fireSide = findFireSideByTouchId(touch.identifier);
                if (fireSide) {
                    const fts = this.touchState[fireSide];
                    this.combatTouchFire = this.combatTouchFire ?? {};
                    this.combatTouchFire[fireSide] = true;
                    fts.fireId = null;
                    fts.fireTime = 0;
                    continue;
                }

                const side = findSideByTouchId(touch.identifier);
                if (!side) continue;
                const ts = this.touchState[side];
                const elapsed = performance.now() - ts.startTime;
                if (elapsed < 150) {
                    this.combatTouchFire = this.combatTouchFire ?? {};
                    this.combatTouchFire[side] = true;
                }
                ts.active = false;
                ts.id = null;
                ts.dx = 0;
                ts.dy = 0;
                ts.snappedDx = 0;
                ts.snappedDy = 0;
            }
        };

        this.canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
        this.canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });
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

    renderConfig() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (!this.configState) {
            this.configState = {
                playing: 'TWO_PLAYERS_BOTH_ON_KEYBOARD',
                sound: 'SOUND_ON',
                order: 'LIGHT_FIRST'
            };
        }

        const family = this.appleFontLoaded ? 'AppleII' : 'monospace';
        this.ctx.fillStyle = '#fff';
        this.ctx.textBaseline = 'top';

        const drawBoldText = (text, x, y, color) => {
            this.ctx.fillStyle = color;
            this.ctx.fillText(text, x, y);
            this.ctx.fillText(text, x + 1, y);
        };

        this.clickZones = [];

        const drawSelectableText = (group, value, text, x, y) => {
            const selected = !!this.configState && this.configState[group] === value;
            const m = this.ctx.measureText(text);
            const pad = 6;
            const rectX = Math.floor(x - pad);
            const rectW = Math.ceil(m.width + pad * 2 + 1);

            const highlightHeight = Math.floor(lineH * 0.90);
            const extraTop = Math.floor(lineH * 0.08);
            const rectY = Math.floor(y - extraTop);
            const rectH = highlightHeight;

            this.clickZones.push({ type: group, value, x: rectX, y: rectY, width: rectW, height: rectH });

            if (selected) {
                this.ctx.fillStyle = '#fff';
                this.ctx.fillRect(rectX, rectY, rectW, rectH);
                drawBoldText(text, x, y, '#000');
            } else {
                drawBoldText(text, x, y, '#fff');
            }
        };

        const drawAcceptText = (text, x, y) => {
            const m = this.ctx.measureText(text);
            const pad = 6;
            const rectX = Math.floor(x - pad);
            const rectW = Math.ceil(m.width + pad * 2 + 1);

            const highlightHeight = Math.floor(lineH * 0.90);
            const extraTop = Math.floor(lineH * 0.08);
            const rectY = Math.floor(y - extraTop);
            const rectH = highlightHeight;
            this.clickZones.push({ type: 'accept', value: 'ACCEPT', x: rectX, y: rectY, width: rectW, height: rectH });
            drawBoldText(text, x, y, '#fff');
        };

        // Smaller font so everything fits like original
        this.ctx.font = `22px ${family}`;
        this.ctx.textAlign = 'left';

        const marginLeft = 80;
        const marginRight = this.width - 80;
        const lineH = 26;
        const sectionGap = 34;
        const playingToSoundGap = sectionGap + Math.round(lineH * 1.5);
        const soundToOrderGap = sectionGap + Math.round(lineH * 1.25);
        const orderToKeyboardGap = sectionGap + Math.round(lineH * 1.25);
        const keyboardTopPad = Math.round(lineH * 0.75);
        const acceptTopGap = sectionGap + Math.round(lineH * 2.5);

        let y = 40;

        // Title centered like original
        this.ctx.textAlign = 'center';
        this.ctx.font = `26px ${family}`;
        drawBoldText('ARCHON GAME OPTIONS', this.width / 2, y, '#fff');
        y += sectionGap;

        this.ctx.font = `22px ${family}`;
        drawBoldText('POINT AT OPTION WITH HAND, PRESS BUTTON', this.width / 2, y, '#fff');
        y += sectionGap + 10;

        this.ctx.textAlign = 'left';

        // PLAYING OPTIONS
        drawBoldText('PLAYING OPTIONS:', marginLeft, y, '#fff');
        y += lineH;

        drawSelectableText('playing', 'ONE_PLAYER_COMPUTER_LIGHT', 'ONE PLAYER, COMPUTER LIGHT', marginLeft + 20, y);
        y += lineH;

        drawSelectableText('playing', 'ONE_PLAYER_COMPUTER_DARK', 'ONE PLAYER, COMPUTER DARK', marginLeft + 20, y);
        y += lineH;

        drawSelectableText('playing', 'TWO_PLAYERS_DARK_ON_KEYBOARD', 'TWO PLAYERS, DARK ON KEYBOARD', marginLeft + 20, y);
        y += lineH;

        drawSelectableText('playing', 'TWO_PLAYERS_LIGHT_ON_KEYBOARD', 'TWO PLAYERS, LIGHT ON KEYBOARD', marginLeft + 20, y);
        y += lineH;

        drawSelectableText('playing', 'TWO_PLAYERS_BOTH_ON_KEYBOARD', 'TWO PLAYERS, BOTH ON KEYBOARD', marginLeft + 20, y);
        y += playingToSoundGap;

        // SOUND
        drawBoldText('SOUND CONTROL:', marginLeft, y, '#fff');
        y += lineH;

        drawSelectableText('sound', 'SOUND_ON', 'SOUND ON', marginLeft + 20, y);
        drawSelectableText('sound', 'SOUND_OFF', 'SOUND OFF', marginLeft + 260, y);
        y += soundToOrderGap;

        // ORDER
        drawBoldText('ORDER', marginLeft, y, '#fff');
        y += lineH;

        drawSelectableText('order', 'LIGHT_FIRST', 'LIGHT FIRST', marginLeft + 20, y);
        drawSelectableText('order', 'DARK_FIRST', 'DARK FIRST', marginLeft + 260, y);
        y += orderToKeyboardGap;

        y += keyboardTopPad;

        // KEYBOARD CONTROLS – side by side columns
        const leftColX = marginLeft;
        const rightColX = this.width / 2 + 80;

        drawBoldText('KEYBOARD LIGHT:', leftColX, y, '#fff');
        drawBoldText('KEYBOARD DARK:', rightColX, y, '#fff');
        y += lineH;

        drawBoldText('FIRE: SPACE BAR', leftColX + 20, y, '#fff');
        drawBoldText('FIRE: RETURN', rightColX + 20, y, '#fff');
        y += lineH;

        drawBoldText('MOVE: WASD', leftColX + 20, y, '#fff');
        drawBoldText('MOVE: ARROW KEYS', rightColX + 20, y, '#fff');
        y += acceptTopGap;

        y = Math.max(y, this.height - 90);

        // Accept line
        drawAcceptText('□ ACCEPT OPTION, BEGIN THE BATTLE', marginLeft, y);

        if (this.handPointerLoaded) {
            const prev = this.ctx.imageSmoothingEnabled;
            this.ctx.imageSmoothingEnabled = false;
            const px = Math.floor(this.mouseX - 2);
            const py = Math.floor(this.mouseY - 2);
            this.ctx.drawImage(this.handPointerImage, px, py);
            this.ctx.imageSmoothingEnabled = prev;
        }
    }

    updateConfig(deltaTime) {
        const gpads = navigator.getGamepads ? navigator.getGamepads() : [];
        const gp = gpads[0] ?? gpads[1] ?? gpads[2] ?? gpads[3];
        if (!gp) return;

        const rawX = gp.axes[0] ?? 0;
        const rawY = gp.axes[1] ?? 0;
        const stickX = Math.abs(rawX) >= 0.2 ? rawX : 0;
        const stickY = Math.abs(rawY) >= 0.2 ? rawY : 0;
        const pointerSpeed = 7;

        if (stickX !== 0 || stickY !== 0) {
            this.configPointerX += stickX * pointerSpeed;
            this.configPointerY += stickY * pointerSpeed;
            this.configPointerX = Math.max(0, Math.min(this.width, this.configPointerX));
            this.configPointerY = Math.max(0, Math.min(this.height, this.configPointerY));
            this.mouseX = this.configPointerX;
            this.mouseY = this.configPointerY;
        }

        const aDown = gp.buttons[0]?.pressed ?? false;
        if (aDown && !this.configGamepadAPressed) {
            const mx = this.configPointerX;
            const my = this.configPointerY;

            for (let i = 0; i < (this.clickZones?.length ?? 0); i++) {
                const z = this.clickZones[i];
                if (mx < z.x || my < z.y || mx > (z.x + z.width) || my > (z.y + z.height)) continue;

                if (z.type === 'accept') {
                    this.acceptConfigAndEnterStrategy();
                    break;
                }

                if (!this.configState) {
                    this.configState = {
                        playing: 'TWO_PLAYERS_BOTH_ON_KEYBOARD',
                        sound: 'SOUND_ON',
                        order: 'LIGHT_FIRST'
                    };
                }

                if (z.type === 'playing') this.configState.playing = z.value;
                if (z.type === 'sound') this.configState.sound = z.value;
                if (z.type === 'order') this.configState.order = z.value;
                break;
            }
        }
        this.configGamepadAPressed = aDown;
    }

    updateSplash(deltaTime) {
        const now = performance.now();
        if ((now - (this.splashStartTime ?? now)) >= 7000) {
            this.enterStrategyFromSplash();
            return;
        }

        const gpads = navigator.getGamepads ? navigator.getGamepads() : [];
        const gp = gpads[0] ?? gpads[1] ?? gpads[2] ?? gpads[3];
        if (gp) {
            const aDown = gp.buttons[0]?.pressed ?? false;
            if (aDown && !this.splashGamepadAPressed) {
                this.enterStrategyFromSplash();
            }
            this.splashGamepadAPressed = aDown;
        }
    }

    enterStrategyFromSplash() {
        if (this.gameState !== 'SPLASH') return;
        this.gameState = 'CONFIG';
        this.keys = {};

        this.canvas.style.cursor = 'none';
        if (!this.configState) {
            this.configState = {
                playing: 'TWO_PLAYERS_BOTH_ON_KEYBOARD',
                sound: 'SOUND_ON',
                order: 'LIGHT_FIRST'
            };
        }
    }

    enterStrategyFromConfig() {
        if (this.gameState !== 'CONFIG') return;
        this.gameState = 'STRATEGY';
        this.keys = {};
        this.canvas.style.cursor = 'default';
    }

    doesSideUseGamepad(side) {
        const opt = this.gameConfig?.playing ?? 'TWO_PLAYERS_BOTH_ON_KEYBOARD';
        if (opt === 'TWO_PLAYERS_DARK_ON_KEYBOARD') return side === 'light';
        if (opt === 'TWO_PLAYERS_LIGHT_ON_KEYBOARD') return side === 'dark';
        return false;
    }

    acceptConfigAndEnterStrategy() {
        if (this.gameState !== 'CONFIG') return;
        this.gameConfig = { ...this.configState };

        this.applyBoardConfigurationForOrder(this.gameConfig.order);

        this.boardLayout = null;
        this.gameState = 'STRATEGY';
        this.canvas.style.cursor = 'default';
        this.keys = {};
    }

    getCanvasCoordsFromMouseEvent(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    renderSplash() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (!this.splashLoaded) return;

        const img = this.splashImage;
        const iw = img.naturalWidth || img.width;
        const ih = img.naturalHeight || img.height;
        if (!iw || !ih) return;

        const scale = Math.min(1, this.width / iw, this.height / ih);
        const dw = Math.floor(iw * scale);
        const dh = Math.floor(ih * scale);
        const dx = Math.floor((this.width - dw) / 2);
        const dy = Math.floor((this.height - dh) / 2);

        const prevSmoothing = this.ctx.imageSmoothingEnabled;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(img, dx, dy, dw, dh);
        this.ctx.imageSmoothingEnabled = prevSmoothing;
    }
    
    update(deltaTime) {
        if (this.gameState === 'SPLASH') {
            this.updateSplash(deltaTime);
        } else if (this.gameState === 'CONFIG') {
            this.updateConfig(deltaTime);
        } else if (this.gameState === 'COMBAT') {
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
        if (this.keys['KeyH']) {
            this.keys['KeyH'] = false;
            this.showHPDebugOverlay = !this.showHPDebugOverlay;
        }

        this.powerPointFlickerTime += deltaTime;
        this.updateIllegalFlash(deltaTime);
        this.updatePieceMovement(deltaTime);

        if (this.worldShiftMessage !== null) {
            this.worldShiftTimer += deltaTime;
            if (this.worldShiftTimer >= this.worldShiftDuration) {
                this.worldShiftMessage = null;
            }
        }

        if (this.squareFadeActive) {
            this.squareFadeTime += deltaTime;
            if (this.squareFadeTime >= this.squareFadeDuration) {
                this.squareFadeActive = false;
            }
        }

        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        const gp = gamepads[0] ?? gamepads[1] ?? gamepads[2] ?? gamepads[3];
        if (gp) {
            this.boardCursor.moveCooldown = Math.max(0, (this.boardCursor.moveCooldown ?? 0) - deltaTime);

            if (this.boardCursor.moveCooldown <= 0) {
                const ax0 = gp.axes[0] ?? 0;
                const ax1 = gp.axes[1] ?? 0;
                let moved = false;

                if (ax0 < -0.5) { this.boardCursor.x = Math.max(0, this.boardCursor.x - 1); moved = true; }
                else if (ax0 > 0.5) { this.boardCursor.x = Math.min(this.boardSize - 1, this.boardCursor.x + 1); moved = true; }

                if (ax1 < -0.5) { this.boardCursor.y = Math.max(0, this.boardCursor.y - 1); moved = true; }
                else if (ax1 > 0.5) { this.boardCursor.y = Math.min(this.boardSize - 1, this.boardCursor.y + 1); moved = true; }

                if (moved) this.boardCursor.moveCooldown = 0.18;
            }

            const aDown = gp.buttons[0]?.pressed ?? false;
            if (aDown && !this.gamepadAPressed && !this.strategyInputLocked) {
                const x = this.boardCursor.x;
                const y = this.boardCursor.y;
                const stack = this.board[x][y];

                if (!this.selectedPiece) {
                    const friendly = stack.find(p => p.side === this.currentSide);
                    if (friendly) {
                        const friendlyMovable = stack.find(p => {
                            if (p.side !== this.currentSide) return false;
                            const s = this.getUnitStats(p.type);
                            return s?.moveType && (s.moveRange ?? 0) > 0;
                        });
                        this.selectedPiece = friendlyMovable ?? friendly;
                    }
                } else {
                    if (this.selectedPiece.state === 'IDLE' && this.selectedPiece.side === this.currentSide) {
                        const result = this.tryStartMove(this.selectedPiece, x, y);
                        if (result) {
                            if (result.type === 'capture') {
                                this.lastCaptureAttempt = result;
                                this.strategyInputLocked = true;
                            }
                        } else {
                            const friendly = stack.find(p => p.side === this.currentSide);
                            if (friendly) {
                                const friendlyMovable = stack.find(p => {
                                    if (p.side !== this.currentSide) return false;
                                    const s = this.getUnitStats(p.type);
                                    return s?.moveType && (s.moveRange ?? 0) > 0;
                                });
                                this.selectedPiece = friendlyMovable ?? friendly;
                            } else {
                                this.flashIllegal(x, y);
                            }
                        }
                    }
                }
            }
            this.gamepadAPressed = aDown;
        }
    }

    updateCombat(deltaTime) {
        if (!this.combat) return;

        const arena = this.combat.arena ?? this.computeCombatArena();
        const spriteSize = this.combat.spriteSize ?? this.getCombatSpriteSize(arena.arenaW, arena.arenaH);
        const half = spriteSize / 2;

        this.combat.auraTime = (this.combat.auraTime ?? 0) + deltaTime;

        const cgpads = navigator.getGamepads ? navigator.getGamepads() : [];
        const cgp = cgpads[0] ?? cgpads[1] ?? cgpads[2] ?? cgpads[3];
        let gpStickX = 0;
        let gpStickY = 0;
        let gpADown = false;
        if (cgp) {
            const rawX = cgp.axes[0] ?? 0;
            const rawY = cgp.axes[1] ?? 0;
            gpStickX = Math.abs(rawX) >= 0.25 ? rawX : 0;
            gpStickY = Math.abs(rawY) >= 0.25 ? rawY : 0;
            gpADown = cgp.buttons[0]?.pressed ?? false;
        }

        this.combat.obstacleTimer = (this.combat.obstacleTimer ?? 0) + deltaTime;
        if (this.combat.obstacleTimer >= (this.combat.obstacleInterval ?? 6.0)) {
            this.combat.obstacleTimer = 0;
            this.generateCombatObstacles();
        }

        const lightActor = this.combat.lightActor;
        const darkActor = this.combat.darkActor;

        const lightPiece = this.getPieceById(this.combat.lightPieceId);
        const darkPiece = this.getPieceById(this.combat.darkPieceId);

        const lightCombatType = this.getCombatType(lightPiece?.type, lightPiece?.id);
        const darkCombatType = this.getCombatType(darkPiece?.type, darkPiece?.id);

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

            const stats = this.getUnitStats(piece?.type, piece?.id);
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
            let shooterRenderType = shooterPiece?.type;
            if (shooterPiece?.type === 'Shape Shifter') {
                if (ownerSide === 'light' && this.combat?.lightCopiedType) {
                    shooterRenderType = this.combat.lightCopiedType;
                }
                if (ownerSide === 'dark' && this.combat?.darkCopiedType) {
                    shooterRenderType = this.combat.darkCopiedType;
                }
            }
            const shooterStats = this.getUnitStats(shooterPiece?.type, shooterPiece?.id);
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
                shooterType: shooterRenderType,
                fromShapeshifter: shooterPiece?.type === 'Shape Shifter',
                ownerSide
            });
        };

        if (this.keys['Space']) {
            this.keys['Space'] = false;
            if (lightCombatType === 'PROJECTILE') {
                trySpawnProjectile(lightActor, 'light');
            } else if (lightCombatType === 'AURA') {
                const lightEffectiveType = this.getEffectiveCombatTypeForPiece(lightPiece);
                if (lightEffectiveType === 'Phoenix') {
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
                const darkEffectiveType = this.getEffectiveCombatTypeForPiece(darkPiece);
                if (darkEffectiveType === 'Phoenix') {
                    startPhoenixExplosion(darkActor);
                } else {
                    startAuraAttack(darkActor);
                }
            } else {
                startAttack(darkActor, darkPiece);
            }
        }

        if (gpADown && !this.combatGamepadAPressed) {
            if (this.doesSideUseGamepad('light')) {
                if (lightCombatType === 'PROJECTILE') {
                    trySpawnProjectile(lightActor, 'light');
                } else if (lightCombatType === 'AURA') {
                    const lightEffectiveType = this.getEffectiveCombatTypeForPiece(lightPiece);
                    if (lightEffectiveType === 'Phoenix') {
                        startPhoenixExplosion(lightActor);
                    } else {
                        startAuraAttack(lightActor);
                    }
                } else {
                    startAttack(lightActor, lightPiece);
                }
            }
            if (this.doesSideUseGamepad('dark')) {
                if (darkCombatType === 'PROJECTILE') {
                    trySpawnProjectile(darkActor, 'dark');
                } else if (darkCombatType === 'AURA') {
                    const darkEffectiveType = this.getEffectiveCombatTypeForPiece(darkPiece);
                    if (darkEffectiveType === 'Phoenix') {
                        startPhoenixExplosion(darkActor);
                    } else {
                        startAuraAttack(darkActor);
                    }
                } else {
                    startAttack(darkActor, darkPiece);
                }
            }
        }
        this.combatGamepadAPressed = gpADown;

        if (this.combatTouchFire?.light) {
            this.combatTouchFire.light = false;
            if (lightCombatType === 'PROJECTILE') {
                trySpawnProjectile(lightActor, 'light');
            } else if (lightCombatType === 'AURA') {
                const lightEffectiveType = this.getEffectiveCombatTypeForPiece(lightPiece);
                if (lightEffectiveType === 'Phoenix') {
                    startPhoenixExplosion(lightActor);
                } else {
                    startAuraAttack(lightActor);
                }
            } else {
                startAttack(lightActor, lightPiece);
            }
        }

        if (this.combatTouchFire?.dark) {
            this.combatTouchFire.dark = false;
            if (darkCombatType === 'PROJECTILE') {
                trySpawnProjectile(darkActor, 'dark');
            } else if (darkCombatType === 'AURA') {
                const darkEffectiveType = this.getEffectiveCombatTypeForPiece(darkPiece);
                if (darkEffectiveType === 'Phoenix') {
                    startPhoenixExplosion(darkActor);
                } else {
                    startAuraAttack(darkActor);
                }
            } else {
                startAttack(darkActor, darkPiece);
            }
        }

        if (lightCombatType === 'AURA') {
            const lightEffectiveType = this.getEffectiveCombatTypeForPiece(lightPiece);
            if (lightEffectiveType === 'Phoenix') updatePhoenixExplosion(lightActor);
            else updateAuraAttack(lightActor);
        }
        if (darkCombatType === 'AURA') {
            const darkEffectiveType = this.getEffectiveCombatTypeForPiece(darkPiece);
            if (darkEffectiveType === 'Phoenix') updatePhoenixExplosion(darkActor);
            else updateAuraAttack(darkActor);
        }

        const clampToArena = (actor) => {
            if (!actor) return;
            actor.x = Math.max(arena.ax + half, Math.min(arena.ax + arena.arenaW - half, actor.x));
            actor.y = Math.max(arena.ay + half, Math.min(arena.ay + arena.arenaH - half, actor.y));
        };

        const shouldBlockMovementWhileAttacking = (actor, piece) => {
            if (!actor?.isAttacking) return false;
            const effectiveType = this.getEffectiveCombatTypeForPiece(piece);
            const canMoveWhileAttacking = UNIT_STATS[effectiveType]?.canMoveWhileAttacking ?? false;
            return !canMoveWhileAttacking;
        };

        const obstacleRect = (obs) => {
            const hw = obs.width / 2;
            const hh = obs.height / 2;
            return { x: obs.x - hw, y: obs.y - hh, w: obs.width, h: obs.height };
        };

        const actorOverlapsObstacle = (ax, ay, obs) => {
            const s = Math.floor(spriteSize * 0.7);
            const hs = s / 2;
            const ar = { x: ax - hs, y: ay - hs, w: s, h: s };
            const or = obstacleRect(obs);
            return ar.x < or.x + or.w && ar.x + ar.w > or.x && ar.y < or.y + or.h && ar.y + ar.h > or.y;
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
            const stats = this.getUnitStats(piece?.type, piece?.id);
            let speed = stats?.speed ?? 200;

            const obstacles = this.combat.obstacles ?? [];
            let inFadeBush = false;
            for (const obs of obstacles) {
                if (obs.type === 'fade' && actorOverlapsObstacle(actor.x, actor.y, obs)) {
                    inFadeBush = true;
                    break;
                }
            }
            if (inFadeBush) speed *= 0.5;

            const newX = actor.x + ndx * speed * deltaTime;
            const newY = actor.y + ndy * speed * deltaTime;

            let blocked = false;
            for (const obs of obstacles) {
                if (obs.type !== 'solid') continue;
                if (!actorOverlapsObstacle(newX, newY, obs)) continue;

                blocked = true;
                const pushBack = 5;
                let adjX = newX - ndx * pushBack;
                let adjY = newY - ndy * pushBack;

                const slideAmt = 5;
                if (Math.abs(ndx) >= Math.abs(ndy)) {
                    adjY += (ndy >= 0 ? slideAmt : -slideAmt);
                } else {
                    adjX += (ndx >= 0 ? slideAmt : -slideAmt);
                }

                if (!actorOverlapsObstacle(adjX, adjY, obs)) {
                    actor.x = adjX;
                    actor.y = adjY;
                } else {
                    actor.x = actor.x - ndx * pushBack;
                    actor.y = actor.y - ndy * pushBack;
                }
                break;
            }

            if (!blocked) {
                actor.x = newX;
                actor.y = newY;
            }

            actor.facing = this.directionFromDelta(ndx, ndy);
            clampToArena(actor);
        };

        {
            const l = lightActor;
            let dx = 0;
            let dy = 0;
            if (!shouldBlockMovementWhileAttacking(l, lightPiece)) {
                if (this.keys['KeyA']) dx -= 1;
                if (this.keys['KeyD']) dx += 1;
                if (this.keys['KeyW']) dy -= 1;
                if (this.keys['KeyS']) dy += 1;
                if (this.doesSideUseGamepad('light')) {
                    dx += gpStickX;
                    dy += gpStickY;
                }
                if (this.touchState.light.active) {
                    const tl = this.touchState.light;
                    if (tl.snappedDx !== 0 || tl.snappedDy !== 0) {
                        const slen = Math.hypot(tl.snappedDx, tl.snappedDy) || 1;
                        dx += tl.snappedDx / slen;
                        dy += tl.snappedDy / slen;
                    }
                }
            }
            moveActor(l, lightPiece, dx, dy);
        }

        {
            const d = darkActor;
            let dx = 0;
            let dy = 0;
            if (!shouldBlockMovementWhileAttacking(d, darkPiece)) {
                if (this.keys['ArrowLeft']) dx -= 1;
                if (this.keys['ArrowRight']) dx += 1;
                if (this.keys['ArrowUp']) dy -= 1;
                if (this.keys['ArrowDown']) dy += 1;
                if (this.doesSideUseGamepad('dark')) {
                    dx += gpStickX;
                    dy += gpStickY;
                }
                if (this.touchState.dark.active) {
                    const td = this.touchState.dark;
                    if (td.snappedDx !== 0 || td.snappedDy !== 0) {
                        const slen = Math.hypot(td.snappedDx, td.snappedDy) || 1;
                        dx += td.snappedDx / slen;
                        dy += td.snappedDy / slen;
                    }
                }
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

        const tryApplyAttackDamage = (attackerActor, attackerPiece, defenderActor, defenderPiece) => {
            if (!attackerActor?.isAttacking) return false;
            if (attackerActor.didDamageThisAttack) return false;
            if (!defenderActor) return false;

            const zone = attackZone(attackerActor);
            const defHB = actorHitbox(defenderActor);
            if (!rectsOverlap(zone, defHB)) return false;

            const stats = this.getUnitStats(attackerPiece?.type, attackerPiece?.id);
            if (!stats) return false;
            const damage = stats.attackDamage;

            if (this.isActorInvulnerable(defenderActor, defenderPiece)) return false;

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

            let hitSolidBush = false;
            for (const obs of (this.combat.obstacles ?? [])) {
                if (obs.type !== 'solid') continue;
                const or = obstacleRect(obs);
                if (p.x >= or.x && p.x <= or.x + or.w && p.y >= or.y && p.y <= or.y + or.h) {
                    hitSolidBush = true;
                    break;
                }
            }
            if (hitSolidBush) {
                this.combat.projectiles.splice(i, 1);
                continue;
            }

            const targetActor = p.ownerSide === 'light' ? darkActor : lightActor;
            if (!targetActor) continue;

            const targetPiece = p.ownerSide === 'light' ? darkPiece : lightPiece;

            const dx = p.x - targetActor.x;
            const dy = p.y - targetActor.y;
            const dist = Math.hypot(dx, dy);
            if (dist > projectileHitRadius) continue;

            if (!this.isActorInvulnerable(targetActor, targetPiece)) {
                targetActor.currentHP = (targetActor.currentHP ?? 0) - (p.damage ?? 0);
            }
            this.combat.projectiles.splice(i, 1);
        }

        {
            const applyAuraDps = (actor, actorPiece, opponentActor, opponentPiece) => {
                if (!actor?.isAttacking) return;
                const effectiveType = this.getEffectiveCombatTypeForPiece(actorPiece);
                if (effectiveType === 'Phoenix') return;
                const prog = actor.auraProgress ?? 0;
                if (prog <= 0.25) return;
                if (!opponentActor) return;
                if (this.isActorInvulnerable(opponentActor, opponentPiece)) return;

                const rx = ((spriteSize * 3.5) / 2) * prog;
                const ry = ((spriteSize * 1.75) / 2) * prog;
                if (rx <= 0 || ry <= 0) return;

                const dx = opponentActor.x - actor.x;
                const dy = opponentActor.y - actor.y;
                const inside = ((dx * dx) / (rx * rx)) + ((dy * dy) / (ry * ry)) <= 1;
                if (!inside) return;

                const stats = this.getUnitStats(actorPiece?.type, actorPiece?.id);
                const DPS = stats?.auraDamagePerSecond ?? 12;
                opponentActor.currentHP = (opponentActor.currentHP ?? 0) - (DPS * deltaTime);
            };

            if (lightCombatType === 'AURA') applyAuraDps(lightActor, lightPiece, darkActor, darkPiece);
            if (darkCombatType === 'AURA') applyAuraDps(darkActor, darkPiece, lightActor, lightPiece);
        }

        {
            const applyPhoenixExplosionDps = (actor, actorPiece, opponentActor, opponentPiece) => {
                const effectiveType = this.getEffectiveCombatTypeForPiece(actorPiece);
                if (effectiveType !== 'Phoenix') return;
                if (!actor) return;
                if ((actor.auraState ?? 'idle') === 'idle') return;
                if (!opponentActor) return;
                if (this.isActorInvulnerable(opponentActor, opponentPiece)) return;

                const intScale = Math.max(1, Math.floor(spriteSize / 64));
                const radius = (237 / 2) * intScale * 0.9;
                const dx = opponentActor.x - actor.x;
                const dy = opponentActor.y - actor.y;
                const dist = Math.hypot(dx, dy);
                if (dist >= radius) return;

                const stats = this.getUnitStats(actorPiece?.type, actorPiece?.id);
                const DPS = stats?.auraDamagePerSecond ?? 12;
                opponentActor.currentHP = (opponentActor.currentHP ?? 0) - (DPS * deltaTime);
            };

            applyPhoenixExplosionDps(lightActor, lightPiece, darkActor, darkPiece);
            applyPhoenixExplosionDps(darkActor, darkPiece, lightActor, lightPiece);
        }

        if (lightActor && darkActor) {
            if (lightCombatType === 'MELEE') {
                const darkKilled = tryApplyAttackDamage(lightActor, lightPiece, darkActor, darkPiece);
                if (darkKilled) {
                    this.resolveCombat({ winnerId: this.combat.lightPieceId, loserId: this.combat.darkPieceId });
                    return;
                }
            }

            if (darkCombatType === 'MELEE') {
                const lightKilled = tryApplyAttackDamage(darkActor, darkPiece, lightActor, lightPiece);
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

        if (this.keys['KeyH']) {
            this.keys['KeyH'] = false;
            this.showHPDebugOverlay = !this.showHPDebugOverlay;
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

        if (this.gameState === 'SPLASH') {
            this.renderSplash();
        } else if (this.gameState === 'CONFIG') {
            this.renderConfig();
        } else if (this.gameState === 'COMBAT') {
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

        this.ctx.font = '12px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Press 1: Light wins   2: Dark wins   3: mutual destruction', this.width / 2, ay + arenaH - 56);
        this.ctx.fillText('WASD: move Light (hold 2 keys for diagonals)', this.width / 2, ay + arenaH - 38);
        this.ctx.fillText('Arrows: move Dark (hold 2 keys for diagonals)', this.width / 2, ay + arenaH - 22);

        const leftX = ax + Math.floor(arenaW * 0.25);
        const rightX = ax + Math.floor(arenaW * 0.75);
        const midY = ay + Math.floor(arenaH * 0.55);

        const combatLight = this.combat.lightActor ?? { x: leftX, y: midY, facing: lightPiece?.facing ?? 'E' };
        const combatDark = this.combat.darkActor ?? { x: rightX, y: midY, facing: darkPiece?.facing ?? 'W' };

        if (this.combat.obstacles && this.combat.obstacles.length > 0) {
            const prevSmoothing = this.ctx.imageSmoothingEnabled;
            this.ctx.imageSmoothingEnabled = false;
            for (const obs of this.combat.obstacles) {
                const img = obs.type === 'solid' ? this.bushImage : this.bushFadeImage;
                const loaded = obs.type === 'solid' ? this.bushLoaded : this.bushFadeLoaded;
                if (!loaded || !img) continue;
                const drawX = Math.floor(obs.x - obs.width / 2);
                const drawY = Math.floor(obs.y - obs.height / 2);
                this.ctx.drawImage(img, drawX, drawY, obs.width, obs.height);
            }
            this.ctx.imageSmoothingEnabled = prevSmoothing;
        }

        const lightEffectiveType = this.getEffectiveCombatTypeForPiece(lightPiece);
        const darkEffectiveType = this.getEffectiveCombatTypeForPiece(darkPiece);

        if (lightPiece && lightEffectiveType === 'Phoenix' && (combatLight?.auraState ?? 'idle') !== 'idle') {
            this.drawPhoenixExplosion(combatLight, spriteSize);
        } else if (lightPiece && this.getCombatType(lightPiece.type, lightPiece.id) === 'AURA' && combatLight?.isAttacking) {
            this.drawAuraShimmer(combatLight, lightPiece, spriteSize);
        }

        if (darkPiece && darkEffectiveType === 'Phoenix' && (combatDark?.auraState ?? 'idle') !== 'idle') {
            this.drawPhoenixExplosion(combatDark, spriteSize);
        } else if (darkPiece && this.getCombatType(darkPiece.type, darkPiece.id) === 'AURA' && combatDark?.isAttacking) {
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
                        : shooterType === 'Unicorn'
                            ? this.unicornProjectileSprite
                        : shooterType === 'Basilisk'
                            ? this.basiliskProjectileSprite
                        : shooterType === 'Sorceress'
                            ? this.sorceressProjectileSprite
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
                    const preferBlue = (p.fromShapeshifter && p.ownerSide === 'dark');
                    const imageOverride = preferBlue ? this.getSpriteImageForPiece(sprite, null, true) : null;
                    this.drawWalkCycleSprite(sprite, p.x, p.y, projDrawSize, p.direction ?? 'E', 0, imageOverride);
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

        const lightBarX = pad;
        const darkBarX = this.width - pad - barW;

        drawBar(lightBarX, 'rgb(255, 180, 70)', lightActor);
        drawBar(darkBarX, 'rgb(0, 43, 115)', darkActor);

        if (this.showHPDebugOverlay) {
            const ctx = this.ctx;
            const hpPerPixel = barH / GLOBAL_MAX_HP;

            const drawScale = (barX, side) => {
                const scaleColor = side === 'light' ? 'rgba(255, 200, 120, 0.6)' : 'rgba(100, 150, 220, 0.6)';
                const thickColor = side === 'light' ? 'rgba(255, 200, 120, 0.9)' : 'rgba(100, 150, 220, 0.9)';
                const textColor = side === 'light' ? 'rgba(255, 220, 160, 0.9)' : 'rgba(140, 180, 240, 0.9)';
                const scaleX = side === 'light' ? barX + barW + 3 : barX - 3;

                for (let hp = 0; hp <= GLOBAL_MAX_HP; hp++) {
                    const y = Math.round(bottom - hp * hpPerPixel);
                    const isMajor = hp % 5 === 0;
                    const tickLen = isMajor ? 8 : 4;
                    const tickW = isMajor ? 1.5 : 0.5;

                    ctx.strokeStyle = isMajor ? thickColor : scaleColor;
                    ctx.lineWidth = tickW;
                    ctx.beginPath();
                    if (side === 'light') {
                        ctx.moveTo(scaleX, y);
                        ctx.lineTo(scaleX + tickLen, y);
                    } else {
                        ctx.moveTo(scaleX, y);
                        ctx.lineTo(scaleX - tickLen, y);
                    }
                    ctx.stroke();
                }

                ctx.font = '10px monospace';
                ctx.fillStyle = textColor;
                if (side === 'light') {
                    ctx.textAlign = 'left';
                    ctx.fillText('0', scaleX + 10, bottom - 2);
                    ctx.fillText(GLOBAL_MAX_HP.toFixed(1), scaleX + 10, top + 10);
                } else {
                    ctx.textAlign = 'left';
                    ctx.fillText('0', barX + barW + 4, bottom - 2);
                    ctx.fillText(GLOBAL_MAX_HP.toFixed(1), barX + barW + 4, top + 10);
                }
            };

            drawScale(lightBarX, 'light');
            drawScale(darkBarX, 'dark');

            const drawReadout = (barX, actor, side) => {
                if (!actor) return;
                const cur = (actor.currentHP ?? 0).toFixed(1);
                const max = (actor.maxHP ?? 0).toFixed(1);
                const label = `${cur} / ${max}`;

                ctx.font = '11px monospace';
                const textColor = side === 'light' ? 'rgba(255, 220, 160, 0.95)' : 'rgba(140, 180, 240, 0.95)';
                ctx.fillStyle = textColor;

                const actorMaxHP = Math.max(0, actor.maxHP ?? 0);
                const totalHeight = Math.max(0, Math.min(barH, Math.floor(barH * (actorMaxHP / GLOBAL_MAX_HP))));
                const barTopY = bottom - totalHeight;

                if (side === 'light') {
                    ctx.textAlign = 'left';
                    ctx.fillText(label, lightBarX, barTopY - 6);
                } else {
                    ctx.textAlign = 'right';
                    ctx.fillText(label, darkBarX + barW, barTopY - 6);
                }
            };

            drawReadout(lightBarX, lightActor, 'light');
            drawReadout(darkBarX, darkActor, 'dark');

            const drawLiveHP = (actor, side) => {
                if (!actor) return;
                const cur = (actor.currentHP ?? 0).toFixed(1);
                ctx.font = '14px monospace';
                const textColor = side === 'light' ? 'rgba(255, 220, 160, 0.95)' : 'rgba(140, 180, 240, 0.95)';
                ctx.fillStyle = textColor;
                if (side === 'light') {
                    ctx.textAlign = 'left';
                    ctx.fillText(`HP: ${cur}`, 10, 20);
                } else {
                    ctx.textAlign = 'right';
                    ctx.fillText(`HP: ${cur}`, this.width - 10, 20);
                }
            };

            drawLiveHP(lightActor, 'light');
            drawLiveHP(darkActor, 'dark');

            ctx.textAlign = 'start';
            ctx.textBaseline = 'alphabetic';
        }
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
        let renderType = piece.type;
        if (piece.type === 'Shape Shifter' && this.gameState === 'COMBAT') {
            if (piece.side === 'light' && this.combat?.lightCopiedType) {
                renderType = this.combat.lightCopiedType;
            }
            if (piece.side === 'dark' && this.combat?.darkCopiedType) {
                renderType = this.combat.darkCopiedType;
            }
        }

        const preferBlue = (this.gameState === 'COMBAT' && piece?.type === 'Shape Shifter' && piece?.side === 'dark');

        if (renderType === 'Knight' && this.knightSprite.loaded) {
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.knightSprite, piece, true) : null;
            this.drawKnightSprite(cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Goblin' && this.goblinSprite.loaded) {
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.goblinSprite, piece, true) : null;
            this.drawGoblinSprite(cx, cy, spriteSize, facing ?? 'W', frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Unicorn' && this.unicornSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.unicornSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.unicornSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Basilisk' && this.basiliskSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.basiliskSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.basiliskSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Sorceress' && this.sorceressSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.sorceressSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.sorceressSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Wizard' && this.wizardSprite.loaded) {
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.wizardSprite, piece, true) : null;
            this.drawWizardSprite(cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Phoenix' && this.phoenixSprite.loaded) {
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.phoenixSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.phoenixSprite, cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Archer' && this.archerSprite.loaded) {
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.archerSprite, piece, true) : null;
            this.drawArcherSprite(cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Golem' && this.golemSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.golemSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.golemSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Troll' && this.trollSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.trollSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.trollSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Banshee' && this.bansheeSprite.loaded) {
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.bansheeSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.bansheeSprite, cx, cy, spriteSize, facing ?? 'W', frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Dragon' && this.dragonSprite.loaded) {
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.dragonSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.dragonSprite, cx, cy, spriteSize, facing ?? 'E', frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Valkyrie' && this.valkyrieSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.valkyrieSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.valkyrieSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Djinn' && this.djinnSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.djinnSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.djinnSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0, imageOverride);
            return;
        }
        if (renderType === 'Manticore' && this.manticoreSprite.loaded) {
            const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
            const imageOverride = preferBlue ? this.getSpriteImageForPiece(this.manticoreSprite, piece, true) : null;
            this.drawWalkCycleSprite(this.manticoreSprite, cx, cy, spriteSize, facing ?? defaultFacing, frameIndex ?? 0, imageOverride);
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

        const effectiveType = this.getEffectiveCombatTypeForPiece(piece);
        const preferBlue = (piece.type === 'Shape Shifter' && piece.side === 'dark' && this.gameState === 'COMBAT');

        if (effectiveType === 'Knight') {
            if (!this.knightSprite.loaded) return;
            if (!this.knightSwordSprite.loaded) return;
            this.drawAnchoredOverlay(
                this.knightSprite,
                this.knightSwordSprite,
                KNIGHT_SWORD_ANCHORS,
                actor.x,
                actor.y,
                spriteSize,
                actor.facing ?? 'E',
                preferBlue ? this.getSpriteImageForPiece(this.knightSprite, piece, true) : null,
                preferBlue ? this.getSpriteImageForPiece(this.knightSwordSprite, piece, true) : null
            );
        }

        if (effectiveType === 'Goblin') {
            if (!this.goblinSprite.loaded) return;
            if (!this.goblinClubSprite.loaded) return;
            this.drawAnchoredOverlay(
                this.goblinSprite,
                this.goblinClubSprite,
                GOBLIN_CLUB_ANCHORS_FOR_OVERLAY,
                actor.x,
                actor.y,
                spriteSize,
                actor.facing ?? 'E',
                preferBlue ? this.getSpriteImageForPiece(this.goblinSprite, piece, true) : null,
                preferBlue ? this.getSpriteImageForPiece(this.goblinClubSprite, piece, true) : null
            );
        }
    }

    drawAnchoredOverlay(bodySprite, overlaySprite, anchors, cx, cy, tileSize, facing, bodyImageOverride = null, overlayImageOverride = null) {
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
        const overlayImg = overlayImageOverride ?? overlaySprite.img;
        this.ctx.drawImage(overlayImg, sx, sy, overlaySw, overlaySh, dx, dy, overlaySw * intScale, overlaySh * intScale);
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

        let lightOriginalType = null;
        let lightCopiedType = null;
        let darkOriginalType = null;
        let darkCopiedType = null;

        if (lightPiece?.type === 'Shape Shifter') {
            const opponentType = darkPiece?.type;
            lightOriginalType = 'Shape Shifter';
            lightCopiedType = opponentType;
        }

        if (darkPiece?.type === 'Shape Shifter') {
            const opponentType = lightPiece?.type;
            darkOriginalType = 'Shape Shifter';
            darkCopiedType = opponentType;
        }

        const combatSquareColor = this.boardColorCodes?.[capture.square.y]?.[capture.square.x] ?? 'D';

        const getActorHPFromPiece = (piece) => {
            const baseHP = UNIT_STATS[piece?.type]?.baseHP ?? 0;
            const squareBonus = this.getSquareHPBonus(piece, combatSquareColor);
            const effectiveHP = baseHP + squareBonus;
            const persistentDamage = piece?.persistentDamage ?? 0;
            const startingHP = Math.max(0.5, effectiveHP - persistentDamage);
            return { maxHP: Math.max(0.5, effectiveHP), currentHP: startingHP };
        };

        const lightHP = getActorHPFromPiece(lightPiece);
        const darkHP = getActorHPFromPiece(darkPiece);


        this.combat = {
            attackerId: capture.attackerId,
            defenderId: capture.defenderId,
            lightPieceId,
            darkPieceId,
            lightOriginalType,
            lightCopiedType,
            darkOriginalType,
            darkCopiedType,
            square: capture.square,
            canvasRestore,
            arena,
            spriteSize,
            projectiles: [],
            obstacles: [],
            obstacleTimer: 0,
            obstacleInterval: 12.0,
            lightActor: { x: leftX, y: midY, facing: 'E', side: 'light', maxHP: lightHP.maxHP ?? 0, currentHP: lightHP.currentHP ?? 0, walkAnimTime: 0, isMoving: false, isAttacking: false, attackTimeLeft: 0, didDamageThisAttack: false, attackCooldownLeft: 0, auraState: 'idle', auraTimer: 0, auraFrameIndex: 0 },
            darkActor: { x: rightX, y: midY, facing: 'W', side: 'dark', maxHP: darkHP.maxHP ?? 0, currentHP: darkHP.currentHP ?? 0, walkAnimTime: 0, isMoving: false, isAttacking: false, attackTimeLeft: 0, didDamageThisAttack: false, attackCooldownLeft: 0, auraState: 'idle', auraTimer: 0, auraFrameIndex: 0 }
        };

        this.generateCombatObstacles();
    }

    generateCombatObstacles() {
        if (!this.combat) return;
        this.combat.obstacles = [];

        const arena = this.combat.arena ?? this.computeCombatArena();
        const spriteSize = this.combat.spriteSize ?? this.getCombatSpriteSize(arena.arenaW, arena.arenaH);
        const bushScale = 0.75;
        const bushW = spriteSize * bushScale;
        const bushH = spriteSize * bushScale;
        const ax = arena.ax;
        const ay = arena.ay;
        const arenaW = arena.arenaW;
        const arenaH = arena.arenaH;

        const border = 64;
        const usableW = arenaW - border * 2;
        const usableH = arenaH - border * 2;
        const cellW = usableW / 5;
        const cellH = usableH / 5;

        const spawnMargin = arenaW * 0.20;

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const cx = ax + border + col * cellW + cellW / 2;
                const cy = ay + border + row * cellH + cellH / 2;

                if (cx - bushW / 2 < ax + spawnMargin) continue;
                if (cx + bushW / 2 > ax + arenaW - spawnMargin) continue;

                const roll = Math.random();
                if (roll < 0.35) continue;

                const type = roll < 0.70 ? 'fade' : 'solid';

                this.combat.obstacles.push({
                    x: cx,
                    y: cy,
                    width: bushW,
                    height: bushH,
                    type
                });
            }
        }
    }

    drawPhoenixExplosion(actor, spriteSize) {
        if (!actor) return;
        if (!this.phoenixExplosionSprite?.loaded) return;
        const frameIndex = Math.max(0, Math.min(2, actor.auraFrameIndex ?? 0));

        let useBlue = false;
        if (this.gameState === 'COMBAT' && actor.side === 'dark' && this.combat?.darkPieceId != null) {
            const darkPiece = this.getPieceById(this.combat.darkPieceId);
            if (darkPiece?.type === 'Shape Shifter' && darkPiece?.side === 'dark') {
                useBlue = true;
            }
        }

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
        const img = (useBlue && this.phoenixExplosionSprite.blueLoaded && this.phoenixExplosionSprite.blueImg)
            ? this.phoenixExplosionSprite.blueImg
            : this.phoenixExplosionSprite.img;
        this.ctx.drawImage(img, sx, sy, 237, 128, dx, dy, drawW, drawH);
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

            if (this.phoenixExplosionSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.phoenixExplosionSprite.blueImg = blueVersion;
                this.phoenixExplosionSprite.blueLoaded = true;
            }
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadSorceressSprite() {
        const candidates = SPRITE_PATHS.Sorceress.walk;

        this.loadWalkCycleSpriteSheet(
            this.sorceressSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadSorceressProjectileSprite() {
        const candidates = SPRITE_PATHS.Sorceress.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.sorceressProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.sorceressProjectileSprite.loaded = false;
                return;
            }

            this.sorceressProjectileSprite.img = img;
            this.sorceressProjectileSprite.cols = 1;
            this.sorceressProjectileSprite.rows = 8;
            this.sorceressProjectileSprite.frameW = img.width;
            this.sorceressProjectileSprite.frameH = frameH;
            this.sorceressProjectileSprite.loaded = this.sorceressProjectileSprite.frameW > 0 && this.sorceressProjectileSprite.frameH > 0;

            if (this.sorceressProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.sorceressProjectileSprite.blueImg = blueVersion;
                this.sorceressProjectileSprite.blueLoaded = true;
            }
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadBasiliskSprite() {
        const candidates = SPRITE_PATHS.Basilisk.walk;

        this.loadWalkCycleSpriteSheet(
            this.basiliskSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadBasiliskProjectileSprite() {
        const candidates = SPRITE_PATHS.Basilisk.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.basiliskProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.basiliskProjectileSprite.loaded = false;
                return;
            }

            this.basiliskProjectileSprite.img = img;
            this.basiliskProjectileSprite.cols = 1;
            this.basiliskProjectileSprite.rows = 8;
            this.basiliskProjectileSprite.frameW = img.width;
            this.basiliskProjectileSprite.frameH = frameH;
            this.basiliskProjectileSprite.loaded = this.basiliskProjectileSprite.frameW > 0 && this.basiliskProjectileSprite.frameH > 0;

            if (this.basiliskProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.basiliskProjectileSprite.blueImg = blueVersion;
                this.basiliskProjectileSprite.blueLoaded = true;
            }
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadUnicornSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Unicorn.walk;

        this.loadWalkCycleSpriteSheet(
            this.unicornSprite,
            candidates,
            [4, 3],
            [8]
        );
    }

    loadUnicornProjectileSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS.Unicorn.projectile;

        const img = new Image();

        let candidateIndex = 0;
        const tryNext = () => {
            if (candidateIndex >= candidates.length) {
                this.unicornProjectileSprite.loaded = false;
                return;
            }
            img.src = candidates[candidateIndex];
            candidateIndex++;
        };

        img.onload = () => {
            const frameH = img.height / 8;
            if (!Number.isInteger(frameH)) {
                this.unicornProjectileSprite.loaded = false;
                return;
            }

            this.unicornProjectileSprite.img = img;
            this.unicornProjectileSprite.cols = 1;
            this.unicornProjectileSprite.rows = 8;
            this.unicornProjectileSprite.frameW = img.width;
            this.unicornProjectileSprite.frameH = frameH;
            this.unicornProjectileSprite.loaded = this.unicornProjectileSprite.frameW > 0 && this.unicornProjectileSprite.frameH > 0;

            if (this.unicornProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.unicornProjectileSprite.blueImg = blueVersion;
                this.unicornProjectileSprite.blueLoaded = true;
            }
        };

        img.onerror = () => {
            tryNext();
        };

        tryNext();
    }

    loadShapeshifterSprite() {
        // Paths pulled from SPRITE_PATHS configuration block
        const candidates = SPRITE_PATHS['Shape Shifter'].walk;

        this.loadWalkCycleSpriteSheet(
            this.shapeshifterSprite,
            candidates,
            [4, 3],
            [8]
        );
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

            if (this.djinnProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.djinnProjectileSprite.blueImg = blueVersion;
                this.djinnProjectileSprite.blueLoaded = true;
            }
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

            if (this.manticoreProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.manticoreProjectileSprite.blueImg = blueVersion;
                this.manticoreProjectileSprite.blueLoaded = true;
            }
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

            if (this.valkyrieProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.valkyrieProjectileSprite.blueImg = blueVersion;
                this.valkyrieProjectileSprite.blueLoaded = true;
            }
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

            if (this.dragonProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.dragonProjectileSprite.blueImg = blueVersion;
                this.dragonProjectileSprite.blueLoaded = true;
            }
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

        const getMaxHPForPiece = (piece) => {
            if (!piece) return 0;
            const pieceMax = piece.maxHP;
            if (typeof pieceMax === 'number' && Number.isFinite(pieceMax)) return pieceMax;
            const fallback = UNIT_STATS[piece.type]?.maxHP;
            return typeof fallback === 'number' && Number.isFinite(fallback) ? fallback : 0;
        };

        const setPieceDead = (piece) => {
            if (!piece) return;
            piece.currentHP = 0;
        };

        const setPieceCurrentFromActor = (piece, actor) => {
            if (!piece) return;
            const maxHP = getMaxHPForPiece(piece);
            const curRaw = (typeof actor?.currentHP === 'number' && Number.isFinite(actor.currentHP)) ? actor.currentHP : maxHP;
            piece.currentHP = Math.max(0, Math.min(maxHP, curRaw));
        };

        if (result.mutualDestruction) {
            const attacker = this.getPieceById(this.combat.attackerId);
            const defender = this.getPieceById(this.combat.defenderId);
            setPieceDead(attacker);
            setPieceDead(defender);
            this.removePieceById(this.combat.attackerId);
            this.removePieceById(this.combat.defenderId);
        } else {
            const loserPiece = this.getPieceById(result.loserId);
            setPieceDead(loserPiece);
            this.removePieceById(result.loserId);

            const winner = this.getPieceById(result.winnerId);
            if (winner) {
                const winnerActor = (result.winnerId === this.combat.lightPieceId)
                    ? this.combat.lightActor
                    : (result.winnerId === this.combat.darkPieceId)
                        ? this.combat.darkActor
                        : (winner.side === 'light' ? this.combat.lightActor : this.combat.darkActor);

                setPieceCurrentFromActor(winner, winnerActor);

                if (winner.type === 'Shape Shifter') {
                    winner.currentHP = getMaxHPForPiece(winner);
                    winner.persistentDamage = 0;
                } else {
                    const actorMax = winnerActor?.maxHP ?? 0;
                    const actorCur = winnerActor?.currentHP ?? 0;
                    winner.persistentDamage = Math.max(0, actorMax - actorCur);
                }

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

    gridToXY(pos) {
        const rc = this.gridPosToRowCol(pos);
        return { x: rc.col, y: rc.row };
    }
    
    drawTestPattern() {
        // Draw a simple checkerboard pattern to verify canvas is working
        const boardSize = this.boardSize;
        const { tileSize, boardPixelSize, offsetX, offsetY } = this.computeBoardLayout();

        const hexToRgb = (hex) => {
            const h = hex.replace('#', '');
            return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
        };
        const fadeT = this.squareFadeActive ? Math.max(0, Math.min(1, this.squareFadeTime / this.squareFadeDuration)) : 1;

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const x = offsetX + col * tileSize;
                const y = offsetY + row * tileSize;

                if (this.squareFadeActive && this.boardRotates?.[row]?.[col] && this.squareFadeFrom && this.squareFadeTo) {
                    const fromCode = this.squareFadeFrom[row]?.[col] ?? 'D';
                    const toCode = this.squareFadeTo[row]?.[col] ?? 'D';
                    const fromRgb = hexToRgb(this.squareHexColors[fromCode] ?? '#666666');
                    const toRgb = hexToRgb(this.squareHexColors[toCode] ?? '#666666');
                    const r = Math.round(fromRgb[0] + (toRgb[0] - fromRgb[0]) * fadeT);
                    const g = Math.round(fromRgb[1] + (toRgb[1] - fromRgb[1]) * fadeT);
                    const b = Math.round(fromRgb[2] + (toRgb[2] - fromRgb[2]) * fadeT);
                    this.ctx.fillStyle = `rgb(${r},${g},${b})`;
                } else {
                    const colorCode = this.boardColorCodes?.[row]?.[col] ?? 'D';
                    this.ctx.fillStyle = this.squareHexColors[colorCode] ?? '#666666';
                }
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
        this.drawBoardCursor(offsetX, offsetY, tileSize);
        this.drawIllegalFlash(offsetX, offsetY, tileSize);

        this.drawPowerPoints();

        this.drawPieces(offsetX, offsetY, tileSize);

        // Debug: show HP info on each piece (toggle with H key)
        if (this.showHPDebugOverlay) {
            this.ctx.save();
            this.ctx.font = 'bold 9px Courier New';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'top';
            for (const piece of this.pieces) {
                if (piece.state === 'MOVING') continue;
                const stats = UNIT_STATS[piece.type];
                if (!stats) continue;
                const baseHP = stats.baseHP ?? 0;
                const sqColor = this.boardColorCodes?.[piece.row]?.[piece.col] ?? 'D';
                const sqBonus = this.getSquareHPBonus(piece, sqColor);
                const pd = piece.persistentDamage ?? 0;
                const hp = baseHP + sqBonus - pd;
                const px = offsetX + piece.col * tileSize + tileSize / 2;
                const py = offsetY + piece.row * tileSize + 1;
                this.ctx.fillStyle = '#FFFF00';
                this.ctx.fillText(`HP:${hp}`, px, py);
                if (pd !== 0) {
                    this.ctx.fillStyle = pd > 0 ? '#FF4444' : '#44FF44';
                    this.ctx.fillText(`pd:${pd}`, px, py + 10);
                }
            }
            this.ctx.restore();
        }

        // Draw center text
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '18px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('STRATEGY SCREEN (GRID ONLY)', this.width / 2, offsetY - 14);

        this.drawTurnIndicator(offsetX, offsetY);

        if (this.worldShiftMessage !== null) {
            const t = this.worldShiftTimer;
            const total = this.worldShiftDuration;
            const fade = this.worldShiftFadeDuration;

            let alpha;
            if (t < fade) {
                alpha = t / fade;
            } else if (t > total - fade) {
                alpha = (total - t) / fade;
            } else {
                alpha = 1;
            }
            alpha = Math.max(0, Math.min(1, alpha));

            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.font = '20px AppleII';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'top';
            this.ctx.fillStyle = '#FFFFFF';

            const msgX = this.width / 2;
            const msgY = this.height - 60;
            this.ctx.fillText(this.worldShiftMessage, msgX, msgY);
            this.ctx.fillText(this.worldShiftMessage, msgX + 1, msgY);
            this.ctx.restore();
        }
    }

    drawPowerPoints() {
        if (!Array.isArray(this.powerPoints) || this.powerPoints.length === 0) return;

        const layout = this.boardLayout ?? this.computeBoardLayout();
        const originX = layout.originX ?? layout.offsetX ?? 0;
        const originY = layout.originY ?? layout.offsetY ?? 0;
        const squareSize = layout.squareSize ?? layout.tileSize ?? 0;
        if (squareSize <= 0) return;

        const prevSmoothing = this.ctx.imageSmoothingEnabled;
        this.ctx.imageSmoothingEnabled = false;

        const size = Math.floor(squareSize * 0.5);
        const flicker = 0.75 + Math.sin(this.powerPointFlickerTime * 8) * 0.25;
        const shimmerRadius = squareSize * 0.2;

        for (const pp of this.powerPoints) {
            const { x, y } = this.gridToXY(pp.grid);
            if (!this.isInBounds(x, y)) continue;

            const squareLetter = this.boardColorCodes?.[y]?.[x] ?? 'D';

            let color = 'blue';
            if (pp.type === 'STATIC_WIZARD') {
                color = 'red';
            } else if (pp.type === 'STATIC_SORCERESS') {
                color = 'blue';
            } else {
                const c = String(squareLetter ?? 'A').toUpperCase();
                color = (c === 'A' || c === 'B' || c === 'C') ? 'blue' : 'red';
            }


            const img = color === 'red' ? this.redPowerPointImage : this.bluePowerPointImage;
            const loaded = color === 'red' ? this.redPowerPointLoaded : this.bluePowerPointLoaded;
            if (!loaded || !img) continue;

            const centerX = originX + x * squareSize + squareSize / 2;
            const centerY = originY + y * squareSize + squareSize / 2;

            const dx = Math.floor(centerX - size / 2);
            const dy = Math.floor(centerY - size / 2);

            this.ctx.save();
            this.ctx.globalAlpha = flicker;
            this.ctx.drawImage(img, dx, dy, size, size);

            if (ENABLE_POWER_POINT_SHIMMER) {
                this.ctx.globalAlpha = 0.15 * flicker;
                this.ctx.fillStyle = '#ffffff';
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, shimmerRadius, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.ctx.restore();
        }

        this.ctx.imageSmoothingEnabled = prevSmoothing;
    }

    createInitialBoardColorCodesLightFirst() {
        return [
            ['F', 'A', 'F', 'D', 'D', 'D', 'A', 'F', 'A'],
            ['A', 'F', 'D', 'A', 'D', 'F', 'D', 'A', 'F'],
            ['F', 'D', 'A', 'F', 'D', 'A', 'F', 'D', 'A'],
            ['D', 'A', 'F', 'A', 'D', 'F', 'A', 'F', 'D'],
            ['A', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'F'],
            ['D', 'A', 'F', 'A', 'D', 'F', 'A', 'D', 'D'],
            ['F', 'D', 'A', 'F', 'D', 'A', 'F', 'D', 'A'],
            ['A', 'F', 'D', 'A', 'D', 'F', 'D', 'A', 'F'],
            ['F', 'A', 'F', 'D', 'D', 'D', 'A', 'F', 'A']
        ];
    }

    createInitialBoardColorCodesDarkFirst() {
        return [
            ['F', 'A', 'F', 'C', 'C', 'C', 'A', 'F', 'A'],
            ['A', 'F', 'C', 'A', 'C', 'F', 'C', 'A', 'F'],
            ['F', 'C', 'A', 'F', 'C', 'A', 'F', 'C', 'A'],
            ['C', 'A', 'F', 'A', 'C', 'F', 'A', 'F', 'C'],
            ['A', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'F'],
            ['C', 'A', 'F', 'A', 'C', 'F', 'A', 'C', 'C'],
            ['F', 'C', 'A', 'F', 'C', 'A', 'F', 'C', 'A'],
            ['A', 'F', 'C', 'A', 'C', 'F', 'C', 'A', 'F'],
            ['F', 'A', 'F', 'C', 'C', 'C', 'A', 'F', 'A']
        ];
    }

    createInitialBoardRotates() {
        return [
            [false, false, false, true,  true,  true,  false, false, false],
            [false, false, true,  false, true,  false, true,  false, false],
            [false, true,  false, false, true,  false, false, true,  false],
            [true,  false, false, false, true,  false, false, false, true ],
            [false, true,  true,  true,  true,  true,  true,  true,  false],
            [true,  false, false, false, true,  false, false, true,  true ],
            [false, true,  false, false, true,  false, false, true,  false],
            [false, false, true,  false, true,  false, true,  false, false],
            [false, false, false, true,  true,  true,  false, false, false]
        ];
    }

    applyBoardConfigurationForOrder(order) {
        this.boardRotates = this.createInitialBoardRotates();

        if (order === 'DARK_FIRST') {
            this.currentSide = 'dark';
            this.boardFirstMover = 'dark';
            this.boardColorDirection = -1;
            this.boardColorCodes = this.createInitialBoardColorCodesDarkFirst();

            if (this.boardColorCodes?.[3]) {
                this.boardColorCodes[3][5] = 'F';
                this.boardColorCodes[3][7] = 'F';
            }
            if (this.boardRotates?.[3]) {
                this.boardRotates[3][5] = false;
                this.boardRotates[3][7] = false;
            }
            return;
        }

        this.currentSide = 'light';
        this.boardFirstMover = 'light';
        this.boardColorDirection = +1;
        this.boardColorCodes = this.createInitialBoardColorCodesLightFirst();

        if (this.boardColorCodes?.[3]) {
            this.boardColorCodes[3][5] = 'F';
            this.boardColorCodes[3][7] = 'F';
        }
        if (this.boardRotates?.[3]) {
            this.boardRotates[3][5] = false;
            this.boardRotates[3][7] = false;
        }
    }

    rotateBoardColors() {
        if (!this.boardColorCodes || !this.boardRotates) return;

        const toIndex = (code) => {
            const c = String(code ?? 'A').toUpperCase();
            const idx = c.charCodeAt(0) - 'A'.charCodeAt(0);
            if (Number.isFinite(idx) && idx >= 0 && idx <= 5) return idx;
            return 0;
        };
        const toCode = (idx) => String.fromCharCode('A'.charCodeAt(0) + idx);

        const prevColors = this.boardColorCodes.map(row => [...row]);
        const rotationDirection = this.boardColorDirection ?? 1;

        let hitBoundary = false;
        let anyChanged = false;

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (!this.boardRotates?.[row]?.[col]) continue;

                const idx = toIndex(this.boardColorCodes?.[row]?.[col]);
                const next = Math.max(0, Math.min(5, idx + (this.boardColorDirection ?? 1)));
                this.boardColorCodes[row][col] = toCode(next);

                if (next !== idx) anyChanged = true;
                if (this.boardColorDirection === +1 && next === 5) hitBoundary = true;
                if (this.boardColorDirection === -1 && next === 0) hitBoundary = true;
            }
        }

        if (anyChanged) {
            this.squareFadeFrom = prevColors;
            this.squareFadeTo = this.boardColorCodes.map(row => [...row]);
            this.squareFadeTime = 0;
            this.squareFadeActive = true;
        }

        if (hitBoundary) {
            this.boardColorDirection = (this.boardColorDirection ?? 1) * -1;
        }

        if (rotationDirection > 0) {
            this.worldShiftMessage = "THE WORLD GROWS DARKER";
        } else {
            this.worldShiftMessage = "THE WORLD RETURNS TO LIGHT";
        }
        this.worldShiftTimer = 0;
    }

    createInitialPiecesLight() {
        return INITIAL_LIGHT_SETUP.map((p, index) => {
            const stats = UNIT_STATS[p.type] ?? {};
            const baseHP = typeof stats.baseHP === 'number' ? stats.baseHP : 0;
            const maxHP = typeof stats.maxHP === 'number' ? stats.maxHP : baseHP;

            return {
                id: `p${index}`,
                facing: 'E',
                state: 'IDLE',
                remainingMove: 0,
                walkAnimTime: 0,
                injury: 0,
                persistentDamage: 0,
                side: 'light',
                ...p,
                baseHP,
                maxHP,
                currentHP: maxHP,
                ...this.gridPosToRowCol(p.pos)
            };
        });
    }

    createInitialPiecesDark() {
        return INITIAL_DARK_SETUP.map((p, index) => {
            const stats = UNIT_STATS[p.type] ?? {};
            const baseHP = typeof stats.baseHP === 'number' ? stats.baseHP : 0;
            const maxHP = typeof stats.maxHP === 'number' ? stats.maxHP : baseHP;

            return {
                id: `d${index}`,
                facing: 'W',
                state: 'IDLE',
                remainingMove: 0,
                walkAnimTime: 0,
                injury: 0,
                persistentDamage: 0,
                side: 'dark',
                ...p,
                baseHP,
                maxHP,
                currentHP: maxHP,
                ...this.gridPosToRowCol(p.pos)
            };
        });
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

            if (piece.type === 'Unicorn' && this.unicornSprite.loaded) {
                const walkFrame = piece.state === 'MOVING'
                    ? Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3))
                    : 0;
                const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
                this.drawWalkCycleSprite(this.unicornSprite, cx, cy, tileSize, piece.facing ?? defaultFacing, walkFrame);
                continue;
            }

            if (piece.type === 'Basilisk' && this.basiliskSprite.loaded) {
                const walkFrame = piece.state === 'MOVING'
                    ? Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3))
                    : 0;
                const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
                this.drawWalkCycleSprite(this.basiliskSprite, cx, cy, tileSize, piece.facing ?? defaultFacing, walkFrame);
                continue;
            }

            if (piece.type === 'Sorceress' && this.sorceressSprite.loaded) {
                const walkFrame = piece.state === 'MOVING'
                    ? Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3))
                    : 0;
                const defaultFacing = piece.side === 'dark' ? 'W' : 'E';
                this.drawWalkCycleSprite(this.sorceressSprite, cx, cy, tileSize, piece.facing ?? defaultFacing, walkFrame);
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

            if (piece.type === 'Shape Shifter' && this.shapeshifterSprite.loaded) {
                let walkFrame = 0;
                if (piece.state === 'MOVING') {
                    const stats = this.getUnitStats(piece?.type);
                    if (stats?.moveType === 'FLY' && piece.move) {
                        walkFrame = Math.floor(((piece.move.stepT ?? 0) * 6)) % 3;
                    } else {
                        walkFrame = Math.min(2, Math.floor((piece.walkAnimTime * 10) % 3));
                    }
                }
                const facing = piece.facing ?? 'W';
                this.drawWalkCycleSprite(this.shapeshifterSprite, cx, cy, tileSize, facing, walkFrame);
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

            const blueVersion = this.recolorImageToDarkBlue(img);
            this.knightSwordSprite.blueImg = blueVersion;
            this.knightSwordSprite.blueLoaded = true;
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

            if (this.trollProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.trollProjectileSprite.blueImg = blueVersion;
                this.trollProjectileSprite.blueLoaded = true;
            }
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

            if (this.golemProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.golemProjectileSprite.blueImg = blueVersion;
                this.golemProjectileSprite.blueLoaded = true;
            }
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

            if (this.goblinClubSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.goblinClubSprite.blueImg = blueVersion;
                this.goblinClubSprite.blueLoaded = true;
            }
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

            if (this.archerProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.archerProjectileSprite.blueImg = blueVersion;
                this.archerProjectileSprite.blueLoaded = true;
            }
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

            if (this.wizardProjectileSprite.loaded) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                this.wizardProjectileSprite.blueImg = blueVersion;
                this.wizardProjectileSprite.blueLoaded = true;
            }
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

            if (sprite.loaded && 'blueImg' in sprite && 'blueLoaded' in sprite) {
                const blueVersion = this.recolorImageToDarkBlue(img);
                sprite.blueImg = blueVersion;
                sprite.blueLoaded = true;
            }
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

        this.boardLayout = {
            tileSize,
            boardPixelSize,
            offsetX,
            offsetY,
            originX: offsetX,
            originY: offsetY,
            squareSize: tileSize
        };
        return this.boardLayout;
    }

    // --- Selection + movement (Strategy Screen)

    handleCanvasMouseDown(e) {
        if (this.gameState === 'CONFIG') {
            const pos = this.getCanvasCoordsFromMouseEvent(e);
            if (!pos) return;

            const mx = pos.x;
            const my = pos.y;

            for (let i = 0; i < (this.clickZones?.length ?? 0); i++) {
                const z = this.clickZones[i];
                if (mx < z.x || my < z.y || mx > (z.x + z.width) || my > (z.y + z.height)) continue;

                if (z.type === 'accept') {
                    this.acceptConfigAndEnterStrategy();
                    return;
                }

                if (!this.configState) {
                    this.configState = {
                        playing: 'TWO_PLAYERS_BOTH_ON_KEYBOARD',
                        sound: 'SOUND_ON',
                        order: 'LIGHT_FIRST'
                    };
                }

                if (z.type === 'playing') this.configState.playing = z.value;
                if (z.type === 'sound') this.configState.sound = z.value;
                if (z.type === 'order') this.configState.order = z.value;
                return;
            }

            return;
        }

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

    drawBoardCursor(offsetX, offsetY, tileSize) {
        if (!this.boardCursor) return;
        const x = this.boardCursor.x;
        const y = this.boardCursor.y;
        if (!this.isInBounds(x, y)) return;

        const inset = 3;
        this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.85)';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(
            offsetX + x * tileSize + inset,
            offsetY + y * tileSize + inset,
            tileSize - inset * 2,
            tileSize - inset * 2
        );
    }

    tryStartMove(piece, destX, destY) {
        const stats = this.getUnitStats(piece?.type);
        if (!stats) return false;
        const moveType = this.getMoveTypeForPiece(piece);
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

        // Instant move (no movement animation).
        piece.col = destX;
        piece.row = destY;
        piece.state = 'IDLE';
        piece.move = null;
        piece.renderX = undefined;
        piece.renderY = undefined;
        piece.walkAnimTime = 0;
        piece.remainingMove = 0;
        piece.facing = piece.side === 'dark' ? 'W' : 'E';

        if (!destStack.includes(piece)) destStack.push(piece);

        this.applyPowerPointHP(piece);

        if (captureResult) {
            this.startCombat(captureResult);
            return { type: 'move', pieceId: piece.id, square: { x: destX, y: destY } };
        }

        this.selectedPiece = null;
        this.strategyInputLocked = false;
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
        this.turnCounter = (this.turnCounter ?? 0) + 1;
        this.selectedPiece = null;
        const prevSide = this.currentSide;
        this.currentSide = this.currentSide === 'light' ? 'dark' : 'light';

        const firstMover = this.boardFirstMover ?? 'light';
        const rotateAfterSide = firstMover === 'light' ? 'dark' : 'light';
        if (prevSide === rotateAfterSide) {
            this.rotateBoardColors();
        }
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

            if (this.isTeleportMover(piece)) {
                piece.state = 'IDLE';
                piece.walkAnimTime = 0;
                piece.renderX = undefined;
                piece.renderY = undefined;
                piece.remainingMove = 0;
                continue;
            }

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

                    this.applyPowerPointHP(piece);

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

    drawKnightSprite(cx, cy, tileSize, facing, frameIndex, imageOverride = null) {
        this.drawWalkCycleSprite(this.knightSprite, cx, cy, tileSize, facing, frameIndex, imageOverride);
    }

    drawGoblinSprite(cx, cy, tileSize, facing, frameIndex, imageOverride = null) {
        this.drawWalkCycleSprite(this.goblinSprite, cx, cy, tileSize, facing, frameIndex, imageOverride);
    }

    drawWizardSprite(cx, cy, tileSize, facing, frameIndex, imageOverride = null) {
        this.drawWalkCycleSprite(this.wizardSprite, cx, cy, tileSize, facing, frameIndex, imageOverride);
    }

    drawArcherSprite(cx, cy, tileSize, facing, frameIndex, imageOverride = null) {
        this.drawWalkCycleSprite(this.archerSprite, cx, cy, tileSize, facing, frameIndex, imageOverride);
    }

    drawWalkCycleSprite(sprite, cx, cy, tileSize, facing, frameIndex, imageOverride = null) {
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
        const img = imageOverride ?? sprite.img;
        this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
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
