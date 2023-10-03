require('dotenv').config();

const express = require('express');

const expressEjsLayaout = require('express-ejs-layouts');
const { router } = require('./routes/main');
const {isActiveRoute} = require('./middleware/routeHelp');

const app = express();

const PORT = 3000 || process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(expressEjsLayaout);
app.set('layout', './common/master');
app.set('view engine', 'ejs');



app.use('/', router)
app.use('/admin', router)





app.locals.isActiveRoute = isActiveRoute;




app.listen(PORT, () => {
    console.log(`App is going on ${PORT}`)
})