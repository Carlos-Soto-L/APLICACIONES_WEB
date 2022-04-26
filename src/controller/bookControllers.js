const Libro = require("../models/libro");



function crearlibro(req, res) {
    const data = req.body;
    console.log(data);
    const libro = new Libro({
        Nombre:data.Nombre,
        Autor:data.Autor,
        Editorial:data.Editorial,
        UnidadesDisponibles:data.unidis,
        Ciudad:data.Ciudad,
    });

    libro.save((err, result)=>{
        if (err) {
            console.log("A ocurrido un error ",err.message);
        } else {
            res.redirect("/libros");

        }
    });

}

function libros(req, res){
    Libro.find({},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error ",err.message);
        } else {
            Libro.distinct("Nombre",(err1, librosNom)=>{
                if (err) {
                    console.log("A ocurrido un error "+err.message);
                } else {
                    res.render("libros",{data:result,libros:librosNom}); 
                }
            });
        }
    });
}

function FormLibro(req, res){
    const id = req.params.id;
    Libro.find({_id:id},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error ",err.message);
        } else {
            res.render("actualizarlibros",{libro:result}); 
        }
    });
}

function actualizarlibro(req, res){
    const id = req.params.id;
    const data = req.body;
    Libro.updateOne({_id:id},{$set:{
        Nombre:data.Nombre,
        Autor:data.Autor,
        Editorial:data.Editorial,
        UnidadesDisponibles:data.unidis,
        Ciudad:data.Ciudad,
    }},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error ",err.message);
        } else {
            res.redirect("/libros");
        }
    });   
}

function eliminarlibro(req, res){
    const id = req.params.id;
    Libro.deleteOne({_id:id},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error ",err.message);
        } else {
            res.redirect("/libros"); 
        }
    })
}

function buscarlibro(req, res){
    const nombre = req.body.Nombre;
    Libro.find({Nombre:nombre},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error ",err.message);
        } else {
            res.render("libroconsulta",{data:result});
        }
    });
}


module.exports = {crearlibro,libros,FormLibro,actualizarlibro,eliminarlibro,buscarlibro};