// import packages
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const hbs = require('./hbshelpers/hhelpers.js')

// import routes
const { userRouter } = require('./controllers/user.js');
const { fandomRouter } = require('./controllers/fandom.js');
const { mediaTypeRouter } = require('./controllers/mediatype.js')
const { mainRouter } = require('./controllers/main.js');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride('_method'));
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'hbs');

// set routes
app.use('/users', userRouter);
app.use('/fandoms', fandomRouter);
app.use('/mediatypes', mediaTypeRouter)
app.use('/', mainRouter);

// set port
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
});
