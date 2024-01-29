const express = require('express')
const { connectToDb, getDb} = require('./db')

const app = express()


let db

connectToDb((err) => {
    if (!err) {
        app.listen(2000, () => {
            console.log('app listen on port 2000')
        })
        db = getDb()
    }
})


    
app.get('/', (req, res) => {
    res.json({mssg:"welcome to the api"})
})


