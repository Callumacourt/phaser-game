const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    physics: { default: 'arcade' },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);
let player;
let cursors;
let lastDirection = 'idle';
const PLAYER_SPEED = 100;

function preload() {
    for (let i = 0; i < 4; i++) {
        this.load.image(`idle_${i+1}`, `assets/0x72_DungeonTilesetII_v1.7/0x72_DungeonTilesetII_v1.7/frames/dwarf_f_idle_anim_f${i}.png`);
        this.load.image(`run_${i+1}`, `assets/0x72_DungeonTilesetII_v1.7/0x72_DungeonTilesetII_v1.7/frames/dwarf_f_run_anim_f${i}.png`);
    }
    
    // single frame animations
    this.load.image('hit', 'assets/0x72_DungeonTilesetII_v1.7/0x72_DungeonTilesetII_v1.7/frames/dwarf_f_hit_anim_f0.png');
}

function create() {
    player = this.physics.add.sprite(400, 300, 'idle_1');
    player.setCollideWorldBounds(true);
    player.setScale(2);

    this.anims.create({
        key: 'idle',
        frames: [
            { key: 'idle_1' },
            { key: 'idle_2' },
            { key: 'idle_3' },
            { key: 'idle_4' }
        ],
        frameRate: 5,
        repeat: -1
    });
    
    this.anims.create({
        key: 'running',
        frames: [
            { key: 'run_1' },
            { key: 'run_2' },
            { key: 'run_3' },
            { key: 'run_4' }
        ],
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'hit',
        frames: [{ key: 'hit' }],
        frameRate: 10,
        repeat: 0 
    });
    
    cursors = this.input.keyboard.createCursorKeys();
    player.anims.play('idle');
}

function update() {
    // Reset velocity
    player.setVelocity(0);
    
    // Handle movement with priority
    let isMoving = false;
    
    // Check for movement keys
    if (cursors.right.isDown) {
        player.setVelocityX(PLAYER_SPEED);
        player.setFlipX(false);
        player.anims.play('running', true);
        lastDirection = 'right';
        isMoving = true;
    } else if (cursors.left.isDown) {
        player.setVelocityX(-PLAYER_SPEED);
        player.setFlipX(true);
        player.anims.play('running', true);
        lastDirection = 'left';
        isMoving = true;
    } else if (cursors.up.isDown) {
        player.setVelocityY(-PLAYER_SPEED);
        player.anims.play('running', true);
        lastDirection = 'up';
        isMoving = true;
    } else if (cursors.down.isDown) {
        player.setVelocityY(PLAYER_SPEED);
        player.anims.play('running', true);
        lastDirection = 'down';
        isMoving = true;
    } 
    
    // Diagonal movement
    if ((cursors.up.isDown || cursors.down.isDown) && (cursors.left.isDown || cursors.right.isDown)) {
        // Normalize diagonal speed
        const diagonalSpeed = PLAYER_SPEED * 0.7071;
        
        player.setVelocity(
            cursors.right.isDown ? diagonalSpeed : -diagonalSpeed,
            cursors.down.isDown ? diagonalSpeed : -diagonalSpeed
        );
    }
    
    // Handle action keys
    if (cursors.space.isDown) {
        player.anims.play('hit', true);
    } else if (!isMoving) {
        player.anims.play('idle', true);
    }
}