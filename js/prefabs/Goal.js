var Platformer = Platformer || {};

Platformer.Goal = function (game_state, position, properties) {
    "use strict";
    Platformer.Prefab.call(this, game_state, position, properties);
    
    this.next_level = properties.next_level;
    
    this.game_state.game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5);

    // On récupére toutes les infos de TiledState
    this.monState = this.game.state.getCurrentState();
};

Platformer.Goal.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Goal.prototype.constructor = Platformer.Goal;

Platformer.Goal.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};

Platformer.Goal.prototype.reach_goal = function () {
    "use strict";
    // start the next level
    
    // disable physics system
    window.i++;
    this.monState.nb_event = true;
    this.game_state.mySound.destroy();
    this.game_state.game.state.start("BootState", true, false, this.next_level, "assets/script/script.json");
};

