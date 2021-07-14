const { Router } = require('express')

const router = Router();

const Therapist = require('../models/therapist');
const verifyToken = require('./verifyToken');

const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/signup', async(req, res)=>{
    try{
        console.log(req.body);
        const {firstname, lastname, email, password} = req.body;

        const user = new Therapist({
            firstname,
            lastname,
            email,
            password
        });

        user.password = await user.encryptPassword(password);
        

        const emailExist = await Therapist.findOne({email: req.body.email})

        if(emailExist){
            return res.status(404).json({ auth: false, message:"The email exist"})
        }
        console.log(user);
        await user.save();

        const token = jwt.sign({ id:user.id }, config.secret,{
            expiresIn: '7d'
        })

        res.status(200).json({auth: true, token});
    } catch(e){
        console.log(e)
        res.status(500).send('There was a problem signup');
    }
})


router.post('/signin', async(req, res)=>{
    try{
        console.log(1)
        const user = await Therapist.findOne({email: req.body.email})
        console.log(2)
        if(!user){
            return res.status(404).send("The email doesn't exist")
        }
        console.log(3)
        const validatePassword = await user.validatePassword(req.body.password, user.password);
        console.log(4)
        if(!validatePassword){
            return res.status(401).send({auth: false, token: null, message:"password equivocado"});
        }
        console.log(5)
        const token = jwt.sign({ id: user._id }, config.secret,{
            expiresIn: '7d'
        });
        console.log(user.firstname);
        const response = {
            token: token,
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
            },
        };
        console.log(6)
        res.status(200).json(response);
    } catch(e){
        console.log(e)
        res.status(500).send('There was a problem signin')
    }
});

router.get('./logout', function(req, res){
    res.status(200).send({auth: false, token: null});
});


module.exports = router;