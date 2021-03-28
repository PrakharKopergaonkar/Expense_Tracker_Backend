const mongoose = require("mongoose");
const autoincrement = require("../server");



const Schema = mongoose.Schema;
const UserSchema= new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: Schema.Types.String,
        required: true,
    }
}, {timestamps: true});

UserSchema.plugin(autoincrement.plugin, {
    model: "User",
    field: "user_id",
    
});
const User = mongoose.model('Users',UserSchema)

module.exports = User;
