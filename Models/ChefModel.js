const mongoose = require('mongoose');
const { Schema } = mongoose;

const chefSchema = new Schema({
    nom: { type: String, required: true },
    prenom: {type: String, required: true },
    specialite: { type: String, required: true },
});

const Chef = mongoose.model('Chef', chefSchema);
module.exports = Chef;
