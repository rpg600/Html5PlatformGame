var PG = {
    canvas: null,
    context: null,
    debugContext: null,
    debugCanvans: null,
    stage: null,
    stageContainer: null,
    platFormContainer: null,
    playerSkin: null,
    playerBody: null,
    platform1: null,
    players: [],
    world: null,
    ground: null,
    scale: 90,
    localActor: null,
    debug: true,

    tick: function() {
        if (PG.debug) {
            PG.world.DrawDebugData();
        }

        PG.world.Step(1 / 60,  10, 10);
        PG.world.ClearForces();

        PG.stage.update();

        for(var i=0, l = PG.players.length; i<l; i++) {
            PG.players[i].update();
        }
    },

    // Ajout du listener sur les collisions
    addContactListener: function() {
        var b2Listener = Box2D.Dynamics.b2ContactListener;
        //Add listeners for contact
        var listener = new b2Listener;

        // Entrée en contact
        listener.BeginContact = function(contact) {
            var obj1 = contact.GetFixtureA();
            var obj2 = contact.GetFixtureB();
            if (PG.isPlayer(obj1) || PG.isPlayer(obj2)) {
                if (PG.isGroundOrBox(obj1) || PG.isGroundOrBox(obj2)) {
                    PG.playerBody.jumpContacts ++; // le joueur entre en contact avec une plate-forme de saut
                    PG.localActor.stop();
                }
            }
        }

        // Fin de contact
        listener.EndContact = function(contact) {
            var obj1 = contact.GetFixtureA();
            var obj2 = contact.GetFixtureB();
            if (PG.isPlayer(obj1) || PG.isPlayer(obj2)) {
                if (PG.isGroundOrBox(obj1) || PG.isGroundOrBox(obj2)) {
                    PG.playerBody.jumpContacts --; // le joueur quitte une plate-forme de saut
                }
            }
        }
        listener.PostSolve = function(contact, impulse) {
            // PostSolve
        }
        listener.PreSolve = function(contact, oldManifold) {
            // PreSolve
        }
        PG.world.SetContactListener(listener);
    },

    isPlayer: function(object) {
        return object.GetUserData() == 'footPlayer' ? true : false
    },

    isGroundOrBox: function(object) {
        return (object.GetUserData() == 'ground' || object.GetUserData() == 'box')  ? true : false
    }
};

window.onload = function() {

    // debug button
    $('#debug').on('click', function() {
        PG.debug = PG.debug ? false : true;
        $('#debugCanvas').toggle();
    });

    PG.canvas = document.getElementById('canvas');
    PG.debugCanvas = document.getElementById('debugCanvas');
    PG.context = PG.canvas.getContext('2d');
    PG.debugContext = PG.debugCanvas.getContext('2d');

    PG.stage = new createjs.Stage(PG.canvas);
    PG.stage.snapToPixelEnabled = true;

    PG.canvas.width = PG.debugCanvas.width = 1200;
    PG.canvas.height = PG.debugCanvas.height =  600;

    PG.stageContainer = new createjs.Container();
    PG.stage.addChild(PG.stageContainer);

    PG.plateFormContainer = new createjs.Container();

    PG.stageContainer.addChild(PG.plateFormContainer);

    box2dUtils = new Box2dUtils(PG.scale);  // instancier la classe utilitaire

    PG.world = box2dUtils.createWorld(PG.debugContext); // box2DWorld

    // Créer le "sol" de notre environnement physique
    PG.ground =  new shapeActor(PG.world, PG.canvas.width / 2, PG.canvas.height - 10, PG.canvas.width, 20, true, 'ground');

    plaftorm1 = new shapeActor(PG.world, 350, 465, 200, 20, true, 'box')
    plaftorm2 = new shapeActor(PG.world, 800, 330, 400, 20, true, 'box');
    plaftorm3 = new shapeActor(PG.world, 250, 180, 400, 20, true, 'box');

    /*
    // Créer 2 ball statiques
    staticBall = box2dUtils.createBall(PG.world, 50, 400, 50, true, 'staticBall');
    staticBall2 = box2dUtils.createBall(PG.world, 500, 150, 60, true, 'staticBall2');
    */

    PG.playerSkin = new Player();

    PG.playerBody = new PlayerBody(PG.scale);

    PG.playerBody.createPlayer(PG.world, 200, PG.canvas.height - 100, 40);

    PG.localActor = new Actor(PG.playerBody, PG.playerSkin, true);

    PG.addContactListener();

    createjs.Ticker.addEventListener('tick', PG.tick);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
};

document.onkeydown = function(event) {
    keyCode = event.keyCode;
    switch(keyCode) {
        // A
        case 65:
            console.log('Attack 1')
            PG.localActor.attack1();
            break;
        // left
        case 37:
            console.log('left')
            PG.localActor.moveLeft();
            break;
        // right
        case 39:
            console.log('right')
            PG.localActor.moveRight();
            break;
        // up
        case 38:
            console.log('up')
            PG.localActor.jump();
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
            PG.localActor.stop();
            break;
        // right
        case 39:
            console.log('right')
            PG.localActor.stop();
            break;
        // up
        case 38:
            console.log('up')
            PG.localActor.stopJump();
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