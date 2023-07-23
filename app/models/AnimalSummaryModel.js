class AnimalSummaryModel {
    constructor(healthyAnimals, sickAnimals, deadAnimals, totalAnimals, typeAnimal) {
        this.healthyAnimals = healthyAnimals;
        this.sickAnimals = sickAnimals;
        this.deadAnimals = deadAnimals;
        this.totalAnimals = totalAnimals;
        this.typeAnimal = typeAnimal;
    }
}

module.exports = AnimalSummaryModel;