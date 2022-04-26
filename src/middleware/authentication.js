const User = require('../models/user')

module.exports = (req, res, next) => {
    console.log('Verificando Inicio de Sesión', req.session.usuario);
    const user = req.session.usuario;
        User.find({Usuario:user}, (error, user) => {
            if (error || !user )
                return res.redirect('/')
            next()
        })
};
