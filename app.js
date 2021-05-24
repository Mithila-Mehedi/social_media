const express = require('express')
const mongoose = require('mongoose')
const app = express()
const {MONGOURI} = require('./keys')

require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'))
mongoose.model("User")

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
})

mongoose.connection.on('error', (err) => {
    console.log('connected to mongo',err);
})

//mSJyI7huac0g373m

const PORT = process.env.PORT||8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})