// import packages
const express = require('express');
const app = express();
const methodOverride = require('method-override');

// import routes
const { userRouter } = require('./controllers/user.js')

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride('_method'));
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'hbs');

// set routes
app.use('/users', userRouter);

// set port
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
});
