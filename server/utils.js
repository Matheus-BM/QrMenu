var jwt = require('jsonwebtoken');

function generateToken(user){
    if(!user) return null;

    var u = {
        userId: user.cod_gerente,
        name: user.nome_gerente,
        sobrenome: user.sobrenome_gerente,
        email: user.email_gerente,
        idRestaurante : user.idRestaurante,
        nomeRestaurante : user.nomeRestaurante
    }

    return jwt.sign(u, process.env.JWT_SECRET,{
        expiresIn: 60*60*24
    });
}

function getCleanUser(user){
    if(!user) return null;

    return {
        userId: user.cod_gerente,
        name: user.nome_gerente,
        sobrenome: user.sobrenome_gerente,
        email: user.email_gerente,
        idRestaurante : user.idRestaurante,
        nomeRestaurante : user.nomeRestaurante
    };
}

module.exports = {
    generateToken,
    getCleanUser
}