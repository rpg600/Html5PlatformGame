var Player = function() {
    this.lastDirection = 'right';

    this.spriteSheet_idle = new createjs.SpriteSheet({
        images: ["images/kisuke_idle_weapon.png"],
        frames: [[0,0,114,234,0,-85.3,102.55],[114,0,114,234,0,-85.3,102.55],[228,0,114,234,0,-85.3,102.55],[342,0,114,234,0,-85.3,102.55],[0,234,114,234,0,-85.3,102.55],[114,234,114,234,0,-85.3,102.55],[228,234,114,234,0,-85.3,102.55],[342,234,114,234,0,-85.3,102.55],[0,468,114,234,0,-85.3,102.55]],
        animations: { idle: [0, 8, "idle", 4] }
    });

    this.idle = new createjs.BitmapAnimation(this.spriteSheet_idle);
    this.idle.regX = 140;
    this.idle.regY = 68;
    this.idle.currentFrame = 0;

    this.spriteSheet_run = new createjs.SpriteSheet({
        images: ["images/kisuke_run_weapon.png"],
        frames: [[0,0,189,217,0,108.5,86.65],[189,0,189,217,0,108.5,86.65],[378,0,189,217,0,108.5,86.65],[567,0,189,217,0,108.5,86.65],[756,0,189,217,0,108.5,86.65],[0,217,189,217,0,108.5,86.65],[189,217,189,217,0,108.5,86.65],[378,217,189,217,0,108.5,86.65],[567,217,189,217,0,108.5,86.65],[756,217,189,217,0,108.5,86.65],[0,434,189,217,0,108.5,86.65],[189,434,189,217,0,108.5,86.65]],
        animations: { run: [0, 11, "run", 4] }
    });

    this.run = new createjs.BitmapAnimation(this.spriteSheet_run);
    this.run.regY = 63;

    this.spriteSheet_jump = new createjs.SpriteSheet({
        images: ["images/kisuke_jump.png"],
        frames: [[0,0,120,234,0,-79.2,99.8]],
        animations: { jump: [0, "jump", 4] }
    });

    this.jump = new createjs.BitmapAnimation(this.spriteSheet_jump);
    this.jump.regX = 140;
    this.jump.regY = 68;
    this.jump.currentFrame = 0;

    this.playerContainer = new createjs.Container();
    PG.stageContainer.addChild(this.playerContainer);

    this.drawPlayer();
};

var p = Player.prototype;

p.updatePositions = function(x, y) {
    this.idle.x = x;
    this.idle.y = y;
    this.run.x = x;
    this.run.y = y;
    this.jump.x = x;
    this.jump.y = y;
};

p.drawPlayer = function() {
    this.playerContainer.addChild(this.idle);

    this.idle.gotoAndPlay('idle');
};

p.animateIdle = function() {

    if (this.playerContainer.contains(this.run) || PG.playerBody.jumpContacts > 0) {

        console.log('idle')
        this.playerContainer.removeAllChildren();
        this.playerContainer.addChild(this.idle);

        if (this.lastDirection == 'left') {
            this.idle.scaleX = -1;

        }
        if (this.lastDirection == 'right') {
            this.idle.scaleX = 1;
        }

        this.idle.play();
    }
};

p.animateLeft = function() {
    this.lastDirection = 'left';

    if (this.playerContainer.contains(this.idle)) {
        this.playerContainer.removeAllChildren();
        this.playerContainer.addChild(this.run);

        this.run.gotoAndPlay('run');
    }

    this.run.scaleX = this.jump.scaleX = -1;
};

p.animateRight = function() {
    this.lastDirection = 'right';

    if (this.playerContainer.contains(this.idle)) {
        this.playerContainer.removeAllChildren();
        this.playerContainer.addChild(this.run);

        this.run.gotoAndPlay('run');

    }

    this.run.scaleX = this.jump.scaleX = 1;
};

p.animateJump = function() {
    if (this.playerContainer.contains(this.idle) || this.playerContainer.contains(this.run)) {

        this.playerContainer.removeAllChildren();
        this.playerContainer.addChild(this.jump);

        this.jump.play('jump');
    }
};
