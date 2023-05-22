const { getInfluxDB } = require('../libs/influxdb');

exports.influxdb = async (req, res) => {
    try {
        const result = await getInfluxDB();
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
