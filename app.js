const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");
const connection = require("./context/AppContext");
const Products = require("./models/Product");

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

connection.sync()
.then((result)=>{
  app.listen(5000);
  GetallProducts();
})
.catch((err)=>{
console.log(err)
});



 



