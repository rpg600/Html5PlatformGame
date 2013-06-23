var Player = function() {
    this.lastDirection = 'right';

    this.spriteSheet_idle = new createjs.SpriteSheet({
        images: ["images/kisuke_idle_weapon.png"],
        frames: [[0,0,50,103,0,0,0],[50,0,50,103,0,0],[100,0,50,103,0,0],[150,0,50,103,0,0,0],[200,0,50,103,0,0,0],[0,103,50,103,0,0,0],[50,103,50,103,0,0,0],[100,103,50,103,0,0,0],[150,103,50,103,0,0,0]],
        animations: { idle: [0, 8, "idle", 3] }
    });

    this.idle = new createjs.BitmapAnimation(this.spriteSheet_idle);
    this.idle.regX = 25;
    this.idle.regY = 52;
    this.idle.currentFrame = 0;

    this.spriteSheet_run = new createjs.SpriteSheet({
        images: ["images/kisuke_run_weapon.png"],
        frames: [[0,0,83,96,0,0,0],[83,0,83,96,0,0,0],[166,0,83,96,0,0,0],[0,96,83,96,0,0,0],[83,96,83,96,0,0,0],[166,96,83,96,0,0,0],[0,192,83,96,0,0,0],[83,192,83,96,0,0,0],[166,192,83,96,0,0,0],[0,288,83,96,0,0,0],[83,288,83,96,0,0,0],[166,288,83,96,0,0,0]],
        animations: { run: [0, 11, "run", 3] }
    });

    this.run = new createjs.BitmapAnimation(this.spriteSheet_run);
    this.run.regX = 42;
    this.run.regY = 48;

    this.spriteSheet_jump = new createjs.SpriteSheet({
        images: ["images/kisuke_jump.png"],
        frames: [[0,0,53,103,0,0,0]],
        animations: { jump: [0, "jump", 2] }
    });

    this.jump = new createjs.BitmapAnimation(this.spriteSheet_jump);
    this.jump.regX = 26;
    this.jump.regY = 50;
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
