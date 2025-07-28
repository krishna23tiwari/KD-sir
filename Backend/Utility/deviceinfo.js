const UAParser = require('ua-parser-js');

const getDeviceInfo = (req) => {
  const parser = new UAParser(req.headers['user-agent']);
  const result = parser.getResult();

  return {
    os: result.os.name + " " + result.os.version,
    device: result.device.type || "Desktop",
    browser: result.browser.name + " " + result.browser.version,
  };
};

module.exports = { getDeviceInfo };
