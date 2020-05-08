const express = require('express');
const monaRoutes = require('./routes/monaRoutes')
const sessionRoutes = require('./routes/session_routes')
const auth = require('./auth')
const cors = require ('cors')
const bodyParser = require ('body-parser');
const session = require('express-session');
const FileStore = require ('session-file-store')(session)


const userRoutes = require('./routes/userRoutes')
const saveRoutes = require('./routes/saveRoutes')
const expendRoutes = require('./routes/expendRoutes')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(cors({credentials: true, origin: 'http://127.0.0.1:5500'}));

app.use( session({
    store: new FileStore,
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    name : 'mona'
})
)
app.use('/auth', sessionRoutes)
app.use('/expend',auth, expendRoutes)
//app.use('/mona', monaRoutes)
//app.use('/user', userRoutes)
//app.use('/save', saveRoutes)

app.listen(3000, ()=>{console.log('Mona Loading...')} );
