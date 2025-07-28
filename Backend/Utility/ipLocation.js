const axios = require("axios");

const getLocationFromIP = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { country_name, region, city, org, latitude, longitude } = response.data;

    return {
      country: country_name || "Unknown",
      region: region || "Unknown",
      city: city || "Unknown",
      isp: org || "Unknown",
      lat: latitude || "Unknown",
      lon: longitude || "Unknown",
    };
  } catch (err) {
    console.error("Error fetching location:", err.message);
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      isp: "Unknown",
      lat: "Unknown",
      lon: "Unknown",
    };
  }
};

module.exports = { getLocationFromIP };
