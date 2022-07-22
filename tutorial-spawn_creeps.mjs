import { prototypes, utils, constants } from '/game';

/** @type{Array<prototypes.Creep>} */
var myCreeps = [];

export function loop() {
    /** @type{prototypes.StructureSpawn} */
    var mySpawn = utils.getObjectsByPrototype(prototypes.StructureSpawn)[0];
    /** @type{Array<prototypes.Flag>} */
    var flags = utils.getObjectsByPrototype(prototypes.Flag);

    console.log(myCreeps);

    if(myCreeps.length < 2) {
        var creep = mySpawn.spawnCreep([constants.MOVE]).object;
        creep.memory = {};
        myCreeps.push(creep)
    }

    var availableFlags = flags.filter(function(flag) {
        return myCreeps.filter(function(creep) {
            return creep.memory.flag && creep.memory.flag.id == flag.id;
        }).length == 0;
    });

    console.log(availableFlags);

    myCreeps.forEach(function(creep) {
        if(creep.memory.flag == undefined) {
            if(availableFlags.length > 0) {
                creep.memory.flag = availableFlags[0];
                availableFlags.splice(0, 1);
            }
        }
        creep.moveTo(creep.memory.flag);
    });
}