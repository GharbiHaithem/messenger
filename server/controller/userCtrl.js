const User = require('../model/user')
const {generateToken}  = require('../config/generateToken')
const bcrypt = require('bcryptjs')
const userCtrl = {
    saveOrLoginUser: async (req, res) => {
        const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            picture: req.body.picture
        }
        try {
            const findUser = await User.findOne({ email: req.body.email });
    if(!findUser){
        const newUser = new User(data);
         newUser.signedByGoogle = true;
        await newUser.save();

        return res.status(200).json({ newUser, message: "User created successfully" });
    }
          
      return res.status(201).json({ message: "User exists", findUser , token:generateToken(findUser._id) });
            
    
          
    
           
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    createUser: async (req, res) => {

        try {
            const { email } = req.body
            const findUser = await User.findOne({ email })
            console.log(req.body)
            if (!findUser) {
                // Créez un nouvel utilisateur
                const newUser = await User.create(req.body );
                console.log(newUser);
                await newUser.save();
               

                return res.json(newUser );

            }
            else {
                return res.status(500).json({
                    msg: 'User Already Exist',
                    success: false
                })
            }
        } catch (error) {
          res.status(500).json({message:error.message})
        }

    },
    login: async (req, res) => {
        const { email, password } = req.body

        const findUser = await User.findOne({ email })
        console.log(findUser)
     
         if (findUser &&  (await findUser.IsPasswordMatched(password))) {
            const token = generateToken(findUser?._id)
             await User.findByIdAndUpdate(findUser._id, {
                token
            }, {
                new: true,
                upsert: true
            })
       

            res.json({
                _id: findUser._id,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
                email: findUser.email,
                address: findUser.address,
                token
            })
        }

        else {
            res.status(500).json({ message: 'invalid credentials' })
        }
    },
    users: async (req, res) => {
        const { _id } = req.user;
    
        try {
            const { searchQuery } = req.query;
            if (searchQuery) {
                const regex = new RegExp(searchQuery, 'i');
    
                const users = await User.find({
                    $and: [
                        { _id: { $ne: _id } }, // Exclure l'utilisateur actuel
                        {
                            $or: [
                                { firstname: regex },
                                { lastname: regex }
                            ]
                        }
                    ]
                });
    
                return res.status(200).json(users);
            }
            const  users= await User.find({},{password:0,isBlocked:0,signedByGoogle:0,token:0})
        
            return res.status(200).json(users);
    
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    
}
module.exports = userCtrl;