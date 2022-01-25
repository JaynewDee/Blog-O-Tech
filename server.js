const express = require('express');
const session = require('express-session');
const path = require('path')
const { engine } = require('express-handlebars');
const routes = require('./controllers')
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;
// Session configuration
const sess = {
     secret: 'syntheticrain',
     cookie: {
        maxAge: 3600000,
        httpOnly: true,
        secure: false,
     },
     resave: false,
     saveUninitialized: true,
     store: new SequelizeStore({
          db: sequelize
     }),
     maxAge: Date.now() + 6
};
// Views configuration

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')
// Middleware configuration
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Data sync and server start
app.use(routes);
sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => console.log(`Blog O'Tech listening on port ${PORT}`))
});

app.get('/', (req, res) => {
   res.redirect('/home')
})

