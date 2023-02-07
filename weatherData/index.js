// // console.log(__dirname);
// // console.log(__filename);

// // console.log(process.argv);

// // const Calc = require("calc-js").Calc;

// // console.log(process.argv);
// // const [, , a, b] = process.argv;

// // console.log(new Calc(parseInt(a)).sum(parseInt(b)).finish());

// // const path = require("path");

// // console.log(path.resolve("package.json"));

// // const fs = require("fs");

// // fs.readFile("./data.txt", "utf8", (error, data) => {
// //   if (error) {
// //     console.error(error);
// //   }
// //   console.log(data);
// // });

// // console.log("212121212");

// // ////////promises
// // const fs = require("fs").promises;

// // fs.readFile("./data.txt", "utf8")
// //   .then((data) => {
// //     console.log(data);
// //   })
// //   .catch((error) => console.log(error));

// // console.log("212121212");

// // ////async await

// // const fs = require("fs").promises;

// // (async () => {
// //   const data = await fs.readFile("./data.txt", "utf8");
// //   console.log(data);
// // })();

// // console.log("324324234");

// ///async await + try and catch

// // const fs = require("fs").promises;

// // (async () => {
// //   try {
// //     const data = await fs.readFile("./data.txt", "utf8");
// //     console.log(data);

// //     const newData = `${data} scholl and children`;
// //     await fs.writeFile("./data1.txt", newData, "utf8");

// //     // await fs.rename("./request.js", "./newRequest.js"); new name

// //     // await fs.rename("./newRequest.js", "./tmp/newRequest.js"); new position

// //     // console.log(await fs.readdir("./tmp")); check directoria
// //     // await fs.unlink("./tmp/newRequest.js"); delete file

// //     // await fs.appendFile("./data1.txt", " add text", "utf8"); add some information
// //   } catch {
// //     console.log(error);
// //   }
// // })();

// ///next

// // console.log("324324234");

// // const http = require("http");

// // const PORT = 8081;

// // const requestHandler = (request, response) => {
// //   response.writeHead(200, { "Content-type": "text/json" });
// //   response.end(JSON.stringify({ a: 1, b: [1] }));
// // };

// // const server = http.createServer(requestHandler);

// // server.listen(PORT, (error) => {
// //   if (error) {
// //     console.error(`error at service ${error}`);
// //   }
// //   console.log(`Service is working at port ${PORT}`);
// // });

// const express = require("express");
// const morgan = require("morgan");
// const got = require("got");

// const app = express();

// const { router } = require("./booksRouter");

// const PORT = process.env.PORT || 8081;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(morgan("tiny"));
// // app.use("/api", router);

// app.post("/home", (req, res) => {
//   if (!req.body.goit) {
//     return res.status(400).json({ status: "goit parameter is required" });
//   }
//   res.json({ javascript: "fdfdvfdbdfb", body: req.body });
// });

// app.listen(PORT, (error) => {
//   if (error) console.error("error at service", error);

//   console.log(`Service is working at port ${PORT}`);
// });

const express = require("express");
const morgan = require("morgan");
const got = require("got");
require("dotenv").config();

const app = express();

const { router } = require("./booksRouter");

const PORT = process.env.PORT || 8081;
const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";
const KEY = process.env.SECRET_KEY;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
// app.use("/api", router);

app.get("/api/weather", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude) {
      res.status(400).json({ message: "latitude parameter is mandatory" });
    }
    if (!longitude) {
      res.status(400).json({ message: "longitude parameter is mandatory" });
    }
    const response = await got(thirdPartyBaseUrl, {
      searchParams: {
        key: KEY,
        lat: latitude,
        lon: longitude,
      },
      responseType: "json",
    });
    const [weatherData] = response.body.data;
    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData;
    res.json({
      city_name,
      description,
      temp,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, (error) => {
  if (error) console.error("error at service", error);

  console.log(`Service is working at port ${PORT}`);
});
