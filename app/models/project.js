var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Project', new Schema({ 
	code: {type: String,unique: true},
    scripts:[{
        name:String,
        design:{type : Boolean, default:false},
        executionChrome:{type : Boolean, default:false},
        executionFF:{type : Boolean, default:false},
        executionIE:{type : Boolean, default:false},
        numberOfTestCasesCovered: Number,
        comment: String,
        createdBy: { type : Schema.Types.ObjectId, ref : 'users' },
        createdDate: {type:Date,default:Date.now},
        deleteRequest:{type : Boolean, default:false},
        deleteComment:String,
        complexity:{type : String, enum:['easy','medium','complex']}
    }],
    associatedTestCases: [String]

}));