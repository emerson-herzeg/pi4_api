const pythonScript = require('../libs/python');

exports.forecast = async (req, res) => {
    try {

        const input = req.query;

        const ret = await pythonScript(input)
        res.status(200);
        res.json(ret);
    } catch (error) {
        console.log(error);
    }
};
