const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '../.env'),
    example: path.join(__dirname, '../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    influxdb_url: process.env.INFLUXDB_URL,
    influxdb_token: process.env.INFLUXDB_TOKEN,
    influxdb_org: process.env.INFLUXDB_ORG,
    influxdb_bucket: process.env.INFLUXBD_BUCKET
};
