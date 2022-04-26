const mongoose = require("mongoose");
// const connection = mongoose.connect(`mongodb://localhost:27017/R1APLI`)
const connection = mongoose.connect(`mongodb+srv://daniel:$otoLedezma270@cluster0.y1z0g.mongodb.net/r1apli01?retryWrites=true&w=majority`)

.then((db)=>{
    console.log("Conexion exitosa a mongoDB");
}).catch(()=>{
    console.log("Ah ocurrido un error: ");
})
module.exports = connection;