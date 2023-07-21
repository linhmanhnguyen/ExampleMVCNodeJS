class FarmModel {
    constructor(id, farmName, creationDate, status, animalType_id, animalDensity, ward_id, addressDetail, lastModified) {
        this.id = id;
        this.name = farmName;
        this.creationDate = creationDate;
        this.status = status;
        this.animalType_id = animalType_id;
        this.animalDensity = animalDensity;
        this.ward_id = ward_id;
        this.addressDetail = addressDetail;
        this.lastModified = lastModified;
    }
}

module.exports = FarmModel;