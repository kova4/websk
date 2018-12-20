const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Luodaan scheema ja modeli

const GradeSchema = new Schema({
    course_code: { type: "String", required: "true"},
    grade: { type: "Number", required: "true", minimum: 0}
});


//alikansiota EI saa tehdä modelia :D t.miika

module.exports = GradeSchema;