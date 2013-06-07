var FA = {
    canvas: null,
    stage: null,
    stageContainer: null,
    platFormContainer: null,
    player: null,
    platform1: null,
    players: [],

    tick: function() {
        FA.stage.update();
    }
};

window.onload = function() {

    FA.canvas = document.getElementById('gameView');
    FA.stage = new createjs.Stage(FA.canvas);

    FA.stage.snapToPixelEnabled = true;

    FA.canvas.width = 1200;
    FA.canvas.height = 600;

    FA.stageContainer = new createjs.Container();
    FA.stage.addChild(FA.stageContainer);

    FA.plateFormContainer = new createjs.Container();
    FA.platform1 = new createjs.Bitmap("images/plateforme_small.png");
    FA.platform1.y = 270;
    FA.plateFormContainer.addChild(FA.platform1);
    FA.stageContainer.addChild(FA.plateFormContainer);

    FA.player = new Player();
    FA.players.push(FA.player);

    createjs.Ticker.addEventListener('tick', FA.tick);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(24);
};


document.onkeydown = function(event) {
    keyCode = event.keyCode;
    switch(keyCode) {
        // left
        case 37:
            console.log('left')
            FA.player.movePlayer('left', true)
            break;
        // right
        case 39:
            console.log('right')
            FA.player.movePlayer('right', true)
            break;
        // up
        case 38:
            console.log('up')
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
            FA.player.movePlayer('left', false)
            break;
        // right
        case 39:
            console.log('right')
            FA.player.movePlayer('right', false)
            break;
        // up
        case 38:
            console.log('up')
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