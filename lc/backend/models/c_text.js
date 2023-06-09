const mongoose = require('mongoose');

const { Schema } = mongoose;

const textSchema = new Schema({
    text : {
        type:String,
        required:true
    },
    // time_created : {
    //     type:Date,
    //     default:Date.now,
    //     required:true
    // },
    n_questions : {
        type:Number,
        required:true
    },
    language : {
        type:String,
        required:true
    },
    url : {
        type:String,
        required:true
    },
    questions : {
        type:Array,
        required:true
    },
    answers : {
        type:Array,
        required:true
    },
    vocab : {
        type:Array,
        required:true
    },
    topics : {
        type:Array,
        required:true
    },
    entities : {
        type:Array,
        required:true
    }
}, {timestamps:true});

const Text = mongoose.model('Text', textSchema);

module.exports = {
    Text,
    textSchema
}
