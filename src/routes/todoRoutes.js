import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()


router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    
        res.json(todos)  
})

router.post('/', async (req, res) => {
    const todo = await prisma.todo.create({
        data: {
            task,
            userId: req.userId
        }
    })

    res.json(todo)
})

// dynamic id 

router.put('/:id', async (req, res) => {
    const {completed} = req.body
    const {id} = req.params
    
    const updated = await prisma.todo.create({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed
        }
    })

    res.json(updated)
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const userId = req.userId
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })
    res.send({message: "todo deleted!"})
})


export default router