import express from 'express'
import bodyParser from 'body-parser'

import { PORT } from './config/server-config.js'

const app = express();

const serverSetUp = () => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`)
    })
}

export default serverSetUp();