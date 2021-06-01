require("./db/mongoose")
const express = require("express")
const postRouter = require("./routers/post")

const app = express()

app.use(express.json())
app.use(postRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server running in port " + PORT)
})