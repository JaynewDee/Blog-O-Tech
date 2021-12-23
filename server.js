const express = require('express');
const session = require('express-session');
const routes = require('./controllers')
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
     secret: 'synthetic rain',
     cookie: {},
     resave: false,
     saveUninitialized: true,
     store: new SequelizeStore({
          db: sequelize
     })
};

app.use(routes);
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => console.log(`Blog O'Tech listening on port ${PORT}`))
})