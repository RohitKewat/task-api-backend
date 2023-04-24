const express = require('express');
// const taskModel = require("../Schema/task");
const taskModel = require('../Schema/taskM')
const bodyParser = require('body-parser')


const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())


router.post('/v1/tasks', async (req, res) => {
    try {
        if (req.body.tasks) {
            const tasks = req.body
            console.log(tasks.tasks[0]);
            let ids = []
            for (let i = 0; i < tasks.tasks.length; i++) {
                const data = await taskModel.create({
                    title: tasks.tasks[i].title,
                    is_completed: tasks.tasks[i].is_completed
                })
                ids.push(`id : ${data._id}`)
            }
            res.status(201).json({
                tasks: ids
            })
            return
        }

        const { title, is_completed } = req.body
        const data = await taskModel.create({
            title: title,
            is_completed: is_completed
        })

        res.status(201).json({
            id: data._id
        })

    } catch (e) {
        res.status(500).json({
            status: "failed"
        })
    }
})
router.get('/v1/tasks', async (req, res) => {

    try {
        const data = await taskModel.find();

        res.status(200).json({
            tasks: data
        })

    } catch (e) {
        res.status(500).json({
            status: "failed"
        })
    }
})

router.get('/v1/tasks/:id', async (req, res) => {

    try {
        const taskData = await taskModel.findById({ _id: req.params.id });

        if (!taskData) {
            res.status(404).json({
                error: "There is no task at that id"
            })
            return
        }

        res.status(200).json({
            tasks: taskData
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
})

router.delete('/v1/tasks/:id', async (req, res) => {

    try {
        
        const data = await taskModel.findByIdAndDelete({ _id: req.params.id });
        if (!data) {
            res.status(404).json({
                error: "There is no task at that id"
            })
            return
        }
        res.status(204).json({
            message: "deleted"
        })


    } catch (e) {
        res.status(500).json({
            status: "failed"
        })
    }
})

router.put('/v1/tasks/:id', async (req, res) => {

    try {
        const { title, is_completed } = req.body

        const data = await taskModel.findByIdAndUpdate({ _id: req.params.id }, {
            title: title,
            is_completed: is_completed
        });

        if (!data) {
            res.status(404).json({
                error: "There is no task at that id"
            })
            return
        }
        res.status(204).json({
            data
        })


    } catch (e) {
        res.status(500).json({
            status: "failed"
        })
    }
})
//==================================


router.delete('/v1/tasks', async (req, res) => {
    try {
        if (req.body.tasks) {
            const tasks = req.body
            console.log(tasks.tasks[0]);
            for (let i = 0; i < tasks.tasks.length; i++) {
                 await taskModel.findByIdAndDelete({_id : tasks.tasks[i].id})
            }
            res.status(204).json({

            })
        }


    } catch (e) {
        res.status(5000).json({
            status: "failed"
        })
    }
})



module.exports = router