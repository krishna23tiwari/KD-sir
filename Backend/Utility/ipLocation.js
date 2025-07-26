// const axios = require("axios");

// const getLocationFromIP = async (ip) => {
//   try {
//     const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
//     if (data.status === "success") {
//       return {
//         country: data.country,
//         region: data.regionName,
//         city: data.city,
//         isp: data.isp,
//         lat: data.lat,
//         lon: data.lon,
//       };
//     } else {
//       return {};
//     }
//   } catch (error) {
//     console.error("❌ Failed to fetch location:", error.message);
//     return {};
//   }
// };

// module.exports = { getLocationFromIP };

const axios = require("axios");

const getLocationFromIP = async (ip) => {
  try {
    // Use a real IP if local dev
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8"; // fallback to Google's IP for dev
    }

    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { city, regionName, country, query } = response.data;

    return `${city}, ${regionName}, ${country} (${query})`;
  } catch (error) {
    console.error("Geolocation error:", error.message);
    return "Unknown location";
  }
};

module.exports = getLocationFromIP;

