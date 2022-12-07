const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const { UserRouter } = require('./routes/UserRoutes');
const { ConfigRouter } = require('./routes/ConfigRoutes');
const { ReportsRouter } = require('./routes/ReportsRoutes');
require('dotenv').config();
require('./utils/config/Database');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json({limit: "5000mb"}));
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "5000mb"}));
app.use
    (
        UserRouter,
        ConfigRouter,
        ReportsRouter
    );
app.use(morgan('dev'));

app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});

