// const axios = require("axios");

// const getLocationFromIP = async (ip) => {

//      if (!ip || ip === "::1" || ip === "127.0.0.1") {
//     return {};
//   }
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
