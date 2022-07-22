import { prototypes, utils, constants } from '/game';

export function loop() {
    const creep = utils.getObjectsByPrototype(prototypes.Creep).find(i => i.my);
    if(!creep.store[constants.RESOURCE_ENERGY]) {
        const container = utils.findClosestByPath(creep, utils.getObjectsByPrototype(prototypes.StructureContainer));
        if(creep.withdraw(container, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
    } else {
        const constructionSite = utils.getObjectsByPrototype(prototypes.ConstructionSite).find(i => i.my);
        if(!constructionSite) {
            utils.createConstructionSite(50,55, prototypes.StructureTower);
        } else {
            if(creep.build(constructionSite) == constants.ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite);
            }
        }
    }
}