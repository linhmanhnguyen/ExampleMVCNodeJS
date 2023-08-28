const Joi = require('joi');
const JoiDate = require('@joi/date');

const ExtendedJoi = Joi.extend(JoiDate); // Mở rộng Joi với joi-date

const insertCageSchema = Joi.object({
    livestockStaff_id: Joi.number().integer().required(),
    veterinaryStaff_id: Joi.number().integer().required(),
    dateEntryCage: ExtendedJoi.date().format('DD-MM-YYYY').raw().when(
        Joi.ref('dateEntryCage'), { // Kiểm tra nếu dateEntryCage không rỗng
        is: ExtendedJoi.exist(),
        then: ExtendedJoi.required() // Bắt buộc có định dạng hợp lệ
    }),
    numberOfAnimalsInCage: Joi.number().integer().when(
        Joi.ref('numberOfAnimalsInCage'), { // Kiểm tra nếu numberOfAnimalsInCage không rỗng
        is: ExtendedJoi.exist(),
        then: ExtendedJoi.required() // Bắt buộc phải có
    }
    ),
    totalWeight: Joi.number().when(
        Joi.ref('totalWeight'), { // Kiểm tra nếu totalWeight không rỗng
        is: ExtendedJoi.exist(),
        then: ExtendedJoi.required() // Bắt buộc phải có
    }
    )
});

module.exports = {
    insertCageSchema
}