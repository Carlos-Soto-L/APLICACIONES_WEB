const express = require("express");
const rutas = require("./router/index");
const app = express();
const session = require('express-session');
const connection = require("./connectionMongoDB.js");
const MongoStore = require("connect-mongo");

var port = process.env.PORT || 3000;
// const MongoClient = require("mongodb").MongoClient;
// const uri = "mongodb+srv://daniel:$otoLedezma270@cluster0.y1z0g.mongodb.net/r1apli01?retryWrites=true&w=majority";
// MongoClient.connect(uri, {useUnifiedTopology: true }, (err, client) => {
//   if (err) console.log("Error occurred connecting to MongoDB...",err.message);
//   console.log("Connected to MongoDB!");
// });

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

var MONGO_URL = "mongodb+srv://daniel:$otoLedezma270@cluster0.y1z0g.mongodb.net/r1apli01?retryWrites=true&w=majority";

app.set('trust proxy', 1);
app.use(session({
    secret: "####deweif",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        // url para la connecion a mongodb
        mongoUrl:MONGO_URL,
    //  propiedad que si sucede algun problema con la connecion,
    // esta tratara de volver a reconectar automaticamente 
     autoReconnect: true,
    //  crypto: {
    //     secret: 'squirrel'
    //   }
    })
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(rutas);
app.listen(port,()=>{
    console.log("Aplicacion corriendo en el puerto ",port);
});
