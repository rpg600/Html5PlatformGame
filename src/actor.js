var Actor = function(body, skin, local) {

    this.body = body;
    this.skin = skin;
    this.local = local;

    this.update = function() {
        this.skin.updatePositions(this.body.object.GetBody().GetWorldCenter().x * PG.scale,  this.body.object.GetBody().GetWorldCenter().y * PG.scale);
    };

    this.moveLeft = function() {

        this.body.moveLeft();
        this.skin.animateLeft();
    };

    this.moveRight = function() {

        this.body.moveRight();
        this.skin.animateRight();
    };

    this.jump = function() {

        this.body.jump();
        this.skin.animateJump();
    };

    this.stop = function() {

        this.body.setFriction(100);
        this.skin.animateIdle();
    };

    this.stopJump = function() {

        this.body.setFriction(0);
        this.skin.animateIdle();
    };

    PG.players.push(this);
};