
require('dotenv').config();
const Chef = require('./Models/ChefModel');
const Recette = require('./Models/RecceteModel');
const Restaurant = require('./Models/RestaurantModel');

const clearCollections = async () => {
  await Chef.deleteMany({});
  await Recette.deleteMany({});
  await Restaurant.deleteMany({});
  console.log('Collections vidées avec succès');
};

const seedDatabase = async () => {
  try {
    await clearCollections();
    
    const chefs = [
      {
        nom: 'Ducasse',
        prenom: 'Alain',
        specialite: 'Cuisine française',
      },
      {
        nom: 'Robuchon',
        prenom: 'Joël',
        specialite: 'Cuisine gastronomique',
      },
      {
        nom: 'Bocuse',
        prenom: 'Paul',
        specialite: 'Cuisine lyonnaise',
      },
      {
        nom: 'Etchebest',
        prenom: 'Philippe',
        specialite: 'Cuisine du sud-ouest',
      },
      {
        nom: 'Lignac',
        prenom: 'Cyril',
        specialite: 'Pâtisserie',
      },
      {
        nom: 'Conticini',
        prenom: 'Philippe',
        specialite: 'Pâtisserie créative',
      },
      {
        nom: 'Pic',
        prenom: 'Anne-Sophie',
        specialite: 'Cuisine créative',
      },
      {
        nom: 'Troisgros',
        prenom: 'Michel',
        specialite: 'Cuisine contemporaine',
      },
      {
        nom: 'Darroze',
        prenom: 'Hélène',
        specialite: 'Cuisine du sud-ouest',
      },
      {
        nom: 'Gagnaire',
        prenom: 'Pierre',
        specialite: 'Cuisine d\'avant-garde',
      }
    ];
    
    const insertedChefs = await Chef.insertMany(chefs);
    console.log('Chefs ajoutés avec succès');
    
    const recettes = [
      {
        nom: 'Bœuf Bourguignon',
        ingredients: ['Bœuf', 'Carottes', 'Oignons', 'Vin rouge', 'Champignons', 'Lardons'],
        tempsPreparation: 180,
        chef: insertedChefs[0]._id
      },
      {
        nom: 'Purée de pommes de terre',
        ingredients: ['Pommes de terre', 'Beurre', 'Lait', 'Sel', 'Poivre'],
        tempsPreparation: 30,
        chef: insertedChefs[1]._id
      },
      {
        nom: 'Soupe VGE',
        ingredients: ['Bouillon de volaille', 'Truffe', 'Légumes', 'Foie gras', 'Pâte feuilletée'],
        tempsPreparation: 90,
        chef: insertedChefs[2]._id
      },
      {
        nom: 'Entrecôte à la bordelaise',
        ingredients: ['Entrecôte', 'Échalotes', 'Vin rouge', 'Beurre', 'Moelle'],
        tempsPreparation: 45,
        chef: insertedChefs[3]._id
      },
      {
        nom: 'Tarte au citron meringuée',
        ingredients: ['Pâte sablée', 'Citron', 'Œufs', 'Sucre', 'Beurre'],
        tempsPreparation: 60,
        chef: insertedChefs[4]._id
      },
      {
        nom: 'Paris-Brest',
        ingredients: ['Pâte à choux', 'Praliné', 'Crème au beurre', 'Amandes', 'Sucre glace'],
        tempsPreparation: 120,
        chef: insertedChefs[5]._id
      },
      {
        nom: 'Homard à la française',
        ingredients: ['Homard', 'Beurre blanc', 'Légumes', 'Vin blanc', 'Échalotes'],
        tempsPreparation: 75,
        chef: insertedChefs[6]._id
      },
      {
        nom: 'Saumon à l\'oseille',
        ingredients: ['Saumon', 'Oseille', 'Crème fraîche', 'Beurre', 'Échalotes'],
        tempsPreparation: 40,
        chef: insertedChefs[7]._id
      },
      {
        nom: 'Poulet Basquaise',
        ingredients: ['Poulet', 'Poivrons', 'Tomates', 'Oignons', 'Piment d\'Espelette'],
        tempsPreparation: 90,
        chef: insertedChefs[8]._id
      },
      {
        nom: 'Assiette de légumes en textures',
        ingredients: ['Légumes de saison', 'Herbes', 'Huile d\'olive', 'Vinaigre', 'Condiments'],
        tempsPreparation: 120,
        chef: insertedChefs[9]._id
      }
    ];
    
    const insertedRecettes = await Recette.insertMany(recettes);
    console.log('Recettes ajoutées avec succès');
    
    const restaurants = [
      {
        nom: 'Le Louis XV',
        adresse: 'Place du Casino, 98000 Monaco',
        anneeOuverture: 1987,
        chefs: [insertedChefs[0]._id],
        recettes: [insertedRecettes[0]._id]
      },
      {
        nom: 'L\'Atelier de Joël Robuchon',
        adresse: '5 Rue de Montalembert, 75007 Paris',
        anneeOuverture: 2003,
        chefs: [insertedChefs[1]._id],
        recettes: [insertedRecettes[1]._id]
      },
      {
        nom: 'L\'Auberge du Pont de Collonges',
        adresse: '40 Quai de la Plage, 69660 Collonges-au-Mont-d\'Or',
        anneeOuverture: 1965,
        chefs: [insertedChefs[2]._id],
        recettes: [insertedRecettes[2]._id]
      },
      {
        nom: 'Le Quatrième Mur',
        adresse: '2 Place de la Comédie, 33000 Bordeaux',
        anneeOuverture: 2015,
        chefs: [insertedChefs[3]._id],
        recettes: [insertedRecettes[3]._id]
      },
      {
        nom: 'Le Chardenoux',
        adresse: '1 Rue Jules Vallès, 75011 Paris',
        anneeOuverture: 2019,
        chefs: [insertedChefs[4]._id],
        recettes: [insertedRecettes[4]._id]
      },
      {
        nom: 'La Pâtisserie',
        adresse: '3 Rue du Bac, 75007 Paris',
        anneeOuverture: 2008,
        chefs: [insertedChefs[5]._id],
        recettes: [insertedRecettes[5]._id]
      },
      {
        nom: 'Maison Pic',
        adresse: '285 Avenue Victor Hugo, 26000 Valence',
        anneeOuverture: 1889,
        chefs: [insertedChefs[6]._id],
        recettes: [insertedRecettes[6]._id]
      },
      {
        nom: 'Maison Troisgros',
        adresse: '728 Route de Villerest, 42155 Ouches',
        anneeOuverture: 1968,
        chefs: [insertedChefs[7]._id],
        recettes: [insertedRecettes[7]._id]
      },
      {
        nom: 'Marsan',
        adresse: '4 Rue d\'Assas, 75006 Paris',
        anneeOuverture: 2019,
        chefs: [insertedChefs[8]._id],
        recettes: [insertedRecettes[8]._id]
      },
      {
        nom: 'Pierre Gagnaire',
        adresse: '6 Rue Balzac, 75008 Paris',
        anneeOuverture: 1996,
        chefs: [insertedChefs[9]._id],
        recettes: [insertedRecettes[9]._id]
      }
    ];
    
    await Restaurant.insertMany(restaurants);
    console.log('Restaurants ajoutés avec succès');
    
    console.log('Seeding terminé avec succès');
  } catch (error) {
    console.error('Erreur lors du seeding:', error);
  }
};

seedDatabase();