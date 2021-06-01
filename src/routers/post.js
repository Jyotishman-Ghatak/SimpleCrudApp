const express = require("express")
const Post = require("../models/post")
const router = new express.Router()

router.get("/posts", async (req, res) => {
    try {
        const post = await Post.find({})
        if (!post) {
            res.status(204).send({ "message": "No post Created" })
        }
        res.send(post)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

router.post("/posts", async (req, res) => {
    try {
        const post = new Post(req.body)
        await post.save()
        res.send(post)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        if (!post) {
            res.status(400).send({ "error": "Not Found" })
        }
        res.send(post)
    }
    catch (e) {
        res.status.send(e)
    }
})

router.delete("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findByIdAndDelete(id)
        if (!post) {
            res.status(404).send({ "error": "Post not found" })
        }
        res.send({ post, message: "Deleted Successfully" })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.patch("/posts/:id", async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "description"]
    isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ "error": "Not valid Operation" })
    }
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!post) {
            res.status(404).send({ "error": "Post not found" })
        }
        res.send({ post, message: "Updated Successfully" })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router