const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    nom: { type: String, required: true},
    prenom: { type: String, required: true},
    mdp: { type: String, required: true},
});

const User = mongoose.model('User', userSchema);
module.exports = User;