var Player = function() {

    this.lastDirection = null;
    this.spriteSheet_idle = new createjs.SpriteSheet({images: ["images/kisuke_idle_right.png"], frames: [[0,0,87,233,0,-94.95,102.55],[87,0,87,233,0,-94.95,102.55],[174,0,87,233,0,-94.95,102.55],[261,0,87,233,0,-94.95,102.55],[348,0,87,233,0,-94.95,102.55],[0,233,87,233,0,-94.95,102.55],[87,233,87,233,0,-94.95,102.55],[174,233,87,233,0,-94.95,102.55],[261,233,87,233,0,-94.95,102.55]]});
    this.idle = new createjs.BitmapAnimation(this.spriteSheet_idle);
    this.idle.x = 400;
    this.idle.y = 300;
    this.idle.regX = 140;
    this.idle.currentFrame = 0;

    this.spriteSheet_run = new createjs.SpriteSheet({images: ["images/kisuke_run_right.png"], frames: [[0,0,170,217,0,89.8,86.65],[170,0,170,217,0,89.8,86.65],[340,0,170,217,0,89.8,86.65],[0,217,170,217,0,89.8,86.65],[170,217,170,217,0,89.8,86.65],[340,217,170,217,0,89.8,86.65],[0,434,170,217,0,89.8,86.65],[170,434,170,217,0,89.8,86.65],[340,434,170,217,0,89.8,86.65],[0,651,170,217,0,89.8,86.65],[170,651,170,217,0,89.8,86.65],[340,651,170,217,0,89.8,86.65]],
        animations: { run: [0, 11, "run", null] }
    });

    this.run = new createjs.BitmapAnimation(this.spriteSheet_run);
    this.run.x = 400;
    this.run.y = 300;

    this.playerContainer = new createjs.Container();
    FA.stageContainer.addChild(this.playerContainer);

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
        if (this.playerContainer.contains(this.idle)) {
            this.playerContainer.removeChild(this.idle);
            this.playerContainer.addChild(this.run);

            if (direction == 'left') {
                console.log('goto left')
                this.run.gotoAndPlay('run_h');
            }
            if (direction == 'right') {
                console.log('goto right')
                this.run.gotoAndPlay('run');
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
};


