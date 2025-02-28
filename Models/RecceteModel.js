const mongoose = require('mongoose');
const { Schema } = mongoose;

const recetteSchema = new Schema({
    nom: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    tempsPreparation: { type: Number, required: true },
    chef: { type: Schema.Types.ObjectId, ref: 'Chef'}
});

const Recette = mongoose.model('Recette', recetteSchema);
module.exports = Recette;
