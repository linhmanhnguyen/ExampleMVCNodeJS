class ReportEntryCageModel {
  constructor(
    totalAnimals,
    averageWeightOfAnimal,
    totalWeightOfAnimals,
    averageUnitPrice,
    totalPrice
  ) {
    this.totalAnimals = totalAnimals;
    this.averageWeightOfAnimal = averageWeightOfAnimal;
    this.totalWeightOfAnimals = totalWeightOfAnimals;
    this.averageUnitPrice = averageUnitPrice;
    this.totalPrice = totalPrice;
  }
}

module.exports = ReportEntryCageModel;
