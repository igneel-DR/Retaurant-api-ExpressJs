const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../Models/UserModel')

router.get('/', (req, res)=> {
    res.json('Hello world')
})

router.post('/register', async (req, res) => {
  const {email, nom, prenom, mdp } = req.body;

  if (!email || !nom || !prenom || !mdp) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }
    
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({message: 'Un utilisateur avec cet email existe déjà'});
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mdp, salt);
    
    const user = await User.insertOne({
      email: email,
      nom: nom,
      prenom: prenom, 
      mdp: hashedPassword
    });
      
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post('/login', async (req, res) => {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({message: 'Email ou mot de passe incorrect'});
    }

    const passwordCheck = await bcrypt.compare(mdp, user.mdp);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
