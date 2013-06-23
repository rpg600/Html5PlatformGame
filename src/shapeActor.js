var shapeActor = function(world, x, y, width, height, fixed, userData) {

    this.body = box2dUtils.createBox(world, x, y, width, height, fixed, userData);

    this.skin = new createjs.Shape();

    this.skin.graphics.beginFill("#000").drawRect(x - width, y - height, width*2, height*2);

    PG.plateFormContainer.addChild(this.skin);
};