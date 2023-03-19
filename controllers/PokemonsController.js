const Regions = require("../models/Region");
const Tipo = require("../models/Tipo");
const Pokemons = require("../models/Pokemon");


exports.GetPokemonsListHome = (req, res, next) => {
  Pokemons.findAll({ include: [{ all: true, nested: true }] })
    .then((result) => {
      const pokemons = result.map((result) => result.dataValues);
      res.render("pokemons/home", {
        pageTitle: "Pokemons",
        MantPoke: true,
        pokemons: pokemons,
        hasPokemons: pokemons.length > 0,
      });
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};


exports.GetPokemonsList = (req, res, next) => {
  Pokemons.findAll({ include: [{ all: true, nested: true }] })
    .then((result) => {
      const pokemons = result.map((result) => result.dataValues);
      res.render("pokemons/pokemons-list", {
        pageTitle: "Pokemons",
        MantPoke: true,
        pokemons: pokemons,
        hasPokemons: pokemons.length > 0,
      });
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};

exports.GetCreatePokemons = (req, res, next) => {
  let regionsViewModel;
  let TipoViewModel;
  Regions.findAll()
    .then((result) => {
      regionsViewModel = result.map((result) => result.dataValues);
      Tipo.findAll().then((result) => {
        TipoViewModel = result.map((result) => result.dataValues);
        res.render("pokemons/save-pokemons", {
          pageTitle: "Create Pokemons",
          MantPoke: true,
          editMode: false,
          Regions: regionsViewModel,
          hasRegions: regionsViewModel.length > 0,
          Tipos: TipoViewModel,
          hasTipos: TipoViewModel.length > 0,
        });
      });
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};

exports.PostCreatePokemons = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const imgUrl = req.body.imgUrl;
  const tipo = req.body.TipoId;
  const region = req.body.RegionId;

  console.log(name)

  Pokemons.create({
    name: name,
    imgUrl: imgUrl,
    description: description,
    TipoId: tipo,
    RegionId: region,
  })
    .then((result) => {
      res.redirect("/pokemon");
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};

exports.GetEditPokemons = (req, res, next) => {
  const edit = req.query.edit;
  const pokeId = req.params.pokeId;

  if (!edit) {
    return res.redirect("/pokemon");
  }

  Pokemons.findOne({ where: { id: pokeId } })
    .then((result) => {
      const poke = result.dataValues;

      if (!poke) {
        return res.redirect("/pokemon");
      }
      let regionsViewModel;
      let TipoViewModel;
      Regions.findAll().then((result) => {
        regionsViewModel = result.map((result) => result.dataValues);
        Tipo.findAll().then((result) => {
          TipoViewModel = result.map((result) => result.dataValues);
          res.render("pokemons/save-pokemons", {
            pageTitle: "Edit Pokemons",
            MantPoke: true,
            editMode: edit,
            poke: poke,
            Regions: regionsViewModel,
            hasRegions: regionsViewModel.length > 0,
            Tipos: TipoViewModel,
            hasTipos: TipoViewModel.length > 0,
          });
        });        
      });
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};

exports.PostEditPokemons = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const imgUrl = req.body.imgUrl;
  const tipo = req.body.TipoId;
  const region = req.body.RegionId;
  const pokeId = req.body.pokeId;

  Pokemons.update(
    {
      name: name,
      description: description,
      imgUrl: imgUrl,
      TipoId: tipo,
      RegionId: region,
    },
    { where: { id: pokeId } }
  )
    .then((result) => {
      return res.redirect("/pokemon");
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};

exports.PostConfirmDeletePokemons = (req, res, next) => {
  const pokeId = req.body.pokeId;
  console.log(pokeId)
  

  Pokemons.findOne({ where: { id: pokeId } })
    .then((result) => {
      const poke = result.dataValues;

      if (!poke) {
        return res.redirect("/pokemon");
      }
      res.render("pokemons/confirm-delete-pokemons", {
        pageTitle: "Confirmacion",
        MantPoke: true,
        poke: poke,
      });
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};

exports.PostDeletePokemons = (req, res, next) => {
  const pokeId = req.body.pokemonId;

  Pokemons.destroy({ where: { id: pokeId } })
    .then((result) => {
      return res.redirect("/pokemon");
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};
