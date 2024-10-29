const mongoose = require('mongoose')
const TestSchema = mongoose.Schema({
        questions : {type : String, required : true},
        option1 : {type: String, required : true},
        option2 : {type: String, required : true},
        option3 : {type: String, required : true},
        option4 : {type: String, required : true},
        correctAnswer : {type: String, required : true}
})

module.exports = mongoose.model('Test', TestSchema);

