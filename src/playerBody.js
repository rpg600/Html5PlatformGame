(function(){
    /**
     * Constructeur
     * @param Number scale échelle
     */
    PlayerBody = function(scale) {
        this.scale = scale;							// échelle
        this.box2dUtils = new Box2dUtils(scale);	// instancier la classe utilitaire box2d
        this.object = null;							// l'objet "physique" player
        this.jumpContacts = 0;
    }

    /**
     * Classe Player
     */
    PlayerBody.prototype = {

        /**
         * Créer l'objet "physique" player
         * @param b2World world : le monde 2dbox dans lequel ajouter le player
         * @param Number x : position x du player
         * @param Number y : position y du player
         * @param Number radius : le rayon du body player
         */
        createPlayer : function(world, x, y, radius) {
            this.object = this.box2dUtils.createPlayer(world, x, y, radius, 'player');
        },

        /**
         * Sauter
         */
        jump : function() {
            if (this.jumpContacts > 0) {
                this.object.GetBody().ApplyImpulse(new b2Vec2(0, -9), this.object.GetBody().GetWorldCenter());
            }
        },

        /**
         * Effectuer un déplacement vers la droite
         */
        moveRight : function() {
            this.setFriction(0);
            var vel = this.object.GetBody().GetLinearVelocity();
            vel.x = 500 / this.scale;
        },

        /**
         * Effectuer un déplacement vers la gauche
         */
        moveLeft : function() {
            this.setFriction(0);
            var vel = this.object.GetBody().GetLinearVelocity();
            vel.x = -500 / this.scale;
        },

        setFriction: function(friction) {

            this.object.GetBody().GetFixtureList().SetFriction(friction);
        }
    }

}());