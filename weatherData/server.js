// const express = require("express");
// const morgan = require("morgan");
// const got = require("got");

// const app = express();

// // const { router } = require("./booksRouter");

// const PORT = 8081;
// const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(morgan("tiny"));
// // app.use(router)

// app.get("/api/weater", async (req, res) => {
//   try {
//     const response = await got(thirdPartyBaseUrl, {
//       searchParams: {
//         key: "12031f0f697c411fa3be9d008928f479",
//         lat: "50.427107",
//         lon: "30.567437",
//       },
//     });
//     res.json({ response });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.listen(PORT, (error) => {
//   if (error) {
//     console.error("error at service", error);
//   }

//   console.log(`Service is working at port ${PORT}`);
// });

// const { latitude, longitude } = req.query;
// if (!latitude) {
//   res.status(400).json({ message: "latitude parameter is mandatory" });
// }
// if (!longitude) {
//   res.status(400).json({ message: "longitude parameter is mandatory" });
// }
// const response = await got(thirdPartyBaseUrl, {
//   searchParams: {
//     key: KEY,
//     lat: latitude,
//     lon: longitude,
//   },
//   responseType: "json",
// });
// const [weatherData] = response.body.data;
// const {
//   city_name,
//   weather: { description },
//   temp,
// } = weatherData;
// res.json({
//   city_name,
//   description,
//   temp,
// });
