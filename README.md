# Cuisine API - Documentation

This API allows managing data related to chefs, recipes, and restaurants. It provides a series of endpoints to interact with these collections.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Test Data](#test-data)
- [Endpoints](#endpoints)
  - [Chefs](#chefs)
  - [Recipes](#recipes)
  - [Restaurants](#restaurants)
- [Usage Examples](#usage-examples)

## Installation

```bash
# Clone the repository
git clone [your-repository]

# Navigate to the project directory
cd [project-name]

# Install dependencies
npm install
```

## Configuration

The server uses MongoDB as a database. Make sure MongoDB is installed and running on your system.

```bash
# Start the server
npm start
```

The server starts by default on port 3000: http://localhost:3000

## Test Data

To load test data into the database, uncomment the following line in the `server.js` file:

```javascript
// require('./seed')
```

This line will automatically add sample data for chefs, recipes, and restaurants.

## Endpoints

### Chefs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/chefs/all` | Get all chefs |
| GET | `/chefs/names` | Get chef names |
| GET | `/chefs/recettes` | Get number of recipes per chef |
| POST | `/chefs/add` | Add a new chef |
| PUT | `/chefs/update/:nom` | Update a chef by name |
| DELETE | `/chefs/delete/:nom` | Delete a chef by name |

### Recipes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/recette/all` | Get all recipes |
| GET | `/recette/names` | Get recipe names |
| POST | `/recette/add` | Add a new recipe |
| PUT | `/recette/update/:nom` | Update a recipe by name |
| DELETE | `/recette/delete/:nom` | Delete a recipe by name |

### Restaurants

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/restaurant/all` | Get all restaurants |
| GET | `/restaurant/chefs/:nom` | Get a restaurant's chefs |
| GET | `/restaurant/recettes/:nom` | Get a restaurant's recipes |
| GET | `/restaurant/listCategorie/:categorie` | Get restaurants by category |
| GET | `/restaurant/list/:debut/:fin` | Get restaurants opened between two years |
| POST | `/restaurant/add` | Add a new restaurant |
| PUT | `/restaurant/update/:nom` | Update a restaurant by name |
| DELETE | `/restaurant/delete/:nom` | Delete a restaurant by name |

## Usage Examples

#### Add a new chef
```bash
curl -X POST http://localhost:3000/chefs/add \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Veyrat",
    "prenom": "Marc",
    "specialite": "Mountain cuisine",
    "experience": 32
  }'
```


#### Add a new recipe
```bash
curl -X POST http://localhost:3000/recette/add \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Ratatouille",
    "ingredients": ["Zucchini", "Eggplant", "Bell peppers", "Tomatoes", "Onions", "Olive oil"],
    "tempsPreparation": 60,
    "difficulte": "Medium",
    "chef": "CHEF_ID"
  }'
```


#### Add a new restaurant
```bash
curl -X POST http://localhost:3000/restaurant/add \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "La Tour d'\''Argent",
    "adresse": "15 Quai de la Tournelle, 75005 Paris",
    "categorie": "Gastronomique",
    "anneeOuverture": 1582,
    "chefs": ["CHEF_ID"],
    "recettes": ["RECIPE_ID"]
  }'
```
