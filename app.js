const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");
const connection = require("./context/AppContext");
const compareHelpers = require('./util/helpers/hbs/compare')
const Regions = require("./models/Region");
const Tipos = require("./models/Tipo");
const Pokemons = require("./models/Pokemon");


const errorController = require("./controllers/ErrorController");
const pokemonRoute = require("./routes/pokemonRoute");
const RegionRoute = require("./routes/regionRoute");
const TipoRoute = require("./routes/tipoRoute");

//? render engine configuration
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      equalValue: compareHelpers.EqualValue,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// Convertir la data recibida por post en un json
app.use(express.urlencoded({ extended: false }));
//Hacer los datos de la dentro de la carpeta public publicos
app.use(express.static(path.join(__dirname, "public")));

//? Mejor manejo de rutas
app.use(pokemonRoute);
app.use(RegionRoute);
app.use(TipoRoute);
app.use("/", errorController.Get404);

//Relacion entre tablas
Pokemons.belongsTo(Tipos,{constraint: true,onDelete:"CASCADE"});
Tipos.hasMany(Pokemons);
Pokemons.belongsTo(Regions,{constraint: true,onDelete:"CASCADE"});
Regions.hasMany(Pokemons);

connection.sync()
.then((result)=>{
  app.listen(5000);
})
.catch((err)=>{
console.log(err)
});



 



