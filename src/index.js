const express = require('express');
const cors = require('cors')
const { UserRouter } = require('./routes/UserRoutes');
const { ConfigRouter } = require('./routes/ConfigRoutes');
const { ReportsRouter } = require('./routes/ReportsRoutes');
const { hierarchyRouter } = require('./routes/HierarchyRoutes');

require('dotenv').config();
require('./utils/config/Database');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use
    (
        UserRouter,
        ConfigRouter,
        ReportsRouter,
        hierarchyRouter
    );

app.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'));
});

