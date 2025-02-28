const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    nom: { type: String, required: true },
    adresse: { type: String, required: true },
    categorie: { type: String, required: true },
    anneeOuverture: { type: Number, required: true },
    chefs: [{ type: Schema.Types.ObjectId, ref: 'Chef'}],
    recettes: [{ type: Schema.Types.ObjectId, ref: 'Recette'}]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
