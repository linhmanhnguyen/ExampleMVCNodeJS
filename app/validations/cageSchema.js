const Joi = require('joi');
const JoiDate = require('@joi/date');

const ExtendedJoi = Joi.extend(JoiDate); // Mở rộng Joi với joi-date

const insertCageSchema = ExtendedJoi.object({
    livestockStaff_id: ExtendedJoi.number().integer().required(),
    veterinaryStaff_id: ExtendedJoi.number().integer().required(),
    dateEntryCage: ExtendedJoi.when(
        'dateEntryCage', { // Kiểm tra nếu dateEntryCage không rỗng
        is: ExtendedJoi.exist(),
        then: ExtendedJoi.date().format('DD-MM-YYYY').raw() // Bắt buộc có định dạng hợp lệ
    }),
    numberOfAnimalsInCage: ExtendedJoi.when(
        'numberOfAnimalsInCage', { // Kiểm tra nếu numberOfAnimalsInCage không rỗng
        is: ExtendedJoi.exist(),
        then: ExtendedJoi.number().integer() // Bắt buộc phải có
    }),
    totalWeight: ExtendedJoi.when(
        'totalWeight', { // Kiểm tra nếu totalWeight không rỗng
        is: ExtendedJoi.exist(),
        then: ExtendedJoi.number().integer() // Bắt buộc phải có
    })
});

module.exports = {
    insertCageSchema
}