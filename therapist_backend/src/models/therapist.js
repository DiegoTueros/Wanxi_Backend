const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')
const therapistSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

therapistSchema.methods.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

therapistSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
}
module.exports = model('Therapist', therapistSchema)