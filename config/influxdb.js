const {InfluxDB} = require('@influxdata/influxdb-client');
const { influxdb_url, influxdb_org, influxdb_token } = require('./vars');

const client = new InfluxDB({ url: influxdb_url, token: influxdb_token });

module.exports = {client, influxdb_org};
