const pythonScript = require('../libs/python');
const { getInfluxDB } = require('../libs/influxdb')

exports.forecast = async (req, res) => {
    try {
        const input = await getInfluxDB();
        const ret = await pythonScript(input)
        res.status(200);
        res.json({...ret, ...input});
    } catch (error) {
        res.json(error);
    }
};
