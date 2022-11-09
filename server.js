const express = require('express');
const path = require('path');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;