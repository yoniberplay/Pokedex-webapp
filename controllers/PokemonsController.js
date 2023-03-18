const Regions = require("../models/Region");
const Tipo = require("../models/Tipo");
const Pokemons = require("../models/Pokemon");

exports.GetPokemonsList = (req, res, next) => {
  Pokemons.findAll({ include: [{ model: Regions }] })
    .then((result) => {
      const pokemons = result.map((result) => result.dataValues);
      res.render("pokemons/pokemons-list", {
        pageTitle: "Pokemons",
        homeActive: true,
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
      });
      res.render("pokemons/save-pokemons", {
        pageTitle: "Create Pokemons",
        homeActive: true,
        editMode: false,
        Regions: regionsViewModel,
        hasRegions: regionsViewModel.length > 0,
        Tipos: TipoViewModel,
        hasTipos: TipoViewModel.length > 0,
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
  const tipo = req.body.tipo;
  const region = req.body.region;

  Pokemons.create({
    name: name,
    description: description,
    tipoId: tipo,
    regionId: region,
    imgUrl: imgUrl,
  })
    .then((result) => {
      res.redirect("/");
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
    return res.redirect("/");
  }

  Pokemons.findOne({ where: { id: pokeId } })
    .then((result) => {
      const poke = result.dataValues;

      if (!poke) {
        return res.redirect("/");
      }

      // console.log(poke);

      let regionsViewModel;
      let TipoViewModel;
      Regions.findAll().then((result) => {
        regionsViewModel = result.map((result) => result.dataValues);
        Tipo.findAll().then((result) => {
          TipoViewModel = result.map((result) => result.dataValues);
        });
        res.render("pokemons/save-pokemons", {
          pageTitle: "Edit Pokemons",
          homeActive: true,
          editMode: edit,
          poke: poke,
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

exports.PostEditPokemons = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const imgUrl = req.body.imgUrl;
  const tipo = req.body.tipo;
  const region = req.body.region;
  const pokeId = req.body.pokeId;

  Pokemons.update(
    {
      name: name,
      description: description,
      imgUrl: imgUrl,
      tipoId: tipo,
      regionId: region,
    },
    { where: { id: pokeId } }
  )
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};

exports.PostDeletePokemons = (req, res, next) => {
  const pokeId = req.body.pokeId;

  Pokemons.destroy({ where: { id: pokeId } })
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      res.render("Error/ErrorInterno", {
        pageTitle: "Error Interno",
        mensaje: err,
      });
    });
};
