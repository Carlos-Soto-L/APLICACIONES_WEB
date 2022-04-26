const {Router} = require("express");
const res = require("express/lib/response");
const bookcontroller = require("../controller/bookControllers");
const Libro = require("../models/libro");
const User = require("../models/user"); 
const bcrypt = require('bcrypt');
const authMiddleware = require("../middleware/authentication");



const router = Router();

router.get("/",(req, res)=>{
    res.render("login",{data:null});
});

router.get("/registrar",(req, res)=>{
    res.render("registre");
});

router.get("/home",authMiddleware,(req, res)=>{   
    res.render("index",{user: req.session.usuario});
});

router.get("/crearlibro",(req, res)=>{
    res.render("formBook");
});

router.get("/cerrar",(req, res)=>{
    delete req.session.usuario;
    // req.session.usuario.destroy();
    res.redirect("/");
});

router.get("/libros",bookcontroller.libros);


router.get("/actualizarlibros/:id",bookcontroller.FormLibro)


router.post("/actualizarlibro/:id",bookcontroller.actualizarlibro);


router.post("/eliminarlibro/:id",bookcontroller.eliminarlibro);

router.post("/buscarlibro",bookcontroller.buscarlibro);


router.post("/crearlibro",bookcontroller.crearlibro);

router.post("/crearUser",(req, res)=>{
    const data = req.body;
    
    const user = new User({
        Usuario:data.usuario,
        Email:data.email,
        Password:data.password,
    });
    user.save((err, result)=>{
        if (err) {
            console.log("A ocurriod un error ",err.message);
        } else {
            res.redirect("/");
        }
    });
});


router.post("/verificaruser",(req, res)=> {
    let usuario = req.body.usuario;
    let pass = req.body.password;

    console.log('Usuario: ' + usuario + " Pass: " + pass);

    if (usuario && pass) {

        User.findOne({ username: usuario }, (error, user) => {
            if (user) {
                bcrypt.compare(pass, user.Password, (error, same) => {
                    if (same) { //Coinciden
                        //Almacena datos a sesión
	                    req.session.usuario = usuario;
                        req.session.cookie.expires = new Date(Date.now() + 60000*2)
                        res.render('index',{user: req.session.usuario});

                    } else {
                        res.render('login', {data:'Usuario o contraseña incorrecto'});
                    }
                })
            } else {
                res.render('login', {data:'Usuario No Existe'});
            }
        })

    } else {
        let data = {
            message: 'Usuario o Contraseña Incorrecto',
        }
        res.render('login', data);
    }
});


module.exports =  router;