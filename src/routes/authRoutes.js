import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'


const router = express.Router()

// Register new user endpoint /auth/register
router.post('/register', async (req, res) => {
   
    try{

        const {username, password} = req.body

        //encryption
         const hashedpass = bcrypt.hashSync(password, 8)


        const user = await prisma.user.create({ 
            data: {
                username,
                password: hashedpass
            }
        })

        const result = insertUser.run(username, hashedpass)   
        const defaultTodo = `Hello :) Add your first todo!`
        await prisma.todo.create({
           data: {
            task: defaultTodo,
            userId: user.id
           } 
        })
            
        insertTodo.run(result.lastInsertRowid, defaultTodo)
        
        // Create token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY,
            {expiresIn: '24h'}
        )
        res.json({ token })
    }
    catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }
    
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    //username auth
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if(!user) {return res.status(404).send({ message: "User not found!"})}
    // pass auth
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if(!passwordIsValid) {return res.status(404).send({message: "Invalid password!"})}

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY,
            {expiresIn: '24h'}    
        )

        res.json({token})
    }
    catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router