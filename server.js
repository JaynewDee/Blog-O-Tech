const express = require('express');
const session = require('express-session');
const path = require('path')
const exphbs = require('express-handlebars');
const routes = require('./controllers')
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
// Session configuration
const sess = {
     secret: 'synthetic rain',
     cookie: {},
     resave: false,
     saveUninitialized: true,
     store: new SequelizeStore({
          db: sequelize
     })
};
// Views configuration
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Middleware configuration
app.use(routes);
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Data sync and server start
sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => console.log(`Blog O'Tech listening on port ${PORT}`))
})

