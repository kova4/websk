const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Grade = require('./Grade');

//Luodaan scheema ja modeli

const StudentSchema = new Schema({
    student_code: {type: String, required: true,},
    name: {type: String, required: true,},
    email: {type: String, required: true,},
    study_points: {type: Number, required: true, minimum: 0},

    grades: {type: [Grade], required: true },
});

//täällä tehdään modeli :D
const Student = mongoose.model('student', StudentSchema);

module.exports = Student;
