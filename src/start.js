var PG = {
    canvas: null,
    context: null,
    stage: null,
    stageContainer: null,
    platFormContainer: null,
    playerSkin: null,
    playerBody: null,
    platform1: null,
    players: [],
    world: null,
    ground: null,
    scale: 100,
    localActor: null,

    tick: function() {
        PG.stage.update();
        PG.world.Step(1 / 60,  10, 10);
        //PG.world.DrawDebugData();
        PG.world.ClearForces();

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

    PG.canvas = document.getElementById('gameView');
    PG.stage = new createjs.Stage(PG.canvas);
    PG.context = PG.canvas.getContext('2d');

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

    PG.playerSkin = new Player();

    box2dUtils = new Box2dUtils(PG.scale);  // instancier la classe utilitaire

    PG.world = box2dUtils.createWorld(PG.context); // box2DWorld

    // Créer le "sol" de notre environnement physique
    PG.ground = box2dUtils.createBox(PG.world, PG.canvas.width / 2, PG.canvas.height - 10, PG.canvas.width / 2, 10, true, 'ground');

    /*
    // Créer 2 box statiques
    staticBox = box2dUtils.createBox(PG.world, 600, 450, 50, 50, true, 'staticBox');
    staticBox2 = box2dUtils.createBox(PG.world, 200, 250, 80, 30, true, 'staticBox2');

    // Créer 2 ball statiques
    staticBall = box2dUtils.createBall(PG.world, 50, 400, 50, true, 'staticBall');
    staticBall2 = box2dUtils.createBall(PG.world, 500, 150, 60, true, 'staticBall2');
    */

    PG.playerBody = new PlayerBody(PG.scale);

    PG.playerBody.createPlayer(PG.world, 100, PG.canvas.height - 40, 40);

    PG.localActor = new Actor(PG.playerBody, PG.playerSkin, true);

    PG.addContactListener();

    createjs.Ticker.addEventListener('tick', PG.tick);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
};

document.onkeydown = function(event) {
    keyCode = event.keyCode;
    switch(keyCode) {
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
            PG.localActor.stop();
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