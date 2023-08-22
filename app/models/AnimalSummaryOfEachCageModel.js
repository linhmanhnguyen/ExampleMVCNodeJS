class AnimalSummaryOfEachCageModel {
    constructor(cage_id, manager_fullname, totalAnimals, healthyAnimals, sickAnimals, deadAnimals) {
        this.cage_id = cage_id;
        this.manager_fullname = manager_fullname;
        this.totalAnimals = totalAnimals;
        this.healthyAnimals = healthyAnimals;
        this.sickAnimals = sickAnimals;
        this.deadAnimals = deadAnimals;
    }
}

module.exports = AnimalSummaryOfEachCageModel;