// Fichier Models/UserModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

// Fichier middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Vérifier si le token est présent dans les headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Si pas de token, retourner une erreur
    if (!token) {
      return res.status(401).json({
        message: 'Vous n\'êtes pas autorisé à accéder à cette ressource'
      });
    }
    
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Trouver l'utilisateur correspondant au token
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        message: 'L\'utilisateur associé à ce token n\'existe plus'
      });
    }
    
    // Ajouter l'utilisateur à la requête
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token invalide ou expiré'
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`
      });
    }
    next();
  };
};

// Fichier Routes/Auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

// Fonction pour générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }
    
    // Créer un nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password
    });
    
    // Générer un token
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }
    
    // Vérifier si le mot de passe est correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }
    
    // Générer un token
    const token = generateToken(user._id);
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Route pour obtenir le profil utilisateur
router.get('/me', async (req, res) => {
  try {
    // Récupérer le token depuis les headers
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        message: 'Vous n\'êtes pas autorisé à accéder à cette ressource'
      });
    }
    
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Trouver l'utilisateur
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(401).json({
      message: 'Token invalide ou expiré'
    });
  }
});

module.exports = router;

// Modifications à apporter au fichier server.js
// Ajoutez ces lignes au fichier server.js après les autres imports
// ------------------------------------------------------------------

// Importation des routes d'authentification
const authRoutes = require('./Routes/Auth');

// Configuration des variables d'environnement supplémentaires
// Ces variables doivent être ajoutées au fichier .env
// JWT_SECRET=votre_secret_jwt_super_securise
// JWT_EXPIRE=30d

// Configuration des routes d'authentification
app.use('/api/auth', authRoutes);

// ------------------------------------------------------------------
// Exemple d'utilisation du middleware d'authentification pour protéger une route
// Ajoutez ces lignes dans les fichiers de routes où vous souhaitez protéger l'accès
// ------------------------------------------------------------------

// Dans les fichiers Routes/Chef.js, Routes/Recette.js, Routes/Restaurant.js
const { protect, authorize } = require('../middleware/auth');

// Exemple de route protégée accessible uniquement aux utilisateurs authentifiés
router.post('/add', protect, async (req, res) => {
  // Le code existant reste ici
});

// Exemple de route protégée accessible uniquement aux administrateurs
router.delete('/delete/:name', protect, authorize('admin'), async (req, res) => {
  // Le code existant reste ici
});




PORT=3000
URL_MONGOOSE=mongodb://localhost:27017/restaurant_db
DBNAME=restaurant_db
JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRE=30d




# Enregistrer un nouvel utilisateur
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Se connecter avec un utilisateur existant
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Obtenir le profil utilisateur (remplacez YOUR_TOKEN par le token obtenu lors de la connexion)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"

# Exemple d'utilisation du token pour accéder à une route protégée
curl -X POST http://localhost:3000/chefs/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "nom": "Blanc",
    "prenom": "Raymond",
    "specialite": "Cuisine britannique",
    "experience": 30
  }'