const { client, influxdb_org } = require('../config/influxdb');
const { influxdb_bucket } = require('../config/vars');

exports.influxdb = async (req, res) => {
    const fluxQuery = `
  from(bucket: "${influxdb_bucket}")
    |> range(start: -100d)
    |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")
    |> last()
`;

    const queryApi = client.getQueryApi(influxdb_org);

    const validFields = ['BME280_hum', 'BME280_pres', 'BME280_temp'];
    const result = {};

    queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            if (validFields.includes(o._field)) {
                const date = new Date(o._time);
                result.ano = date.getUTCFullYear().toString();
                result.mes = (date.getUTCMonth() + 1).toString();
                result.dia = date.getUTCDate().toString();
                result.hora = date.getUTCHours().toString();
                result.minuto = date.getUTCMinutes().toString();
                result[o._field] = o._value.toString();
            }
        },
        error(error) {
            console.error('Error querying data: ', error);
        },
        complete() {
            console.log('Finished querying');
            res.json(result);
        },
    });
};
