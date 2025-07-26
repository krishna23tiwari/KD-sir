const axios = require("axios");

const getLocationFromIP = async (ip) => {
  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    if (data.status === "success") {
      return {
        country: data.country,
        region: data.regionName,
        city: data.city,
        isp: data.isp,
        lat: data.lat,
        lon: data.lon,
      };
    } else {
      return {};
    }
  } catch (error) {
    console.error("❌ Failed to fetch location:", error.message);
    return {};
  }
};

module.exports = { getLocationFromIP };
