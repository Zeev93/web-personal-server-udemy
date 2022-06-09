const jwt = require('../services/jwt')
const bcrypt = require('bcrypt')
const User = require('../models/User')

async function signUp (req, res) {
    const user = new User()
    


    const { name, lastName, email, password, repeatPassword } = req.body
    user.name = name
    user.lastName = lastName
    user.email = email.toLowerCase()
    user.role = "admin"
    user.active = false


        if(!password || !repeatPassword){
            res.status(404).send({message: "Ambos password son requeridos"})
        }else{
            if(password !== repeatPassword){
                res.status(404).send({message: "Ambos password deben ser iguales"})
            } else {
                try {
                    const saltRounds = 10;
                    const hash = await bcrypt.hash(password, saltRounds)
                    user.password = hash
                    await user.save( (err, userStored) => {
                        if(err){
                            console.log(err);
                            res.status(500).send({ message: "El usuario ya existe" })
                        }else{
                            if(!userStored){
                                res.status(404).send({ message: "Error al crear el usuario "})
                            } else{
                                res.status(200).send({ user : userStored })
                            }
                        }
                    })
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ message: "Error del servidor" });
                }
            }
        }
}

function signIn(req, res){
    const params = req.body
    const email = params.email.toLowerCase()
    const password = params.password

    User.findOne({email}, (err, userStored) => {
        if(err){
            res.status(500).send({message: "Error del servidor"})
        }else{
            if(!userStored){
                res.status(404).send({message: "Usuario inexistente"})
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if(err){
                        res.status(500).send({ message: "Error del servidor. "})
                    }else if (!check){
                        res.status(404).send({ message: "Contraseña incorrecta"})
                    } else { 
                        if(!userStored.active){
                            res.status(200).send({code: 200, message: "El usuario no esta activo"})
                        }else{
                            res.status(200).send({ 
                                accesToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                             })
                        }
                    }
                })
            }
        }

    } )
}

module.exports = {
    signUp,
    signIn
}