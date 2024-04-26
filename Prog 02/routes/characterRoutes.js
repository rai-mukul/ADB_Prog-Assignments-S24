const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Create a new character
router.post('/', characterController.createCharacter);

// Update a character by name
router.patch('/:name', characterController.updateCharacter);

// Delete a character by name
router.delete('/:name', characterController.deleteCharacter);

// Get all characters
router.get('/', characterController.getAllCharacters);

// Get a character by name
router.get('/:name', characterController.getCharacterByName);

module.exports = router;
