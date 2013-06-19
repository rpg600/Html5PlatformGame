var PG = {
    canvas: null,
    stage: null,
    stageContainer: null,
    platFormContainer: null,
    player: null,
    platform1: null,
    players: [],

    tick: function() {
        PG.stage.update();
    }
};

window.onload = function() {

    PG.canvas = document.getElementById('gameView');
    PG.stage = new createjs.Stage(PG.canvas);

    PG.stage.snapToPixelEnabled = true;

    PG.canvas.width = 1200;
    PG.canvas.height = 600;

    PG.stageContainer = new createjs.Container();
    PG.stage.addChild(PG.stageContainer);

    PG.plateFormContainer = new createjs.Container();
    PG.platform1 = new createjs.Bitmap("images/plateforme_small.png");
    PG.platform1.y = 270;
    PG.plateFormContainer.addChild(PG.platform1);
    PG.stageContainer.addChild(PG.plateFormContainer);

    PG.player = new Player();
    PG.players.push(PG.player);

    createjs.Ticker.addEventListener('tick', PG.tick);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(24);


};

document.onkeydown = function(event) {
    keyCode = event.keyCode;
    switch(keyCode) {
        // left
        case 37:
            console.log('left')
            PG.player.movePlayer('left', true)
            break;
        // right
        case 39:
            console.log('right')
            PG.player.movePlayer('right', true)
            break;
        // up
        case 38:
            console.log('up')
            PG.player.movePlayer('up', true)
            break;
        // down
        case 40:
            console.log('down')
            break;
        case 27:
            break;
        // spacebar
        case 32:
            console.log('space')
            break;
        default:
            break;
    }
};

document.onkeyup= function(event) {
    keyCode = event.keyCode;
    switch(keyCode) {
        // left
        case 37:
            console.log('left')
            PG.player.movePlayer('left', false)
            break;
        // right
        case 39:
            console.log('right')
            PG.player.movePlayer('right', false)
            break;
        // up
        case 38:
            console.log('up')
            PG.player.movePlayer('up', false)
            break;
        // down
        case 40:
            console.log('down')
            break;
        case 27:
            break;
        // spacebar
        case 32:
            console.log('space')
            break;
        default:
            break;
    }
};