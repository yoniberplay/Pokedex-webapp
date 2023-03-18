const express = require('express');

const router = express.Router();

const pokemonController = require('../controllers/PokemonsController');

router.get("/",pokemonController.GetPokemonsList);
router.get("/create-pokemon", pokemonController.GetCreatePokemons);
router.post("/create-pokemon", pokemonController.PostCreatePokemons);
router.get("/edit-pokemon/:pokeId", pokemonController.GetEditPokemons);
router.post("/edit-pokemon", pokemonController.PostEditPokemons);
router.post("/delete-pokemon", pokemonController.PostDeletePokemons);


module.exports = router;
