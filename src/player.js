var Player = function() {

    this.lastDirection = null;
    this.spriteSheet_idle = new createjs.SpriteSheet({images: ["images/kisuke_idle_weapon.png"], frames: [[0,0,114,234,0,-85.3,102.55],[114,0,114,234,0,-85.3,102.55],[228,0,114,234,0,-85.3,102.55],[342,0,114,234,0,-85.3,102.55],[0,234,114,234,0,-85.3,102.55],[114,234,114,234,0,-85.3,102.55],[228,234,114,234,0,-85.3,102.55],[342,234,114,234,0,-85.3,102.55],[0,468,114,234,0,-85.3,102.55]]});
    this.idle = new createjs.BitmapAnimation(this.spriteSheet_idle);
    this.idle.x = 400;
    this.idle.y = 300;
    this.idle.regX = 140;
    this.idle.currentFrame = 0;

    this.spriteSheet_run = new createjs.SpriteSheet({images: ["images/kisuke_run_weapon.png"], frames: [[0,0,189,217,0,108.5,86.65],[189,0,189,217,0,108.5,86.65],[378,0,189,217,0,108.5,86.65],[567,0,189,217,0,108.5,86.65],[756,0,189,217,0,108.5,86.65],[0,217,189,217,0,108.5,86.65],[189,217,189,217,0,108.5,86.65],[378,217,189,217,0,108.5,86.65],[567,217,189,217,0,108.5,86.65],[756,217,189,217,0,108.5,86.65],[0,434,189,217,0,108.5,86.65],[189,434,189,217,0,108.5,86.65]],
        animations: { run: [0, 11, "run", null] }
    });

    this.run = new createjs.BitmapAnimation(this.spriteSheet_run);
    this.run.x = 400;
    this.run.y = 300;

    this.spriteSheet_jump = new createjs.SpriteSheet({images: ["images/kisuke_jump.png"], frames: [[0,0,120,234,0,-79.2,99.8]],
        animations: { jump: [0, "jump", null] }
    });

    this.jump = new createjs.BitmapAnimation(this.spriteSheet_jump);
    this.jump.x = 400;
    this.jump.y = 300;
    this.jump.regX = 140;
    this.jump.currentFrame = 0;

    this.playerContainer = new createjs.Container();
    PG.stageContainer.addChild(this.playerContainer);

    this.drawPlayer();
};

var p = Player.prototype;

p.drawPlayer = function() {
    this.playerContainer.addChild(this.idle);

    this.idle.play();
};

p.movePlayer = function(direction, isKeyDown) {

    this.lastDirection = direction;

    if (isKeyDown) {

        if (direction == 'up') {
            if (this.playerContainer.contains(this.idle) || this.playerContainer.contains(this.run)) {
                console.log('goto up')
                this.playerContainer.removeAllChildren();
                this.playerContainer.addChild(this.jump);
                this.jump.play('jump');
            }
        }

        if (direction == 'left' || direction == 'right') {
            if (this.playerContainer.contains(this.idle) || this.playerContainer.contains(this.jump)) {
                this.playerContainer.removeAllChildren();
                this.playerContainer.addChild(this.run);

                if (direction == 'left') {
                    console.log('goto left')
                    this.run.gotoAndPlay('run');
                }
                if (direction == 'right') {
                    console.log('goto right')
                    this.run.gotoAndPlay('run');
                }
            }
        }

        if (direction == 'left') {
            this.run.scaleX = -1;
            createjs.Tween.get(this.run, {override:true}).to({ x: this.run.x - 250, y: this.run.y }, 500);
        }

        if (direction == 'right') {
            console.log('tween right')
            this.run.scaleX = 1;
            createjs.Tween.get(this.run, {override:true}).to({ x: this.run.x + 250, y: this.run.y }, 500);
        }
    }

    if (!isKeyDown) {
        if (this.playerContainer.contains(this.run)) {

            if (createjs.Tween.hasActiveTweens(this.run)) {
                createjs.Tween.removeTweens(this.run);
            }
            this.playerContainer.removeChild(this.run);
            this.playerContainer.addChild(this.idle)

            if (direction == 'left') {
                this.idle.scaleX = -1;

            }
            if (direction == 'right') {
                this.idle.scaleX = 1;
            }

            this.idle.play();
        }
    }

    this.idle.x = this.run.x;
    this.idle.y = this.run.y;
    this.jump.x = this.run.x;
    this.jump.y = this.run.y;
};


