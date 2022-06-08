const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const User = require('../models/User')

async function signUp (req, res) {
    const user = new User()
    


    const { name, lastName, email, password, repeatPassword } = req.body
    user.name = name
    user.lastName = lastName
    user.email = email
    user.role = "admin"
    user.active = false
    

    if(!password || !repeatPassword){
        res.status(404).send({message: "Both passwords are required"})
    }else{
        if(password !== repeatPassword){
            res.status(404).send({message: "Both password must be the same"})
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


module.exports = {
    signUp
}