const express = require('express');
const monaRoutes = require('./routes/monaRoutes')
const userRoutes = require('./routes/userRoutes')
const saveRoutes = require('./routes/saveRoutes')
const expendRoutes = require('./routes/expendRoutes')
const cors = require('cors')


const app = express();
app.use(cors());
app.use('/mona', monaRoutes)
app.use('/user', userRoutes)
app.use('/save', saveRoutes)
app.use('/expend', expendRoutes)

app.listen(3000, ()=>{console.log('Mona Loading...')} );
