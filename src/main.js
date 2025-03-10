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
let gun;
let cursors;

function preload() {
    this.load.spritesheet('player', 'assets/ZombieShooter/Sprites/Character/Body/Body.png', {
        frameWidth: 32, 
        frameHeight: 32
    });

    this.load.spritesheet('gun', 'assets/ZombieShooter/Sprites/Objects&Tiles/Weapons.png', {
        frameHeight: 8, 
        frameWidth: 32,
    });
}

function create() {
    // Create the player sprite
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);
    player.setScale(3);

    gun = this.add.sprite(player.x + 8, player.y, 'gun', 0);
    gun.setOrigin(0.5, 0.5); 
    gun.setScale(1.5); 

    // Walking animations for player 
    this.anims.create({
        key: 'walk-down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }), 
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'walk-left',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'walk-right',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }), 
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'walk-up',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }), 
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    player.setVelocity(0);

    // Handle movement
    if (cursors.left.isDown) {
        player.setVelocityX(-100);
        player.anims.play('walk-left', true);
        gun.setFlipX(true); // Flip gun when moving left
    } else if (cursors.right.isDown) {
        player.setVelocityX(100);
        player.anims.play('walk-right', true);
        gun.setFlipX(false); // Flip gun back when moving right
    } else if (cursors.up.isDown) {
        player.setVelocityY(-100);
        player.anims.play('walk-up', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(100);
        player.anims.play('walk-down', true);
    } else {
        player.anims.stop(); 
    }

    gun.x = player.x + 8; // Adjust gun's X position relative to player
    gun.y = player.y; // Keep gun's Y position aligned with player
}
