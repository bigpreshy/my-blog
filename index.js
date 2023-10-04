require('dotenv').config();

const express = require('express');

const expressEjsLayaout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const session = require('express-session');
const { router } = require('./routes/main');
const {isActiveRoute} = require('./middleware/routeHelp');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const PORT = 3000 || process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(flash())


app.use(
    session({
      secret: process.env.SESSIONSECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(express.static('public'));

app.use(expressEjsLayaout);
app.set('layout', './common/master');
app.set('view engine', 'ejs');



app.use('/', router)
// app.use('/admin', rout)





app.locals.isActiveRoute = isActiveRoute;




app.listen(PORT, () => {
    console.log(`App is going on ${PORT}`)
})